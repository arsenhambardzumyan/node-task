const axios = require('axios');

const baseUrl = 'http://localhost:3000'; // Replace with your server URL
const endpoint = '/update-balance'; // Replace with your endpoint path

async function sendRequests(totalRequests) {
  let successfulRequests = 0;
  let failedRequests = 0;

  // Array to hold all request promises
  const requestPromises = [];

  // Create totalRequests requests
  for (let i = 0; i < totalRequests; i++) {
    (function(i) {
      const request = axios.post(`${baseUrl}${endpoint}`, {
        userId: 1, // Replace with a valid user ID
        amount: 2,
      })
      .then(response => {
        successfulRequests++;
        console.log(`Request ${i + 1} successful:`, response.data);
      })
      .catch(error => {
        failedRequests++;
        console.error(`Request ${i + 1} failed:`, error.response ? error.response.data : error.message);
      });

      requestPromises.push(request);
    })(i); // Pass current value of i to the IIFE
  }

  // Wait for all requests to complete
  await Promise.all(requestPromises);

  console.log(`Total successful requests: ${successfulRequests}`);
  console.log(`Total failed requests: ${failedRequests}`);
}

// Adjust totalRequests as needed (e.g., 10)
sendRequests(10000);
