-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "employment" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "highlights" TEXT NOT NULL,
    "translations" TEXT NOT NULL DEFAULT '{}',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Experience" ("company", "createdAt", "employment", "highlights", "id", "location", "order", "period", "role", "skills", "updatedAt") SELECT "company", "createdAt", "employment", "highlights", "id", "location", "order", "period", "role", "skills", "updatedAt" FROM "Experience";
DROP TABLE "Experience";
ALTER TABLE "new_Experience" RENAME TO "Experience";
CREATE TABLE "new_Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "translations" TEXT NOT NULL DEFAULT '{}',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Service" ("createdAt", "description", "id", "order", "title", "updatedAt") SELECT "createdAt", "description", "id", "order", "title", "updatedAt" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
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
    "translations" TEXT NOT NULL DEFAULT '{}',
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SiteSettings" ("aboutHighlights", "aboutParagraph1", "aboutParagraph2", "description", "education", "focusAreas", "githubUrl", "heroSummary", "id", "linkedinUrl", "mediumUrl", "name", "resumeUrl", "role", "skillFrameworks", "skillLanguages", "skillTools", "title", "twitterUrl", "updatedAt", "yearsOfExperience") SELECT "aboutHighlights", "aboutParagraph1", "aboutParagraph2", "description", "education", "focusAreas", "githubUrl", "heroSummary", "id", "linkedinUrl", "mediumUrl", "name", "resumeUrl", "role", "skillFrameworks", "skillLanguages", "skillTools", "title", "twitterUrl", "updatedAt", "yearsOfExperience" FROM "SiteSettings";
DROP TABLE "SiteSettings";
ALTER TABLE "new_SiteSettings" RENAME TO "SiteSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
