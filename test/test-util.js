import dbPool from "../src/config/database";
import bcrypt from "bcryptjs";

const createUser = async () => {
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const passwordHash = await bcrypt.hash('12345678', 10);
  await dbPool.execute(sql, ['test', 'test@gmail.com', passwordHash]);
}

const removeUser = async () => {
  const sql = "DELETE FROM users WHERE email = ?";
  await dbPool.execute(sql, ['test@gmail.com']);
}

const removeStories = async () => {
  const sql = "DELETE FROM stories WHERE description = 'test'";
  await dbPool.execute(sql);
}
const closeDatabaseConnection = async () => {
  await dbPool.end();
}

export {
  createUser,
  removeUser,
  removeStories,
  closeDatabaseConnection
}