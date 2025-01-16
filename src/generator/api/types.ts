import { Kysely } from 'kysely';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { v7 } from 'uuid';

import type { DB } from '../types.js';

import { setCache } from '../cache.js';
import { date } from '../utils.js';

export async function importTypes(db: Kysely<DB>) {
	const types = await PokemonTCG.getTypes();
	const subtypes = await PokemonTCG.getSubtypes();
	const supertypes = await PokemonTCG.getSupertypes();

	for (const supertype of supertypes) {
		const row = await db
			.insertInto('supertypes')
			.values({
				uid: v7(),
				name: supertype.toString(),
				created_at: date().toSQL(),
				updated_at: date().toSQL(),
			})
			.returning(['id', 'name'])
			.executeTakeFirstOrThrow();

		setCache('supertype', row.name, row.id);
		console.log(`Supertype imported: ${row.id} - ${row.name}`);
	}

	for (const type of types) {
		const row = await db
			.insertInto('types')
			.values({
				uid: v7(),
				name: type.toString(),
				created_at: date().toSQL(),
				updated_at: date().toSQL(),
			})
			.returning(['id', 'name'])
			.executeTakeFirstOrThrow();

		setCache('type', row.name, row.id);
		console.log(`Type imported: ${row.id} - ${row.name}`);
	}

	for (const subtype of subtypes) {
		const row = await db
			.insertInto('subtypes')
			.values({
				uid: v7(),
				name: subtype.toString(),
				created_at: date().toSQL(),
				updated_at: date().toSQL(),
			})
			.returning(['id', 'name'])
			.executeTakeFirstOrThrow();

		setCache('subtype', row.name, row.id);
		console.log(`Subtype imported: ${row.id} - ${row.name}`);
	}
}
