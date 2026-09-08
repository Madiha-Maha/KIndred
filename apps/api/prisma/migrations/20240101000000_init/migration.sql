-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MENTOR', 'LEARNER');
CREATE TYPE "SessionMode" AS ENUM ('VIDEO', 'IN_PERSON');
CREATE TYPE "SessionStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "name" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "bio" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "availability" JSONB NOT NULL,
    "ratePerSession" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "MentorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "mode" "SessionMode" NOT NULL DEFAULT 'VIDEO',
    "status" "SessionStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegacyJournalEntry" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "summaryText" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LegacyJournalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable for Many-to-Many MentorSkills
CREATE TABLE "_MentorSkills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "MentorProfile_userId_key" ON "MentorProfile"("userId");
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");
CREATE UNIQUE INDEX "Review_sessionId_key" ON "Review"("sessionId");
CREATE UNIQUE INDEX "LegacyJournalEntry_sessionId_key" ON "LegacyJournalEntry"("sessionId");
CREATE UNIQUE INDEX "_MentorSkills_AB_unique" ON "_MentorSkills"("A", "B");
CREATE INDEX "_MentorSkills_B_index" ON "_MentorSkills"("B");

-- AddForeignKey
ALTER TABLE "MentorProfile" ADD CONSTRAINT "MentorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Review" ADD CONSTRAINT "Review_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LegacyJournalEntry" ADD CONSTRAINT "LegacyJournalEntry_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "MentorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LegacyJournalEntry" ADD CONSTRAINT "LegacyJournalEntry_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_MentorSkills" ADD CONSTRAINT "_MentorSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "MentorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_MentorSkills" ADD CONSTRAINT "_MentorSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
