# Artopia 3.0 — React website + registration form (MongoDB Atlas)

React (Vite) website + Node/Express API that saves registrations to MongoDB Atlas.

## 1. One-time setup
1. Install Node.js 20.19+ (or 22+) from https://nodejs.org
2. Open this folder in VS Code, then open a terminal (Ctrl + `)
3. `npm install`
4. Create your MongoDB Atlas database (see below), then:
   - copy `.env.example` → rename the copy to `.env`
   - paste your connection string into `MONGODB_URI`

## 2. Run
    npm run dev
Website: http://localhost:5173   (API runs on http://localhost:5001)

## MongoDB Atlas setup (free)
1. https://www.mongodb.com/cloud/atlas → sign up → create a FREE cluster (M0)
2. Security → Database Access → Add user (username + password, "Read and write to any database")
3. Security → Network Access → Add IP Address → "Allow access from anywhere" (0.0.0.0/0) for now
4. Clusters → Connect → Drivers → copy the connection string
5. Put it in `.env`, replace <password> with your password, and keep `/artopia3` as the database name
Registrations are saved in database `artopia3`, collection `registrations`.

## What the form returns
- Registered successfully (shows a registration ID like ART3-7K2M9Q)
- Already registered (same roll number OR same email)
- Field-by-field validation errors (shown under each field)
- Registrations closed / too many attempts / no connection / server error

## Download registrations
Set `ADMIN_KEY` in `.env`, then open (while the server runs):
    http://localhost:5001/api/admin/registrations?key=YOUR_KEY&format=csv
(Opens in Excel / Google Sheets.) Remove `&format=csv` for JSON.

## Edit things
- Event info, date, venue, FAQ, coordinators, WhatsApp QR → `src/config/eventConfig.js`
- Form rules (email domain, years, interests list) → `shared/formOptions.js`
- Close registrations: `status: 'closed'` in eventConfig.js AND `REGISTRATION_OPEN=false` in `.env`
- Artopia 2.0 gallery photos → `public/images/artopia-2/` (the eight supplied photos)
- WhatsApp QR → put image at `public/images/whatsapp-qr.png`, set `qrImage: '/images/whatsapp-qr.png'`
- Share preview image → `public/images/og-artopia.jpg` (1200x630)

## Go live (one server runs everything)
    npm run build
    npm start        # serves the website + API together on http://localhost:5001
Host it on Render / Railway (Node service). Set the same variables from `.env` in their dashboard.
Then configure Atlas Network Access for the hosting provider's egress; avoid `0.0.0.0/0` where possible.

## Deploy to Vercel
- Import this project folder as the Vercel project root. `vercel.json` builds the Vite site to `dist`; the `api/` handlers expose the registration API.
- In Vercel Project Settings → Environment Variables, add `MONGODB_URI` (required) and `REGISTRATION_OPEN` (`true` or `false`). Add `ADMIN_KEY` only if you need the private registration export endpoint.
- Keep `.env` local; never commit it or paste its values into chat. If MongoDB Atlas uses an IP access list, configure it to accept the Vercel function's connections.
- The WhatsApp group and QR, gallery photos, and Kaleidos logo are included in the site build.
