import { Kysely } from 'kysely';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { v7 } from 'uuid';

import type { DB } from '../types.js';

import { setCache } from '../cache.js';
import { date } from '../utils.js';

export async function importRarities(db: Kysely<DB>) {
	const rarities = await PokemonTCG.getRarities();

	for (const rarity of rarities) {
		const row = await db
			.insertInto('rarities')
			.values({
				uid: v7(),
				name: rarity.toString(),
				created_at: date().toSQL(),
				updated_at: date().toSQL(),
			})
			.returning(['id', 'name'])
			.executeTakeFirstOrThrow();

		setCache('rarity', row.name, row.id);
		console.log(`Rarity imported: ${row.id} - ${row.name}`);
	}
}
