export default {
  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  },

  setItem(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(key) {
    return localStorage.removeItem(key);
  },

  clear() {
    return localStorage.clear();
  }
}
