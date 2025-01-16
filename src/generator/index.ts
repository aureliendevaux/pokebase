import { Migrator } from 'kysely';

import { clearCache } from './cache.js';
import { db } from './database.js';
import { OwnMigrationProvider } from './own_migration_provider.js';

async function runMigrations() {
	const migrator = new Migrator({
		db: db,
		provider: new OwnMigrationProvider(),
	});

	const { error, results } = await migrator.migrateToLatest();

	if (results) {
		for (const it of results) {
			if (it.status === 'Success') {
				console.log(`migration "${it.migrationName}" was executed successfully`);
			} else if (it.status === 'Error') {
				console.error(`failed to execute migration "${it.migrationName}"`);
			}
		}
	}

	if (error) {
		console.error('failed to migrate');
		console.error(error);
		// eslint-disable-next-line n/no-process-exit, unicorn/no-process-exit
		process.exit(1);
	}

	await db.destroy();
}

await runMigrations();

clearCache();
