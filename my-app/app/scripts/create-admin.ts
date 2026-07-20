import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "../lib/db";
import { users } from "../lib/db/schema";

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: npm run db:create-admin -- you@example.com yourpassword");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({ email, passwordHash });
  console.log(`Admin user created: ${email}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});