import { Kysely } from 'kysely';

import type { DB } from '../types.js';

import { importCards } from '../api/cards.js';
import { importRarities } from '../api/rarities.js';
import { importSets } from '../api/sets.js';
import { importTypes } from '../api/types.js';

export async function up(db: Kysely<DB>): Promise<void> {
	await importTypes(db);
	await importRarities(db);
	await importSets(db);
	await importCards(db);
}

//eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
export async function down(_db: Kysely<DB>): Promise<void> {
	return void 0;
}
