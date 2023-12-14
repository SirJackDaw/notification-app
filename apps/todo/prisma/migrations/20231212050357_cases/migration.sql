-- AlterTable
ALTER TABLE `Item` MODIFY `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `NotifyCase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemsOnCases` (
    `itemId` VARCHAR(191) NOT NULL,
    `caseId` INTEGER NOT NULL,

    PRIMARY KEY (`itemId`, `caseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemsOnCases` ADD CONSTRAINT `ItemsOnCases_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemsOnCases` ADD CONSTRAINT `ItemsOnCases_caseId_fkey` FOREIGN KEY (`caseId`) REFERENCES `NotifyCase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- InsertInitialCase
INSERT INTO `NotifyCase` (name, description) VALUES ('case 1', 'Soon expiried Todos')