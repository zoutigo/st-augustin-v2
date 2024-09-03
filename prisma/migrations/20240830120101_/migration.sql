/*
  Warnings:

  - The values [ADMIN] on the enum `users_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `passwordResetTokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationTokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `firstname` VARCHAR(191) NULL,
    ADD COLUMN `grade` ENUM('ADMIN', 'MANAGER', 'MODERATOR', 'NONE') NOT NULL DEFAULT 'NONE',
    ADD COLUMN `lastname` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    MODIFY `role` ENUM('PS', 'MS', 'GS', 'CE1', 'CE2', 'CM1', 'CM2', 'APEL', 'OGEC', 'USER') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `passwordResetTokens`;

-- DropTable
DROP TABLE `verificationTokens`;
