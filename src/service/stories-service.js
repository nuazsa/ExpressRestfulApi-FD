import client from "../config/redis.js";
import ResponseError from "../utils/response-error.js";
import {validate} from "../validation/validation.js";
import {createStoryValidation, getStoryByIdValidation} from "../validation/stories-validation.js";
import Story from "../models/Story.js";
import User from "../models/User.js";

const create = async (userId, request) => {
  try {
    const {description} = validate(createStoryValidation, request);

    const story = await Story.create({
      user_id: userId,
      description
    });

    if (story.affectedRows === 0) throw new ResponseError(500, "Failed to create story");

    await client.del("stories");
    
    return story;
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

    const stories = await Story.findAll({
      include: {
        model: User,
        attributes: ['name'],
      },
      attributes: ['story_id', 'description', 'createdAt'],
      order: [['story_id', 'DESC']],
      raw: true,
      nest: true
    });

    console.log(stories);
    await client.setEx("stories", 60, JSON.stringify(stories));
    
    return stories;
  } catch (e) {
    throw(e);
  }
};

const getById = async (id) => {
  try {
    const storyId = validate(getStoryByIdValidation, id);

    const stories = await Story.findAll({
      include: {
        model: User,
        attributes: ['name']
      },
      attributes: ['story_id', 'description', 'createdAt'],
      where: storyId,
      raw: true,
      nest: true
    })

    return stories[0];
  } catch (e) {
    throw(e);
  }
}

export default {
  create,
  getAll,
  getById,
}