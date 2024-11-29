/*
  Warnings:

  - You are about to drop the column `uploadedById` on the `TaskAssignment` table. All the data in the column will be lost.
  - Added the required column `userId` to the `TaskAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TaskAssignment" DROP CONSTRAINT "TaskAssignment_uploadedById_fkey";

-- AlterTable
ALTER TABLE "TaskAssignment" DROP COLUMN "uploadedById",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskAssignment" ADD CONSTRAINT "TaskAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
