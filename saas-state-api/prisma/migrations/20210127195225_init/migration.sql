-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('STRING', 'BOOLEAN', 'NUMBER', 'LIST');

-- CreateTable
CREATE TABLE "StateValidator" (
    "id" SERIAL NOT NULL,
    "validatorClz" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateHandler" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "handlerClz" TEXT NOT NULL,
    "validatorId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateAction" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "property" TEXT NOT NULL,
    "propertyType" "PropertyType" NOT NULL,
    "handlerId" INTEGER,
    "reducerId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateReducer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "registryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateSchema" (
    "id" SERIAL NOT NULL,
    "schemaFactoryClz" TEXT NOT NULL,
    "registryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateRegistry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StateReducer_registryId_unique" ON "StateReducer"("registryId");

-- CreateIndex
CREATE UNIQUE INDEX "StateSchema_registryId_unique" ON "StateSchema"("registryId");

-- AddForeignKey
ALTER TABLE "StateHandler" ADD FOREIGN KEY ("validatorId") REFERENCES "StateValidator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateAction" ADD FOREIGN KEY ("handlerId") REFERENCES "StateHandler"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateAction" ADD FOREIGN KEY ("reducerId") REFERENCES "StateReducer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateReducer" ADD FOREIGN KEY ("registryId") REFERENCES "StateRegistry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateSchema" ADD FOREIGN KEY ("registryId") REFERENCES "StateRegistry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
