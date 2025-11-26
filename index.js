exports.handler = async (event) => {
    // Parse Inputs
    const query = event.queryStringParameters || event.query || {};
    const location = query.location || "Dundee";
    const date = query.date || new Date().toISOString().split('T')[0];

    // Random Temperature Generated
    const uniqueString = `${location}-${date}`;
    let hash = 0;
    for (let i = 0; i < uniqueString.length; i++) {
        hash = uniqueString.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Temperature Logic (Range: -10 to 40 to test pricing logic)
    const normalizedVal = Math.abs(hash % 50);
    const temp = normalizedVal - 10; 

    // Return response compatible with API Gateway
    return {
        statusCode: 200,
        headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" // for CORS
        },
        body: JSON.stringify({ 
            service: 'Weather Lambda',
            location, 
            date, 
            temperature: temp 
        }),
    };
};

// exports.handler = async (event) => {
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify({ location: "Dundee", temp: 2, condition: "Rainy" }),
//     };
//     return response;
// };