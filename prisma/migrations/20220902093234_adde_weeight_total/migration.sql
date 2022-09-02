/*
  Warnings:

  - You are about to drop the column `title` on the `Weight` table. All the data in the column will be lost.
  - Added the required column `weightTotal` to the `Weight` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Weight" (
    "id" TEXT NOT NULL,
    "weightTotal" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Weight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Weight" ("body", "createdAt", "id", "updatedAt", "userId") SELECT "body", "createdAt", "id", "updatedAt", "userId" FROM "Weight";
DROP TABLE "Weight";
ALTER TABLE "new_Weight" RENAME TO "Weight";
CREATE UNIQUE INDEX "Weight_id_key" ON "Weight"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
