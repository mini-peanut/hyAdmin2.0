const cache = new Map();

export const setCache = (path, value) => {
  path.reduce((level, key, index) => {
    if (path.length - index > 1) {
      !level.get(key) && level.set(key, new Map());
      return level.get(key);
    }
    level.set(key, value);
  }, cache);
};

export const getCache = path => {
  return path.reduce((level, key) => {
    if (!level || !level.has(key)) {
      return;
    }
    return level.get(key);
  }, cache);
};
