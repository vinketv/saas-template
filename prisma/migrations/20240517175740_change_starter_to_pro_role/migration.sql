/*
  Warnings:

  - The values [STARTER] on the enum `User_plan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `plan` ENUM('FREE', 'PRO', 'BUSINESS') NULL;
