import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const evaluateAnswer = async ({
  question,
  transcript,
  role,
  experienceLevel,
}) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are an experienced technical interviewer.

Evaluate the candidate's answer.

Context:
Role: ${role}
Experience Level: ${experienceLevel}

Question:
"${question}"

Candidate Answer (transcript):
"${transcript}"

Evaluate on a scale of 0–10 for:
- correctness
- completeness
- clarity
- communication

Rules:
- Be strict but fair
- Fresher answers should not be judged as senior-level

Output JSON only in this format:
{
  "correctness": number,
  "completeness": number,
  "clarity": number,
  "communication": number,
  "feedback": "string",
  "improvement": "string"
}
`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};
