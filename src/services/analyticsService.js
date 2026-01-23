import prisma from "../config/prisma.js";

export const getUserAnalytics = async (userId) => {
  // Get all evaluations for the user
  const evaluations = await prisma.evaluation.findMany({
    where: {
      response: {
        session: {
          userId,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (evaluations.length === 0) {
    return {
      totalResponses: 0,
      averageScore: 0,
      breakdown: {},
      trend: [],
      weakestArea: null,
    };
  }

  const totals = {
    correctness: 0,
    completeness: 0,
    clarity: 0,
    communication: 0,
    overall: 0,
  };

  evaluations.forEach((e) => {
    totals.correctness += e.correctness;
    totals.completeness += e.completeness;
    totals.clarity += e.clarity;
    totals.communication += e.communication;
    totals.overall += e.overallScore;
  });

  const count = evaluations.length;

  const averages = {
    correctness: Math.round(totals.correctness / count),
    completeness: Math.round(totals.completeness / count),
    clarity: Math.round(totals.clarity / count),
    communication: Math.round(totals.communication / count),
    overall: Math.round(totals.overall / count),
  };

  // Weakest area
  const weakestArea = Object.entries(averages)
    .filter(([key]) => key !== "overall")
    .sort((a, b) => a[1] - b[1])[0][0];

  // Score trend (for charts)
  const trend = evaluations.map((e) => ({
    date: e.createdAt,
    score: e.overallScore,
  }));

  return {
    totalResponses: count,
    averageScore: averages.overall,
    breakdown: averages,
    weakestArea,
    trend,
  };
};
