import dbPool from "../src/config/database";

const removeUser = async () => {
  const sql = "DELETE from USERS WHERE email = ?";
  await dbPool.execute(sql, ['test@gmail.com']);
}

const closeDatabaseConnection = async () => {
  await dbPool.end();
}

export {
  removeUser,
  closeDatabaseConnection
}