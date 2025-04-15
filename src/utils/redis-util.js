import client from "../config/redis.js";
import { logInfo, logWarn } from "./log-util.js";

const getCache = async (key) => {
  if (!client?.isOpen) {
    logInfo("Redis not available, skipping cache read");
    return null;
  }

  try {
    const data = await client.get(key);
    if (data) {
      logInfo(`Redis: cache hit for key '${key}'`);
      return JSON.parse(data);
    } else {
      logInfo(`Redis: cache miss for key '${key}'`);
      console.log();
      return null;
    }
  } catch (err) {
    const error = `Redis get error: ${err.message}`;
    logWarn(null, error)
    return null;
  }
};

const setCache = async (key, value, ttl = 60) => {
  if (!client?.isOpen) {
    logInfo("Redis not available, skipping cache set");
    return;
  }

  try {
    await client.setEx(key, ttl, value);
    logInfo(`Redis: cache set for key '${key}'`);
  } catch (err) {
    logInfo(`Redis set error: ${err.message}`)
  }
};

const deleteCache = async (key) => {
  if (!client?.isOpen) {
    logInfo("Redis not available, skipping cache delete")
    return;
  }

  try {
    await client.del(key);
    logInfo(`Redis: cache deleted for key '${key}'`);
  } catch (err) {
    const error = `Redis delete error: ${err.message}`;
    logWarn(null, error)
  }
};

export {
  getCache,
  setCache,
  deleteCache
}