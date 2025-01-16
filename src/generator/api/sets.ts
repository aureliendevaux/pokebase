import { Kysely } from 'kysely';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { v7 } from 'uuid';

import type { DB } from '../types.js';

import { setCache } from '../cache.js';
import { date } from '../utils.js';

export async function importSets(db: Kysely<DB>) {
	const sets = await PokemonTCG.getAllSets();

	for (const set of sets) {
		const row = await db
			.insertInto('sets')
			.values({
				uid: v7(),
				name: set.name,
				size: set.total,
				released_at: set.releaseDate,
				created_at: date().toSQL(),
				updated_at: date().toSQL(),
			})
			.returning(['id', 'name'])
			.executeTakeFirstOrThrow();

		setCache('set', row.name, row.id);
		console.log(`Set imported: ${row.id} - ${row.name}`);
	}
}
