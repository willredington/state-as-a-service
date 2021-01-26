-- CreateTable
CREATE TABLE "state_action" (
    "id" SERIAL NOT NULL,
    "actionType" TEXT NOT NULL,
    "stateRegistryId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "state_registry" (
    "id" SERIAL NOT NULL,
    "stateKey" TEXT NOT NULL,
    "reducerKey" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "state_action" ADD FOREIGN KEY ("stateRegistryId") REFERENCES "state_registry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
