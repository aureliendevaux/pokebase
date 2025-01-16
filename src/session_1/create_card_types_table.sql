CREATE TABLE IF NOT EXISTS card_types (
    id integer NOT NULL PRIMARY KEY,
    uid uuid NOT NULL UNIQUE,
    name varchar NOT NULL,
    color char(7) NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);