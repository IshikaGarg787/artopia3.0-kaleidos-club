// ============================================================================
// SHARED between the website (browser) and the server.
// Because both use this one file, the rules can never get out of sync.
// ============================================================================

export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

// "What are you interested in?" (optional). Keep in sync with the experience titles you like.
export const INTERESTS = [
  'Live Art & Painting',
  'Creative Competitions',
  'Art Exhibitions',
  'Interactive Art Experiences',
  'Campus Stalls & Discoveries',
];

const clean = (v) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim() : '');
const uniq = (arr) => [...new Set(arr)];
const quote = (chars) => uniq(chars).slice(0, 5).map((c) => (c === ' ' ? '(space)' : `"${c}"`)).join(', ');
const example = () => 'student@yourcollege.edu';
export const normalizeCollegeKey = (value) =>
  typeof value === 'string' ? value.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim() : '';

/**
 * Checks + cleans the form data. Returns { values, errors }.
 * Every error says EXACTLY what is wrong and how to fix it.
 * If `errors` is empty ({}), `values` is safe to save.
 */
export function validateRegistration(input) {
  const errors = {};
  const src = input && typeof input === 'object' && !Array.isArray(input) ? input : {};

  // ---- Full name
  const fullName = clean(src.fullName);
  if (!fullName) errors.fullName = 'Full Name is empty. Please type your full name.';
  else {
    const bad = [...fullName].filter((c) => !/[\p{L}\s.'-]/u.test(c));
    if (bad.length) errors.fullName = /\d/.test(bad.join(''))
      ? `Name can't contain numbers or symbols (found ${quote(bad)}). Use letters only.`
      : `Name contains characters that aren't allowed: ${quote(bad)}. Use letters only (spaces, . ' - are fine).`;
    else if (!/^\p{L}/u.test(fullName)) errors.fullName = 'Name must start with a letter.';
    else if (fullName.length < 2) errors.fullName = `Name is too short (${fullName.length} character). Enter your full name.`;
    else if (fullName.length > 80) errors.fullName = `Name is too long (${fullName.length} characters). The maximum is 80.`;
  }

  // ---- College / university
  const collegeName = clean(src.collegeName);
  const collegeKey = normalizeCollegeKey(collegeName);
  if (!collegeName) errors.collegeName = 'College name is empty. Enter the name of your college or university.';
  else {
    const bad = [...collegeName].filter((c) => !/[\p{L}\p{N}\s.,&'()/-]/u.test(c));
    if (bad.length) errors.collegeName = `College name contains characters that aren't allowed: ${quote(bad)}.`;
    else if (collegeName.length < 2) errors.collegeName = 'College name is too short. Please enter the full name.';
    else if (collegeName.length > 120) errors.collegeName = `College name is too long (${collegeName.length} characters). The maximum is 120.`;
  }

  // ---- Roll number
  const rollNumber = clean(src.rollNumber).replace(/\s/g, '').toUpperCase();
  if (!rollNumber) errors.rollNumber = 'University Roll Number is empty. Enter your university roll no.';
  else {
    const bad = [...rollNumber].filter((c) => !/[A-Z0-9/-]/.test(c));
    if (bad.length) errors.rollNumber = `Roll number contains characters that aren't allowed: ${quote(bad)}. Use only letters and numbers.`;
    else if (rollNumber.length < 5) errors.rollNumber = `Roll number is too short: you entered ${rollNumber.length} character${rollNumber.length === 1 ? '' : 's'}, it needs at least 5. Please check it.`;
    else if (rollNumber.length > 20) errors.rollNumber = `Roll number is too long: you entered ${rollNumber.length} characters, the maximum is 20.`;
  }

  // ---- Course and branch
  const courseBranch = clean(src.courseBranch);
  if (!courseBranch) errors.courseBranch = 'Course and Branch is empty. Please enter it.';
  else {
    const bad = [...courseBranch].filter((c) => !/[\p{L}\p{N}\s.,&()/+-]/u.test(c));
    if (bad.length) errors.courseBranch = `Course and Branch contains characters that aren't allowed: ${quote(bad)}.`;
    else if (courseBranch.length < 2) errors.courseBranch = 'Course and Branch is too short. Please enter a valid value.';
    else if (courseBranch.length > 60) errors.courseBranch = `Course and Branch is too long (${courseBranch.length} characters). The maximum is 60.`;
  }

  // ---- Year
  const currentYear = clean(src.currentYear);
  if (!currentYear) errors.currentYear = 'No year selected. Choose your current year from the list.';
  else if (!YEARS.includes(currentYear)) errors.currentYear = `"${currentYear}" is not a valid option. Choose your year from the list.`;

  // ---- WhatsApp number
  let whatsapp = clean(src.whatsapp).replace(/[\s-]/g, '');
  if (!whatsapp) errors.whatsapp = 'WhatsApp Number is empty. Enter your 10-digit mobile number.';
  else {
    whatsapp = whatsapp.replace(/^(\+91|91|0)(?=\d{10}$)/, '');
    const bad = [...whatsapp].filter((c) => !/\d/.test(c));
    if (bad.length) errors.whatsapp = `WhatsApp number can only contain digits, but it has ${quote(bad)}. Enter just the 10 digits (e.g. 9876543210).`;
    else if (whatsapp.length !== 10) errors.whatsapp = `You entered ${whatsapp.length} digit${whatsapp.length === 1 ? '' : 's'}. An Indian mobile number needs exactly 10 digits${whatsapp.length > 10 ? ' (remove the extra digits)' : ' (some digits are missing)'}.`;
    else if (!/^[6-9]/.test(whatsapp)) errors.whatsapp = `This number starts with ${whatsapp[0]}. Indian mobile numbers start with 6, 7, 8 or 9. Please check it.`;
  }

  // ---- Email
  const email = clean(src.email).toLowerCase();
  if (!email) errors.email = `Email is empty. Enter your college or university email address, e.g. ${example()}.`;
  else if (/\s/.test(email)) errors.email = "Email can't contain spaces. Remove them and try again.";
  else if (!email.includes('@')) errors.email = `Email is missing the "@" symbol. It should look like ${example()}.`;
  else if (email.split('@').length > 2) errors.email = 'Email has more than one "@" symbol. Please check it.';
  else {
    const [local, domain] = email.split('@');
    const badLocal = [...local].filter((c) => !/[a-z0-9._%+-]/.test(c));
    if (!local) errors.email = 'Email has nothing before the "@". Type your name or ID first, e.g. ' + example() + '.';
    else if (badLocal.length) errors.email = `Email contains characters that aren't allowed before the "@": ${quote(badLocal)}.`;
    else if (!domain) errors.email = `Email has nothing after the "@". Enter a valid address like ${example()}.`;
    else if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain)) errors.email = `"${domain}" isn't a valid email domain. Enter a valid address like ${example()}.`;
    else if (email.length > 120) errors.email = `Email is too long (${email.length} characters). The maximum is 120.`;
  }

  // ---- Interests (optional)
  let interests = [];
  if (src.interests !== undefined && src.interests !== null) {
    if (!Array.isArray(src.interests) || src.interests.some((x) => typeof x !== 'string')) errors.interests = 'The interests selection is invalid. Please reselect your options.';
    else {
      interests = uniq(src.interests.map(clean));
      const bad = interests.filter((x) => !INTERESTS.includes(x));
      if (bad.length) errors.interests = `Unknown option selected: ${quote(bad.map((b) => b))}. Please choose from the list.`;
    }
  }

  return {
    values: { fullName, collegeName, collegeKey, rollNumber, courseBranch, currentYear, whatsapp, email, interests },
    errors,
  };
}
