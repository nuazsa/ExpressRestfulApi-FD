import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from './User.js';

const Story = sequelize.define('Story', {
  'story_id': {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  'user_id': {
    type: DataTypes.INTEGER,
  },
  'description': {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'stories'
});

Story.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Story, { foreignKey: 'user_id' });

export default Story;