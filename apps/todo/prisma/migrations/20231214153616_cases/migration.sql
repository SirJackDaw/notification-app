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
CREATE TABLE `_ItemToNotifyCase` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ItemToNotifyCase_AB_unique`(`A`, `B`),
    INDEX `_ItemToNotifyCase_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ItemToNotifyCase` ADD CONSTRAINT `_ItemToNotifyCase_A_fkey` FOREIGN KEY (`A`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ItemToNotifyCase` ADD CONSTRAINT `_ItemToNotifyCase_B_fkey` FOREIGN KEY (`B`) REFERENCES `NotifyCase`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- InsertInitialCase
INSERT INTO `NotifyCase` (name, description) VALUES ('case 1', 'Soon expiried Todos')
