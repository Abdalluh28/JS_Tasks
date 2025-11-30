let retry = async (func, attempts, delay) => {
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            // Try to execute the function
            return await func();
        } catch (error) {

            // If it's the last attempt, rethrow the error
            if (attempt === attempts) {
                throw error;
            }

            // Wait for the specified delay before retrying
            if (delay) {
                await new Promise(res => setTimeout(res, delay));
            }
        }
    }
}

export { retry }