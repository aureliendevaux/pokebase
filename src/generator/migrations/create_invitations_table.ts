import { Kysely } from 'kysely';

import type { DB } from '../types.js';

import { tableNameGenerator } from '../utils.js';

const { fk, pk, tableName, uq, now } = tableNameGenerator('invitations');

export async function up(db: Kysely<DB>): Promise<void> {
	await db.schema
		.createTable(tableName)

		// Columns
		.addColumn('id', 'integer', (col) => col.generatedAlwaysAsIdentity().notNull())
		.addColumn('uid', 'uuid', (col) => col.notNull())
		.addColumn('owner_id', 'integer', (col) => col.notNull())
		.addColumn('guest_id', 'integer', (col) => col.notNull())
		.addColumn('collection_id', 'integer', (col) => col.notNull())
		.addColumn('expires_at', 'timestamp', (col) => col.notNull())
		.addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(now()))
		.addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(now()))

		// Constraints
		.addPrimaryKeyConstraint(pk(), ['id'])
		.addUniqueConstraint(uq('uid'), ['uid'])
		.addUniqueConstraint(uq('owner_guest_collection'), ['owner_id', 'guest_id', 'collection_id'])
		.addForeignKeyConstraint(fk('owner_id'), ['owner_id'], 'users', ['id'], (cb) =>
			cb.onDelete('cascade'),
		)
		.addForeignKeyConstraint(fk('guest_id'), ['guest_id'], 'users', ['id'], (cb) =>
			cb.onDelete('cascade'),
		)
		.addForeignKeyConstraint(fk('collection_id'), ['collection_id'], 'collections', ['id'], (cb) =>
			cb.onDelete('cascade'),
		)

		// Run
		.execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
	await db.schema.dropTable(tableName).execute();
}
