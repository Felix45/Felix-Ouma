import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

// Next.js expands $VAR references when loading .env files, so a raw bcrypt
// hash (which starts with $2b$10$...) gets silently truncated unless every
// "$" is escaped. Print the already-escaped value so it can be pasted as-is
// into ADMIN_PASSWORD_HASH.
console.log(hash.replaceAll("$", "\\$"));
