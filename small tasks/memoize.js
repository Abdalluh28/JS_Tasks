const slowAdd = (a, b) => { for (let i = 0; i < 1e9; i++) { } return a + b; };
const fastAdd = memoize(slowAdd);

let memoize = (func) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const res = func(...args);
        cache.set(key, res);
        return res;
    }
}


fastAdd(2, 3); // Computed
fastAdd(2, 3); // Retrieved from cache