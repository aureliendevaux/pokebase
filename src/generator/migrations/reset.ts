import { Kysely } from 'kysely';

import type { DB } from '../types.js';

export async function up(db: Kysely<DB>): Promise<void> {
	await db.schema.dropTable('countries').ifExists().cascade().execute();
	await db.schema.dropTable('extensions').ifExists().cascade().execute();
	await db.schema.dropTable('illustrators').ifExists().cascade().execute();
	await db.schema.dropTable('supertypes').ifExists().cascade().execute();
	await db.schema.dropTable('types').ifExists().cascade().execute();
	await db.schema.dropTable('subtypes').ifExists().cascade().execute();
	await db.schema.dropTable('rarities').ifExists().cascade().execute();
	await db.schema.dropTable('cards_collections').ifExists().cascade().execute();
	await db.schema.dropTable('collections_users').ifExists().cascade().execute();
	await db.schema.dropTable('collections').ifExists().cascade().execute();
	await db.schema.dropTable('invitations').ifExists().cascade().execute();
	await db.schema.dropTable('cards').ifExists().cascade().execute();
	await db.schema.dropTable('users').ifExists().cascade().execute();
}

// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
export async function down(_db: Kysely<DB>): Promise<void> {
	return void 0;
}
