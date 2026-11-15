import { normalizeCollegeKey } from '../shared/formOptions.js';

/** Replace the old global roll-number index with the college-scoped index. */
export async function initRegistrationIndexes(Registration) {
  let indexes = [];
  try {
    indexes = await Registration.collection.indexes();
  } catch (error) {
    // A fresh Mongo database has no collection until Mongoose creates it.
    if (error.code !== 26 && error.codeName !== 'NamespaceNotFound') throw error;
  }

  const legacyRows = await Registration.find({ collegeKey: { $exists: false } }).select('_id collegeName').lean();
  if (legacyRows.length) {
    await Registration.bulkWrite(legacyRows.map((row) => {
      const collegeName = typeof row.collegeName === 'string' && row.collegeName.trim()
        ? row.collegeName.trim()
        : 'GLA University'; // historical registrations only accepted gla.ac.in addresses
      return {
        updateOne: {
          filter: { _id: row._id, collegeKey: { $exists: false } },
          update: { $set: { collegeName, collegeKey: normalizeCollegeKey(collegeName) } },
        },
      };
    }), { ordered: false });
  }

  const globalRollNumberIndex = indexes.find((index) =>
    index.unique && Object.keys(index.key || {}).length === 1 && index.key.rollNumber === 1
  );

  if (globalRollNumberIndex) {
    try {
      await Registration.collection.dropIndex(globalRollNumberIndex.name);
    } catch (error) {
      // Another server instance may have removed the legacy index already.
      if (error.code !== 27 && error.codeName !== 'IndexNotFound') throw error;
    }
  }

  await Registration.init();
}
