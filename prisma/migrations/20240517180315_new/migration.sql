/*
  Warnings:

  - The values [FREE] on the enum `User_plan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `plan` ENUM('STARTER', 'PRO', 'BUSINESS') NULL;
