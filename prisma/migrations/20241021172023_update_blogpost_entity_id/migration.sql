/*
  Warnings:

  - You are about to drop the column `categoryId` on the `BlogPost` table. All the data in the column will be lost.
  - Added the required column `entityId` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `BlogPost` DROP FOREIGN KEY `BlogPost_categoryId_fkey`;

-- AlterTable
ALTER TABLE `BlogPost` DROP COLUMN `categoryId`,
    ADD COLUMN `entityId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `BlogPost` ADD CONSTRAINT `BlogPost_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
