// Load the Twilio module
const twilio = require('twilio');
const AWS = require('aws-sdk');
const b64 = require('base64-js');
const encryptionSdk = require('@aws-crypto/client-node');

// Twilio credentials
const accountSid = ''; // Replace with your Account SID
const authToken = '';   // Replace with your Auth Token

// Create a Twilio client
const client = new twilio(accountSid, authToken);

//Configure the encryption SDK client with the KMS key from the environment variables.  
const { encrypt, decrypt } = encryptionSdk.buildClient(encryptionSdk.CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT);
const generatorKeyId = process.env.KEY_ALIAS;
const keyIds = [ process.env.KEY_ARN ];
const keyring = new encryptionSdk.KmsKeyringNode({ generatorKeyId, keyIds })
exports.handler = async (event) => {
	//Decrypt the secret code using encryption SDK.
	let plainTextCode;
	if(event.request.code){
		const { plaintext, messageHeader } = await decrypt(keyring, b64.toByteArray(event.request.code));
		plainTextCode = plaintext
	}
	//PlainTextCode now contains the decrypted secret.
	if(event.triggerSource == 'CustomSMSSender_SignUp'){
		client.messages.create({
            body: 'Hello from Node.js by yashika!',    // Your message
            to: '+917988631834',              // The recipient's phone number (replace with the actual phone number)
            from: ''             // Your Twilio phone number (replace with your Twilio phone number)
        })
        .then((message) => console.log('Message sent: ' + message.sid))
        .catch((error) => console.error('Error: ' + error));
	}
	return;
};