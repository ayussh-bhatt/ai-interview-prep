-- CreateTable
CREATE TABLE "Evaluation" (
    "id" TEXT NOT NULL,
    "responseId" TEXT NOT NULL,
    "correctness" INTEGER NOT NULL,
    "completeness" INTEGER NOT NULL,
    "clarity" INTEGER NOT NULL,
    "communication" INTEGER NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "improvement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_responseId_key" ON "Evaluation"("responseId");

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
