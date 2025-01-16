import { Kysely } from 'kysely';

import type { DB } from '../types.js';

import { tableNameGenerator } from '../utils.js';

const { fk, pk, tableName, now } = tableNameGenerator('cards_subtypes');

export async function up(db: Kysely<DB>): Promise<void> {
	await db.schema
		.createTable(tableName)

		// Columns
		.addColumn('card_id', 'integer', (col) => col.notNull())
		.addColumn('subtype_id', 'integer', (col) => col.notNull())
		.addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(now()))

		// Constraints
		.addPrimaryKeyConstraint(pk(), ['card_id', 'subtype_id'])
		.addForeignKeyConstraint(fk('card_id'), ['card_id'], 'cards', ['id'], (cb) =>
			cb.onDelete('cascade'),
		)
		.addForeignKeyConstraint(fk('subtype_id'), ['subtype_id'], 'subtypes', ['id'], (cb) =>
			cb.onDelete('cascade'),
		)

		// Run
		.execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
	await db.schema.dropTable(tableName).execute();
}
