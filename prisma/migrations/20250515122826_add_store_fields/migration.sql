/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prescribe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shoppingcart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `PharmacyStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `PharmacyStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pcn` to the `PharmacyStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_tagId_fkey`;

-- AlterTable
ALTER TABLE `pharmacystore` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `pcn` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `prescription` ADD COLUMN `dosage` VARCHAR(191) NULL,
    ADD COLUMN `frequency` VARCHAR(191) NULL,
    ADD COLUMN `instructions` VARCHAR(191) NULL,
    ADD COLUMN `patientId` VARCHAR(191) NULL,
    ADD COLUMN `pharmacistId` VARCHAR(191) NULL,
    ADD COLUMN `quantity` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('PATIENT', 'PHARMACIST', 'ADMIN') NOT NULL DEFAULT 'PATIENT';

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `prescribe`;

-- DropTable
DROP TABLE `shoppingcart`;

-- DropTable
DROP TABLE `tag`;

-- CreateTable
CREATE TABLE `Pharmacist` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `licenseNumber` VARCHAR(191) NOT NULL,
    `specialization` VARCHAR(191) NULL,
    `yearsOfExperience` INTEGER NOT NULL,
    `pharmacyId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Pharmacist_userId_key`(`userId`),
    UNIQUE INDEX `Pharmacist_licenseNumber_key`(`licenseNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medication` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `dosageForm` VARCHAR(191) NOT NULL,
    `strength` VARCHAR(191) NOT NULL,
    `manufacturer` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `stockQuantity` INTEGER NOT NULL,
    `reorderLevel` INTEGER NOT NULL,
    `expiryDate` DATETIME(3) NOT NULL,
    `pharmacyId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pharmacist` ADD CONSTRAINT `Pharmacist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pharmacist` ADD CONSTRAINT `Pharmacist_pharmacyId_fkey` FOREIGN KEY (`pharmacyId`) REFERENCES `PharmacyStore`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescription` ADD CONSTRAINT `Prescription_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prescription` ADD CONSTRAINT `Prescription_pharmacistId_fkey` FOREIGN KEY (`pharmacistId`) REFERENCES `Pharmacist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medication` ADD CONSTRAINT `Medication_pharmacyId_fkey` FOREIGN KEY (`pharmacyId`) REFERENCES `PharmacyStore`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
