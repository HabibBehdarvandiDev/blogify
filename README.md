# Blogify

Blogify is a **full-featured blogging platform** built with **Next.js 15, TailwindCSS, ShadCN/UI, Prisma, and MySQL**.
It allows users to register, create, and read blogs, and supports **role-based access** (admin vs normal users).
Admins can manage content, while normal users can explore, read, and interact with blogs (like, share, etc.).

---

## Features

* User authentication via **NextAuth.js** (Google, GitHub, Email)
* Role-based access control (`admin` and `user`)
* Full blog management with **Prisma** + MySQL
* Responsive UI using **TailwindCSS** + ShadCN/UI components
* Optimized for performance, SEO, and user experience

---

## Getting Started

### 1. Environment Variables

1. Copy the provided `.env.local` template.
2. **Rename `.env.local` to `.env`** (Next.js automatically reads `.env` files).
3. Update the variables with your own credentials:

```env
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database>"
NEXTAUTH_SECRET="your_nextauth_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"
```

**How to get OAuth credentials:**

* **Google:**

  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a new project or select existing
  3. Navigate to **APIs & Services → Credentials → Create Credentials → OAuth Client ID**
  4. Set **Authorized redirect URIs** to `http://localhost:3000/api/auth/callback/google`
  5. Copy `Client ID` and `Client Secret` into your `.env` file

* **GitHub:**

  1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
  2. Create a new OAuth App
  3. Set **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github`
  4. Copy `Client ID` and `Client Secret` into your `.env` file

---

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

---

### 3. Setup Prisma & Database

* Push Prisma schema to your database:

```bash
npx prisma db push
```

* Generate Prisma client:

```bash
npx prisma generate
```

* Optionally, open Prisma Studio to inspect DB:

```bash
npx prisma studio
```

---

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 5. Create Admin User

After registering a normal account:

1. Open **MySQL client** or **Prisma Studio**
2. Insert `admin` role in `roles` table if not present:

```sql
INSERT INTO roles (name) VALUES ('admin');
```

3. Assign the admin role to your user ID in `userroles` table:

```sql
INSERT INTO userroles (user_id, role_id) VALUES (<YOUR_USER_ID>, <ADMIN_ROLE_ID>);
```

> Replace `<YOUR_USER_ID>` with your user’s ID and `<ADMIN_ROLE_ID>` with the ID of the admin role.
> This ensures your account has admin privileges for `/admin*` routes.

---

### 6. Notes & Best Practices

* Ensure `.env` is **never committed** to version control.
* Adjust `DATABASE_URL` for production deployment.
* Admin routes are protected via middleware (`/admin*`) requiring `admin` role.
* OAuth redirect URLs must match exactly what you set in Google/GitHub console.
* Blogify automatically handles user roles, blog CRUD, and content rendering using ShadCN/UI components and TailwindCSS.

---

### 7. Recommended Next Steps

* Implement additional social logins if needed
* Add blog categories and tagging system
* Enable SSR caching for performance and SEO
* Add Prisma seed script to automatically create `admin` role and first admin user

---

### 8. Credits

* **Author:** Habib
* **Created:** 2025
* **Contact:** [hello@anikocompany.ir](mailto:hello@anikocompany.ir)
* **Project:** Blogify - Full-featured blogging platform with role-based access

---

Enjoy building and managing your blogs with Blogify! 🚀
