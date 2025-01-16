-- -------------------------------------------------------------
-- TablePlus 6.2.1(578)
--
-- https://tableplus.com/
--
-- Database: bddintro
-- Generation Time: 2025-01-16 13:35:12.7180
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."cards" (
    "id" int4 NOT NULL,
    "uid" uuid NOT NULL,
    "provider_id" varchar NOT NULL,
    "name" varchar NOT NULL,
    "thumbnail" varchar NOT NULL,
    "description" text,
    "supertype_id" int4 NOT NULL,
    "rarity_id" int4,
    "illustrator_id" int4,
    "set_id" int4 NOT NULL,
    "pv" int2 NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."cards_collections" (
    "card_id" int4 NOT NULL,
    "collection_id" int4 NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("card_id","collection_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."cards_subtypes" (
    "card_id" int4 NOT NULL,
    "subtype_id" int4 NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("card_id","subtype_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."cards_types" (
    "card_id" int4 NOT NULL,
    "type_id" int4 NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("card_id","type_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."collections" (
    "id" int4 NOT NULL,
    "uid" uuid NOT NULL,
    "name" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "public" bool NOT NULL DEFAULT false,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."collections_users" (
    "collection_id" int4 NOT NULL,
    "user_id" int4 NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("collection_id","user_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."illustrators" (
    "id" int4 NOT NULL,
    "uid" uuid NOT NULL,
    "name" varchar NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."invitations" (
    "id" int4 NOT NULL,
    "uid" uuid NOT NULL,
    "owner_id" int4 NOT NULL,
    "guest_id" int4 NOT NULL,
    "collection_id" int4 NOT NULL,
    "expires_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."kysely_migration" (
    "name" varchar(255) NOT NULL,
    "timestamp" varchar(255) NOT NULL,
    PRIMARY KEY ("name")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."kysely_migration_lock" (
    "id" varchar(255) NOT NULL,
    "is_locked" int4 NOT NULL DEFAULT 0,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."rarities" (
    "id" int4 NOT NULL,
    "uid" uuid NOT NULL,
    "name" varchar NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."sets" (
    "id" int4 NOT NULL,
    "uid" uuid NOT NULL,
    "name" varchar NOT NULL,
    "size" int2 NOT NULL,
    "released_at" timestamp NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."subtypes" (
    "id" int4 NOT NULL,
    "uid" uuid NOT NULL,
    "name" varchar NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."supertypes" (
    "id" int4 NOT NULL,
    "uid" uuid NOT NULL,
    "name" varchar NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."types" (
    "id" int4 NOT NULL,
    "uid" uuid NOT NULL,
    "name" varchar NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL,
    "uid" uuid NOT NULL,
    "firstname" varchar NOT NULL,
    "lastname" varchar NOT NULL,
    "email" varchar(180) NOT NULL,
    "username" varchar(50) NOT NULL,
    "password" varchar NOT NULL,
    "reset_password_token" uuid,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

ALTER TABLE "public"."cards" ADD FOREIGN KEY ("supertype_id") REFERENCES "public"."supertypes"("id") ON DELETE CASCADE;
ALTER TABLE "public"."cards" ADD FOREIGN KEY ("set_id") REFERENCES "public"."sets"("id") ON DELETE CASCADE;
ALTER TABLE "public"."cards" ADD FOREIGN KEY ("illustrator_id") REFERENCES "public"."illustrators"("id") ON DELETE CASCADE;
ALTER TABLE "public"."cards" ADD FOREIGN KEY ("rarity_id") REFERENCES "public"."rarities"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX cards_pk ON public.cards USING btree (id);
CREATE UNIQUE INDEX cards_uid_uq ON public.cards USING btree (uid);
ALTER TABLE "public"."cards_collections" ADD FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE CASCADE;
ALTER TABLE "public"."cards_collections" ADD FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX cards_collections_pk ON public.cards_collections USING btree (card_id, collection_id);
ALTER TABLE "public"."cards_subtypes" ADD FOREIGN KEY ("subtype_id") REFERENCES "public"."subtypes"("id") ON DELETE CASCADE;
ALTER TABLE "public"."cards_subtypes" ADD FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX cards_subtypes_pk ON public.cards_subtypes USING btree (card_id, subtype_id);
ALTER TABLE "public"."cards_types" ADD FOREIGN KEY ("type_id") REFERENCES "public"."types"("id") ON DELETE CASCADE;
ALTER TABLE "public"."cards_types" ADD FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX cards_types_pk ON public.cards_types USING btree (card_id, type_id);


-- Indices
CREATE UNIQUE INDEX collections_pk ON public.collections USING btree (id);
CREATE UNIQUE INDEX collections_uid_uq ON public.collections USING btree (uid);
ALTER TABLE "public"."collections_users" ADD FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE CASCADE;
ALTER TABLE "public"."collections_users" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX collections_users_pk ON public.collections_users USING btree (collection_id, user_id);


-- Indices
CREATE UNIQUE INDEX illustrators_pk ON public.illustrators USING btree (id);
CREATE UNIQUE INDEX illustrators_uid_uq ON public.illustrators USING btree (uid);
CREATE UNIQUE INDEX illustrators_name_uq ON public.illustrators USING btree (name);
ALTER TABLE "public"."invitations" ADD FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;
ALTER TABLE "public"."invitations" ADD FOREIGN KEY ("guest_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;
ALTER TABLE "public"."invitations" ADD FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE CASCADE;


-- Indices
CREATE UNIQUE INDEX invitations_pk ON public.invitations USING btree (id);
CREATE UNIQUE INDEX invitations_uid_uq ON public.invitations USING btree (uid);
CREATE UNIQUE INDEX invitations_owner_guest_collection_uq ON public.invitations USING btree (owner_id, guest_id, collection_id);


-- Indices
CREATE UNIQUE INDEX rarities_pk ON public.rarities USING btree (id);
CREATE UNIQUE INDEX rarities_uid_uq ON public.rarities USING btree (uid);
CREATE UNIQUE INDEX rarities_name_uq ON public.rarities USING btree (name);


-- Indices
CREATE UNIQUE INDEX sets_pk ON public.sets USING btree (id);
CREATE UNIQUE INDEX sets_uid_uq ON public.sets USING btree (uid);
CREATE UNIQUE INDEX sets_name_uq ON public.sets USING btree (name);


-- Indices
CREATE UNIQUE INDEX subtypes_pk ON public.subtypes USING btree (id);
CREATE UNIQUE INDEX subtypes_uid_uq ON public.subtypes USING btree (uid);
CREATE UNIQUE INDEX subtypes_name_uq ON public.subtypes USING btree (name);


-- Indices
CREATE UNIQUE INDEX supertypes_pk ON public.supertypes USING btree (id);
CREATE UNIQUE INDEX supertypes_uid_uq ON public.supertypes USING btree (uid);
CREATE UNIQUE INDEX supertypes_name_uq ON public.supertypes USING btree (name);


-- Indices
CREATE UNIQUE INDEX types_pk ON public.types USING btree (id);
CREATE UNIQUE INDEX types_uid_uq ON public.types USING btree (uid);
CREATE UNIQUE INDEX types_name_uq ON public.types USING btree (name);


-- Indices
CREATE UNIQUE INDEX users_pk ON public.users USING btree (id);
CREATE UNIQUE INDEX users_uid_uq ON public.users USING btree (uid);
CREATE UNIQUE INDEX users_email_uq ON public.users USING btree (email);
CREATE UNIQUE INDEX users_username_uq ON public.users USING btree (username);
