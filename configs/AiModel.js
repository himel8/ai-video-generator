const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 30 seconds video on topic: interesting historical story along with ai image prompt in realistic format for each scene and give me result in JSON format with imagePropmt and contentText as field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "video_script": [\n    {\n      "scene": 1,\n       "imagePrompt": "A wide shot of the bustling port of Alexandria in ancient Egypt, around 300 BC. Tall, white stone buildings with Greek and Egyptian architectural influences line the harbor. Ships with large sails and oars crowd the water. The sky is a clear, bright blue, with the sun shining brightly. People in tunics and sandals are moving about, loading and unloading cargo. Realistic, high-definition.",\n      "contentText": "Around 300 BC, the port of Alexandria in Egypt was a hub of trade and knowledge."\n    },\n    {\n      "scene": 2,\n       "imagePrompt": "A close-up shot of a middle-aged man, Eratosthenes, dressed in a simple Greek tunic, studying a large map on a table. He\'s holding a compass and a measuring tool. Sunlight streams in from a nearby window, illuminating the dust motes in the air. The room is sparsely furnished with scrolls and writing implements. Realistic, slightly aged look.",\n      "contentText": "A brilliant librarian named Eratosthenes had an unusual passion: measuring the Earth."\n    },\n     {\n      "scene": 3,\n      "imagePrompt": "A top-down view of two ancient Egyptian cities: Syene (modern Aswan) and Alexandria. The Nile River flows vertically through the frame. The sun\'s rays are depicted as parallel lines hitting the ground at Syene at a perfect vertical angle (no shadow), while at Alexandria there\'s a slight shadow from the same light. Realistic rendering of ancient landscape.",\n      "contentText": "He noticed that at noon on the summer solstice, the sun cast no shadow in Syene, but in Alexandria, it did."\n\n     },\n    {\n      "scene": 4,\n       "imagePrompt": "Eratosthenes, now standing and holding a scroll with geometric diagrams on it, looks thoughtfully at a globe. A ray of sunlight illuminates the globe. He is in his study, surrounded by books and scrolls. Focus is on his face, showing a mixture of concentration and inspiration. Realistic, well-lit.",\n      "contentText": "Using this and some geometry, Eratosthenes calculated the Earth’s circumference with surprising accuracy."\n    },\n    {\n       "scene": 5,\n      "imagePrompt": "A depiction of the globe with a highlighted equator and meridian lines. A simple line indicating the Earth\'s circumference is also highlighted. Numbers written in ancient Greek are superimposed showing the calculation. Realistic depiction of an ancient globe with text. ",\n       "contentText": "He was off by a mere few hundred kilometers. A monumental achievement for the time!"\n    },\n     {\n      "scene": 6,\n       "imagePrompt": "A montage showing a variety of scientific and technological advancements across different cultures (the compass, the printing press, the telescope, and a modern satellite). The images should transition smoothly, showcasing the ongoing pursuit of knowledge across time. Realistic, yet slightly stylized.",\n        "contentText": "Eratosthenes\'s method serves as a testament to the power of curiosity and observation. A reminder that even in antiquity, brilliance thrived."\n    }\n\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});
