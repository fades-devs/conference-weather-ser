const express = require('express');
const { handler } = require('./index'); // Import lambda
const app = express();
const port = 3004; // Port for weather service

app.use(express.json());

// Route catches HTTP request and puts it into the Lambda function
app.get('/api/v1/weather', async (req, res) => {
    
    // Event object that looks like API Gateway
    const event = {
        queryStringParameters: req.query
    };

    // Run the Lambda
    const result = await handler(event);

    // Send the Lambda response back to the browser/Booking Service
    res.set(result.headers);
    res.status(result.statusCode).send(result.body);
});

app.listen(port, () => {
    console.log(`Weather Lambda running at http://localhost:${port}/api/v1/weather`);
});