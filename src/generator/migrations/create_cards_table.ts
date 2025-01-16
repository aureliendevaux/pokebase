import { Kysely } from 'kysely';

import type { DB } from '../types.js';

import { tableNameGenerator } from '../utils.js';

const { fk, pk, tableName, uq, now } = tableNameGenerator('cards');

export async function up(db: Kysely<DB>): Promise<void> {
	await db.schema
		.createTable(tableName)

		// Columns
		.addColumn('id', 'integer', (col) => col.generatedAlwaysAsIdentity().notNull())
		.addColumn('uid', 'uuid', (col) => col.notNull())
		.addColumn('provider_id', 'varchar', (col) => col.notNull())
		.addColumn('name', 'varchar', (col) => col.notNull())
		.addColumn('thumbnail', 'varchar', (col) => col.notNull())
		.addColumn('description', 'text', (col) => col.defaultTo(null))
		.addColumn('supertype_id', 'integer', (col) => col.notNull())
		.addColumn('rarity_id', 'integer', (col) => col.defaultTo(null))
		.addColumn('illustrator_id', 'integer', (col) => col.defaultTo(null))
		.addColumn('set_id', 'integer', (col) => col.notNull())
		.addColumn('pv', 'smallint', (col) => col.notNull())
		.addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(now()))
		.addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(now()))

		// Constraints
		.addPrimaryKeyConstraint(pk(), ['id'])
		.addUniqueConstraint(uq('uid'), ['uid'])
		.addForeignKeyConstraint(fk('supertype_id'), ['supertype_id'], 'supertypes', ['id'], (cb) =>
			cb.onDelete('cascade'),
		)
		.addForeignKeyConstraint(fk('rarity_id'), ['rarity_id'], 'rarities', ['id'], (cb) =>
			cb.onDelete('cascade'),
		)
		.addForeignKeyConstraint(
			fk('illustrator_id'),
			['illustrator_id'],
			'illustrators',
			['id'],
			(cb) => cb.onDelete('cascade'),
		)
		.addForeignKeyConstraint(fk('set_id'), ['set_id'], 'sets', ['id'], (cb) =>
			cb.onDelete('cascade'),
		)

		// Run
		.execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
	await db.schema.dropTable(tableName).execute();
}
