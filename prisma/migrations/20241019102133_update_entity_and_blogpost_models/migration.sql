/*
  Warnings:

  - You are about to drop the `BlogCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `BlogPost` DROP FOREIGN KEY `BlogPost_categoryId_fkey`;

-- DropTable
DROP TABLE `BlogCategory`;

-- CreateTable
CREATE TABLE `Entity` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Entity_name_key`(`name`),
    UNIQUE INDEX `Entity_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BlogPost` ADD CONSTRAINT `BlogPost_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Entity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
