const express = require('express');
const cors = require('cors');
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Load OpenAPI Spec
const swaggerDocument = yaml.load(path.join(__dirname, 'api-spec.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mock Generator Logic
const generateMockContent = (identity, field) => {
  return {
    meta: {
      title: "How to Negotiate Like a Pro",
      duration: "12:45",
      vocabCount: 8,
      topicCoverage: "本影片涵蓋了高階商務談判策略，特別針對 BATNA 與 ZOPA 概念進行了解析。"
    },
    guide: "本影片深入淺出地講解了哈佛談判術的核心概念。對於" + identity + "來說，掌握這些技巧能有效提升專業溝通能力。",
    vocabulary: [
      {
        word: "Leverage",
        definition: "槓桿作用；籌碼",
        example: "You need to understand your leverage before walking into the room.",
        timestamp: 45,
        importance: "對" + identity + "而言，這是談判桌上最重要的概念之一。"
      },
      {
        word: "Concession",
        definition: "讓步",
        example: "Never make a concession without getting something in return.",
        timestamp: 120,
        importance: "策略性讓步是達成雙贏的關鍵。"
      }
    ],
    clozeTest: [
      {
        question: "The key to a successful deal is finding the ______ ground.",
        answer: "common",
        timestamp: 200,
        options: ["common", "high", "low", "battle"]
      }
    ],
    shadowing: [
      {
        text: "It's not about winning, it's about finding a solution that works for both parties.",
        start: 300,
        end: 308,
        tips: "注意 'solution' 的重音在第二音節，以及 'parties' 的連音。"
      }
    ],
    quiz: [
      {
        question: "What does BATNA stand for?",
        type: "single_choice",
        options: ["Best Alternative to a Negotiated Agreement", "Better Agreement Than No Agreement"],
        answer: "Best Alternative to a Negotiated Agreement",
        explanation: "BATNA 是談判破裂時的最佳替代方案。"
      }
    ]
  };
};

app.post('/api/generate', async (req, res) => {
  const { url, identity, field } = req.body;
  
  console.log(`Generating content for: ${url} [${identity}/${field}]`);

  // In a real app, we would fetch subtitles:
  // const transcript = await YoutubeTranscript.fetchTranscript(url);
  // And then use an LLM to process it.
  
  // For demo, return structured mock data based on inputs
  const data = generateMockContent(identity, field);
  
  // Simulate processing delay
  setTimeout(() => {
    res.json(data);
  }, 1500);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
