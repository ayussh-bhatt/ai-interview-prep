import prisma from "../config/prisma.js";
import { transcribeAudio } from "../services/transcriptionService.js";
import { evaluateAnswer } from "../services/evaluationService.js";

export const evaluateResponse = async (req, res) => {
  try {
    const { responseId, audioFilePath } = req.body;

    const response = await prisma.response.findUnique({
      where: { id: responseId },
      include: { question: true, session: true },
    });

    if (!response) {
      return res.status(404).json({ error: "Response not found" });
    }

    // 1. Transcription
    const transcript = await transcribeAudio(audioFilePath);

    // 2. Gemini Evaluation
    const result = await evaluateAnswer({
      question: response.question.content,
      transcript,
      role: response.session.role,
      experienceLevel: response.session.experienceLevel,
    });

    const overallScore = Math.round(
      (result.correctness +
        result.completeness +
        result.clarity +
        result.communication) / 4
    );

    // 3. Store evaluation
    const evaluation = await prisma.evaluation.create({
      data: {
        responseId,
        correctness: result.correctness,
        completeness: result.completeness,
        clarity: result.clarity,
        communication: result.communication,
        overallScore,
        feedback: result.feedback,
        improvement: result.improvement,
      },
    });

    return res.status(201).json(evaluation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Evaluation failed" });
  }
};
