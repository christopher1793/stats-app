import { fetchNui } from "./fetchNui";

const resourceName = "yseries"; // options:  "yflip-phone", "yphone", "yseries"

const getSettings = () => {
  return fetchNui("main:get-settings", null, resourceName);
};

export { getSettings };
