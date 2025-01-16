CREATE TABLE IF NOT EXISTS users (
	id integer NOT NULL PRIMARY KEY,
	uid uuid NOT NULL UNIQUE,
	firstname varchar NOT NULL,
	lastname varchar NOT NULL,
	username varchar(50) NOT NULL,
	email varchar(180) NOT NULL,
	password varchar NOT NULL,
	reset_password_token uuid DEFAULT null,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
);