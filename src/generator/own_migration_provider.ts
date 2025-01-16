import type { Migration, MigrationProvider } from 'kysely';

import path from 'node:path';

export class OwnMigrationProvider implements MigrationProvider {
	async getMigrations(): Promise<Record<string, Migration>> {
		const migrations: Record<string, Migration> = {};
		const files: Array<string> = [
			'reset',
			'create_users_table',
			'create_sets_table',
			'create_illustrators_table',
			'create_supertypes_table',
			'create_types_table',
			'create_subtypes_table',
			'create_rarities_table',
			'create_cards_table',
			'create_collections_table',
			'create_invitations_table',
			'create_collections_users_table',
			'create_cards_collections_table',
			'create_cards_subtypes_table',
			'create_cards_types_table',
			'fill_content',
		];

		const migrationsArray = await Promise.all(
			files.map(async (fileName, index) => {
				const key = String.fromCodePoint(97 + index) + '_' + fileName;

				return {
					key,
					migration: (await import(
						path.join(import.meta.dirname, 'migrations', fileName + '.ts')
					)) as Migration,
				};
			}),
		);

		for (const { key, migration } of migrationsArray) {
			migrations[key] = migration;
		}

		return migrations;
	}
}
