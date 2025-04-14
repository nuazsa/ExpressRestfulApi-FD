import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define('User', {
  'user_id': {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  'name': {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  'email': {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
});

export default User;