/*
  Warnings:

  - Added the required column `focusAreas` to the `SiteSettings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "yearsOfExperience" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "resumeUrl" TEXT NOT NULL,
    "heroSummary" TEXT NOT NULL,
    "aboutParagraph1" TEXT NOT NULL,
    "aboutParagraph2" TEXT NOT NULL,
    "aboutHighlights" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "twitterUrl" TEXT NOT NULL,
    "mediumUrl" TEXT NOT NULL,
    "focusAreas" TEXT NOT NULL,
    "skillLanguages" TEXT NOT NULL,
    "skillFrameworks" TEXT NOT NULL,
    "skillTools" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SiteSettings" ("aboutHighlights", "aboutParagraph1", "aboutParagraph2", "description", "education", "githubUrl", "heroSummary", "id", "linkedinUrl", "mediumUrl", "name", "resumeUrl", "role", "skillFrameworks", "skillLanguages", "skillTools", "title", "twitterUrl", "updatedAt", "yearsOfExperience", "focusAreas") SELECT "aboutHighlights", "aboutParagraph1", "aboutParagraph2", "description", "education", "githubUrl", "heroSummary", "id", "linkedinUrl", "mediumUrl", "name", "resumeUrl", "role", "skillFrameworks", "skillLanguages", "skillTools", "title", "twitterUrl", "updatedAt", "yearsOfExperience", '["React","Next.js"]' FROM "SiteSettings";
DROP TABLE "SiteSettings";
ALTER TABLE "new_SiteSettings" RENAME TO "SiteSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
