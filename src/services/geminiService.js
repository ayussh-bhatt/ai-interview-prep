import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateQuestions = async ({
  role,
  experienceLevel,
  count = 5,
}) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are an interviewer.
Generate ${count} interview questions for a ${experienceLevel} ${role} role.

Rules:
- Mix technical and behavioral questions
- Include topic for each question
- Output JSON only

Format:
[
  {
    "type": "technical | behavioral",
    "topic": "string",
    "content": "question text"
  }
]
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return JSON.parse(text);
};
