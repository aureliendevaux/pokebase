import { Kysely } from 'kysely';

import type { DB } from '../types.js';

import { tableNameGenerator } from '../utils.js';

const { pk, tableName, uq, now } = tableNameGenerator('collections');

export async function up(db: Kysely<DB>): Promise<void> {
	await db.schema
		.createTable(tableName)

		// Columns
		.addColumn('id', 'integer', (col) => col.generatedAlwaysAsIdentity().notNull())
		.addColumn('uid', 'uuid', (col) => col.notNull())
		.addColumn('name', 'varchar', (col) => col.notNull())
		.addColumn('slug', 'varchar', (col) => col.notNull())
		.addColumn('public', 'boolean', (col) => col.notNull().defaultTo(false))
		.addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(now()))
		.addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(now()))

		// Constraints
		.addPrimaryKeyConstraint(pk(), ['id'])
		.addUniqueConstraint(uq('uid'), ['uid'])

		// Run
		.execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
	await db.schema.dropTable(tableName).execute();
}
