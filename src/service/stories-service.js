import dbPool from "../config/database.js";
import client from "../config/redis.js";
import ResponseError from "../utils/response-error.js";
import {validate} from "../validation/validation.js";
import {createStoryValidation, getStoryByIdValidation} from "../validation/stories-validation.js";

const create = async (userId, request) => {
  try {
    const {description} = validate(createStoryValidation, request);

    const query = "INSERT INTO stories (user_id, description) VALUES (?, ?)";
    const [result] = await dbPool.execute(query, [userId, description]);

    if (result.affectedRows === 0) throw new ResponseError(500, "Failed to create story");

    await client.del("stories");
    
    return result;
  } catch (e) {
    throw(e);
  }
};

const getAll = async () => {
  try {
    const cachedStories = await client.get("stories");

    if (cachedStories) {
      return JSON.parse(cachedStories);
    }
    
    const query = `
      SELECT 
        stories.story_id, 
        users.name, 
        stories.description, 
        stories.created_at 
      FROM stories 
      JOIN users ON stories.user_id = users.user_id
      ORDER BY story_id DESC
    `;

    const [stories] = await dbPool.execute(query);

    await client.setEx("stories", 60, JSON.stringify(stories));
    
    return stories;
  } catch (e) {
    throw(e);
  }
};

const getById = async (id) => {
  try {
    const storyId = validate(getStoryByIdValidation, id)

    const query = `
      SELECT 
        stories.story_id, 
        users.name AS name, 
        stories.description, 
        stories.created_at 
      FROM stories 
      JOIN users ON stories.user_id = users.user_id 
      WHERE stories.story_id = ?
    `;

    const [story] = await dbPool.execute(query, [storyId]);
    return story[0];
  } catch (e) {
    throw(e);
  }
}

export default {
  create,
  getAll,
  getById,
}