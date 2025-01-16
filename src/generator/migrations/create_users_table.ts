import { Kysely } from 'kysely';

import type { DB } from '../types.js';

import { tableNameGenerator } from '../utils.js';

const { pk, tableName, uq, now } = tableNameGenerator('users');

export async function up(db: Kysely<DB>): Promise<void> {
	await db.schema
		.createTable(tableName)

		// Columns
		.addColumn('id', 'integer', (col) => col.generatedAlwaysAsIdentity().notNull())
		.addColumn('uid', 'uuid', (col) => col.notNull())
		.addColumn('firstname', 'varchar', (col) => col.notNull())
		.addColumn('lastname', 'varchar', (col) => col.notNull())
		.addColumn('email', 'varchar(180)', (col) => col.notNull())
		.addColumn('username', 'varchar(50)', (col) => col.notNull())
		.addColumn('password', 'varchar', (col) => col.notNull())
		.addColumn('reset_password_token', 'uuid', (col) => col.defaultTo(null))
		.addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(now()))
		.addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(now()))

		// Constraints
		.addPrimaryKeyConstraint(pk(), ['id'])
		.addUniqueConstraint(uq('uid'), ['uid'])
		.addUniqueConstraint(uq('email'), ['email'])
		.addUniqueConstraint(uq('username'), ['username'])

		// Run
		.execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
	await db.schema.dropTable(tableName).execute();
}
