/*
  Warnings:

  - You are about to drop the column `stateKey` on the `StateRegistry` table. All the data in the column will be lost.
  - Added the required column `name` to the `StateAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `StateRegistry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StateAction" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StateRegistry" DROP COLUMN "stateKey",
ADD COLUMN     "name" TEXT NOT NULL;
