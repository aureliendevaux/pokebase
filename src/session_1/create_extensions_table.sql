CREATE TABLE IF NOT EXISTS extensions (
    id integer NOT NULL PRIMARY KEY,
    uid uuid NOT NULL UNIQUE,
    name varchar NOT NULL,
    size smallint NOT NULL,
    released_at timestamp NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now()
);