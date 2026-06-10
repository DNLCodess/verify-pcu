# Deploying to cPanel (Node.js App + MySQL)

This app is a **Next.js server app**, not a static site. It verifies certificates
by querying MySQL through Server Actions, so it must run as a **Node.js
application** (cPanel → *Setup Node.js App*, powered by Passenger). Do **not**
use `output: "export"` / a static `out/` folder — a static folder has no server
and cannot reach the database.

---

## 1. Create the MySQL database

cPanel → **MySQL® Databases**:

1. **Create New Database** — e.g. `verify` (cPanel stores it prefixed, like
   `youruser_verify`).
2. **Add New User** — e.g. `dbuser` with a strong password (stored as
   `youruser_dbuser`).
3. **Add User To Database** → grant **ALL PRIVILEGES**.

Note the final names — you need them in the connection string below:

```
database: youruser_verify
user:     youruser_dbuser
password: <the password you set>
host:     localhost          (the app runs on the same server as MySQL)
port:     3306
```

## 2. Load the schema and data

cPanel → **phpMyAdmin** → select your database → **Import** tab:

1. Import `db/schema.sql` (creates the `certificates` table).
2. Import `db/seed.sql` (sample rows) — or import your real certificate records.

Verify (phpMyAdmin → **SQL** tab):

```sql
SELECT full_name, graduation_year FROM certificates;
```

## 3. Get the code onto the server

cPanel → **Git™ Version Control** → **Create**:

- Clone URL: `https://github.com/DNLCodess/verify-pcu.git`
- cPanel clones it into a folder under your home dir, e.g.
  `/home/youruser/verify-pcu`. **Remember this folder** — it is your
  *Application root* in the next step.

(Alternative: upload a ZIP of the project, excluding `node_modules` and `.next`.)

## 4. Setup Node.js App

cPanel → **Setup Node.js App** → **Create Application**:

| Field | Value |
| --- | --- |
| Node.js version | 20.x or higher |
| Application mode | Production |
| **Application root** | the folder Git cloned into, **relative to your home dir** — e.g. `verify-pcu` (this is the folder containing `package.json` and `server.js`) |
| Application URL | your domain or subdomain |
| **Application startup file** | `server.js` |

Then, on the same screen, under **Environment variables**, add:

| Name | Value |
| --- | --- |
| `DATABASE_URL` | `mysql://youruser_dbuser:PASSWORD@localhost:3306/youruser_verify` |

> If your host requires SSL for MySQL (rare for `localhost`), also add
> `MYSQL_SSL` = `require`.

Click **Create**.

## 5. Install, build, start

1. Click **Run NPM Install** (installs dependencies).
2. Build the app. cPanel → **Terminal**, then paste the `source .../bin/activate`
   line shown at the top of your Node.js App panel (it enters the app's
   environment), then:
   ```bash
   cd ~/verify-pcu        # your Application root
   npm run build
   ```
3. Back in the Node.js App panel, click **Restart**.

Open your Application URL. The page should load and certificate verification
should hit MySQL.

---

## Troubleshooting

- **`npm run build` is "Killed" / out of memory.** Shared hosting often caps
  memory. Build locally (`npm run build`) and upload the generated `.next`
  folder into the Application root on the server, then **Restart** (skip the
  server-side build).
- **App loads but every verify fails.** Check `DATABASE_URL` — the database and
  user names must include the cPanel prefix (`youruser_…`), and the user must be
  added to the database with privileges.
- **502 / app won't boot.** Confirm **Application startup file** is `server.js`
  and the build (`.next`) exists in the Application root.
- **Updating later.** cPanel → Git Version Control → **Pull**, then in the
  Node.js App env run `npm run build`, then **Restart**.

## Local development

This app uses MySQL. Point `.env.local` at a MySQL you can reach — a local MySQL
(e.g. XAMPP) or your cPanel MySQL via **Remote MySQL** (whitelist your IP):

```
DATABASE_URL=mysql://root:PASSWORD@localhost:3306/pcu_verify
```

Then load `db/schema.sql` + `db/seed.sql` into it and run `npm run dev`.
