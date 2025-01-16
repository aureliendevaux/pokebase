CREATE TABLE "cards" (
    "id" int NOT NULL,
    "uid" uuid NOT NULL,
    "provider_id" varchar NOT NULL,
    "name" varchar NOT NULL,
    "thumbnail" varchar NOT NULL,
    "description" varchar DEFAULT null,
    "supertype_id" int NOT NULL,
    "rarity_id" int DEFAULT null,
    "illustrator_id" int DEFAULT null,
    "set_id" int NOT NULL,
    "pv" smallint NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

ALTER TABLE "cards" ADD FOREIGN KEY ("supertype_id") REFERENCES "supertypes"("id") ON DELETE CASCADE;
ALTER TABLE "cards" ADD FOREIGN KEY ("rarity_id") REFERENCES "rarities"("id") ON DELETE CASCADE;
ALTER TABLE "cards" ADD FOREIGN KEY ("set_id") REFERENCES "sets"("id") ON DELETE CASCADE;
ALTER TABLE "cards" ADD FOREIGN KEY ("illustrator_id") REFERENCES "illustrators"("id") ON DELETE CASCADE;

CREATE UNIQUE INDEX cards_pk ON cards USING btree (id);
CREATE UNIQUE INDEX cards_uid_uq ON cards USING btree (uid);
