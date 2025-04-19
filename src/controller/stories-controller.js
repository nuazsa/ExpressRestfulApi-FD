import storiesService from "../service/stories-service.js";
import ResponseError from "../utils/response-error.js";

const create = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) throw new ResponseError(401, "Unauthorized user information is missing");
    const userId = req.user.id;

    await storiesService.create(userId, req.body);

    res.status(201).json({
      error: false,
      message: "Story created successfully"
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const stories = await storiesService.getAll();
    if (!stories) throw new ResponseError(404, "Data not found");

    res.status(200).json({
      error: false,
      message: "Story fetched successfully",
      data: stories.map((row) => ({
        storyId: row.story_id,
        name: row.User.name,
        description: row.description,
        createdAt: row.createdAt,
      }))
    });
  } catch (e) {
    next(e);
  }
}

const getById = async (req, res, next) =>{
  try {
    const story = await storiesService.getById(req.params.id);
    if (!story) throw new ResponseError(404, "Data not found");

    res.status(200).json({
      error: false,
      message: "Story fetched successfully",
      data: {
        storyId: story.story_id,
        name: story.User.name,
        description: story.description,
        createdAt: story.createdAt,
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