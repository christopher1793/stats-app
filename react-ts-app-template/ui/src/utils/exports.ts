import { fetchNui } from "./fetchNui";

const getSettings = () => {
  return fetchNui("main:get-settings", null, "yflip-phone");
};

export { getSettings };
