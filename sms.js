// Load the Twilio module
import { createRequire } from "module";
const require = createRequire(import.meta.url);

global.require = require; //this will make require at the global scobe and treat it like the original require

const twilio = require('twilio');


// Twilio credentials
const accountSid = ''; // Replace with your Account SID
const authToken = '';   // Replace with your Auth Token

// Create a Twilio client
const client = new twilio(accountSid, authToken);


exports.handler = async (event) => {
	client.messages.create({
            body: 'Hello from Node.js by yashika!',    // Your message
            to: '+917988631834',              // The recipient's phone number (replace with the actual phone number)
            from: ''             // Your Twilio phone number (replace with your Twilio phone number)
    })
    .then((message) => console.log('Message sent: ' + message.sid))
    .catch((error) => console.error('Error: ' + error));
	return;
};