exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({ location: "Dundee", temp: 2, condition: "Rainy" }),
    };
    return response;
};