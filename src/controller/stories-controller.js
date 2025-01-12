import storiesService from "../service/stories-service.js";
import ResponseError from "../utils/response-error.js";

const create = async (req, res, next) => {
  try {
    const { description } = req.body;

    if (!description) throw new ResponseError(400, "Missing required fields: description");
    if (!req.user || !req.user.id) throw new ResponseError(401, "Unauthorized: User information is missing");

    const userId = req.user.id;
    await storiesService.create(userId, description);

    res.status(201).json({
      error: false,
      message: "Success"
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const stories = await storiesService.getAll();

    if (!stories) throw new ResponseError(404, "Stories not found");

    res.status(200).json({
      error: false,
      message: "Story fetched successfully",
      listStory: stories.map((row) => ({
        storyId: row.story_id,
        name: row.name,
        description: row.description,
        createdAt: row.created_at,
      }))
    });
  } catch (e) {
    next(e);
  }
}

const getById = async (req, res, next) =>{
  try {
    const { id } = req.params;
    
    if (isNaN(id)) throw new ResponseError(400, "Story ID must be a number");
      
    const story = await storiesService.getById(id);

    if (!story) throw new ResponseError(404, "Story not found");

    res.status(200).json({
      error: false,
      message: "Story fetched successfully",
      story: {
        storyId: story.story_id,
        name: story.name,
        description: story.description,
        createdAt: story.created_at,
      }
    });
  } catch (e) {
    next(e);
  }
}

export default {
  create,
  getAll,
  getById,
}