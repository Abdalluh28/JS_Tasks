let debounce = (func, delay) => {
    let timeoutId; 

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    }
}


let handleSearch = (query) => {
    console.log('Searching for:', query);
}

let debounceSearch = debounce(handleSearch, 300);