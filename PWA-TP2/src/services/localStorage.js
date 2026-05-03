export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
    const result = localStorage.getItem(key);
    if (!result) {
        return null;
    }
    return result;
}