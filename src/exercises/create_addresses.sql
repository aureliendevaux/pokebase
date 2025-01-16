CREATE TABLE addresses (
                           id serial not null,
                           address_line1 varchar not null,
                           address_line2 varchar default null,
                           address_line3 varchar default null,
                           postal_code char(5) not null,
                           city varchar not null,
                           country varchar not null,
                           created_at timestamp not null default now(),
                           updated_at timestamp not null default now(),
                           PRIMARY KEY (id)
);

CREATE UNIQUE INDEX "uniq_address" ON addresses USING btree (address_line1, postal_code, country);