/*
  Warnings:

  - You are about to alter the column `weightTotal` on the `Weight` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Weight" (
    "id" TEXT NOT NULL,
    "weightTotal" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Weight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Weight" ("body", "createdAt", "id", "updatedAt", "userId", "weightTotal") SELECT "body", "createdAt", "id", "updatedAt", "userId", "weightTotal" FROM "Weight";
DROP TABLE "Weight";
ALTER TABLE "new_Weight" RENAME TO "Weight";
CREATE UNIQUE INDEX "Weight_id_key" ON "Weight"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
