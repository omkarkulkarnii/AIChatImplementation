const express = require('express');
const env = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const bodyParser = require('body-parser'); 
const cors = require('cors')
const path = require('path');


const app = express();
env.config('./.env');

const api_key = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(api_key);

const generationConfig = {
  temperature: 0.5,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 200,
  responseMimeType: "text/plain",
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

app.use(cors()); 
app.use(bodyParser.json()); 

app.post('/api/messages', async (req, res) => {
  const { message } = req.body;

  try {
    const chatSession = model.startChat({
      generationConfig,
    });
    
    const result = await chatSession.sendMessage(message);
    res.send(result.response.text());
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).send('Internal Server Error');
  }
});

// function stopServer(){

//   app.
// }




const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
