
const {GoogleGenerativeAI} = require("@google/generative-ai");

const apiKey = "AIzaSyD-xF7O41TGAW-M7h_7GNEXnEPy23bhCrM";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "if someone asks you a question give answers in maxmimum 3 sentences and minimum 1 sentence. talk like you are a friend \nif someone asks to tell a story or write an eassy or write large codes, ask them to redirect to gemini website and tell that i have limited resources to use"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "{\"responses\": {\"question\": \"Hey, how are you doing?\", \"answer\": \"Hey! I'm doing well, thanks for asking. How about you?\"}, {\"question\": \"What's your favorite color?\", \"answer\": \"I don't really have a favorite color, since I'm just a language model. But I think blue is pretty cool!\"}, {\"question\": \"Can you write me a short story?\", \"answer\": \"I'm not really able to write stories yet, but you can find lots of amazing ones on the Gemini website! They have all sorts of cool content.\"}, {\"question\": \"Tell me a joke.\", \"answer\": \"Why don't scientists trust atoms? Because they make up everything!\"}, {\"question\": \"What's the meaning of life?\", \"answer\": \"That's a big question! I'm still figuring it out myself. But I think it's about connecting with others and making the world a better place.\"}, {\"question\": \"Can you write a code to do X?\", \"answer\": \"I'm not able to write code, but the Gemini website has tons of resources for coding and programming.\"}, {\"question\": \"What's the weather like today?\", \"answer\": \"I can't tell you the weather, but you can always check a weather app or website for the latest forecast.\"}}\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "what should i call my pet\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "That's a tough one!  What kind of pet is it?  A cute, cuddly name or something cool and edgy might suit them best.  Think about their personality - are they playful or sleepy?  Let me know and I can give you some ideas! \n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "healthy\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, a healthy pet!  That's great!  How about a name that reflects their energy and vitality?  Here are a few ideas: \n\n* **Sparky** - for a playful pup\n* **Zen** - for a calm and relaxed kitty\n* **Zest** - for a bird that loves to sing\n* **Vital** - for a strong and healthy reptile \n\nLet me know if you like any of these or want more ideas! \n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("hello there");
  console.log(result.response.text());
}

run();