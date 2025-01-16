import { Kysely } from 'kysely';

import type { DB } from '../types.js';

import { tableNameGenerator } from '../utils.js';

const { fk, pk, tableName, now } = tableNameGenerator('cards_types');

export async function up(db: Kysely<DB>): Promise<void> {
	await db.schema
		.createTable(tableName)

		// Columns
		.addColumn('card_id', 'integer', (col) => col.notNull())
		.addColumn('type_id', 'integer', (col) => col.notNull())
		.addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(now()))

		// Constraints
		.addPrimaryKeyConstraint(pk(), ['card_id', 'type_id'])
		.addForeignKeyConstraint(fk('card_id'), ['card_id'], 'cards', ['id'], (cb) =>
			cb.onDelete('cascade'),
		)
		.addForeignKeyConstraint(fk('type_id'), ['type_id'], 'types', ['id'], (cb) =>
			cb.onDelete('cascade'),
		)

		// Run
		.execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
	await db.schema.dropTable(tableName).execute();
}
