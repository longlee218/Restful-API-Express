function errorCreator(message = "Oops! Something went wrong.") {
    return { error: true, message };
}

module.exports = errorCreator;
