/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Page_name_key` ON `Page`;

-- AlterTable
ALTER TABLE `Page` ADD COLUMN `slug` VARCHAR(191) NOT NULL DEFAULT 'temporary-slug';

-- Update existing rows with unique values for `slug`
UPDATE `Page` SET `slug` = CONCAT('slug-', `id`);

-- Remove the default value
ALTER TABLE `Page` ALTER COLUMN `slug` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Page_slug_key` ON `Page`(`slug`);