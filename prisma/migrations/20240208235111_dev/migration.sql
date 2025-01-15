/*
  Warnings:

  - The values [Waiting,In_progress,Delivered] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `status` on the `prescription` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('pending', 'approved', 'rejected') NOT NULL;

-- AlterTable
ALTER TABLE `prescription` MODIFY `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending';
