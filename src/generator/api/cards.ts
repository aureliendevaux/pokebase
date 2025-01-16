import { Kysely } from 'kysely';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { v7 } from 'uuid';

import type { DB } from '../types.js';

import { getCache, getSafeCache, setCache } from '../cache.js';
import { date } from '../utils.js';

// eslint-disable-next-line sonarjs/cognitive-complexity
export async function importCards(db: Kysely<DB>) {
	const cards = await PokemonTCG.getAllCards();

	for (const card of cards) {
		console.log(`Importing card: ${card.name}`);
		let illustrator_id: number | null = null;

		if (card.artist) {
			const illustratorFound = getSafeCache('illustrator', card.artist);

			if (illustratorFound) {
				illustrator_id = illustratorFound;
			} else {
				const illustrator = await db
					.insertInto('illustrators')
					.values({
						uid: v7(),
						name: card.artist,
						created_at: date().toSQL(),
						updated_at: date().toSQL(),
					})
					.returning(['id'])
					.executeTakeFirstOrThrow();

				setCache('illustrator', card.artist, illustrator.id);
				illustrator_id = illustrator.id;
			}
		}

		const row = await db
			.insertInto('cards')
			.values({
				uid: v7(),
				provider_id: card.id,
				name: card.name,
				thumbnail: card.images.large,
				description: card.flavorText ?? null,
				supertype_id: getCache('supertype', card.supertype),
				rarity_id: card.rarity ? getCache('rarity', card.rarity) : null,
				illustrator_id: illustrator_id,
				set_id: getCache('set', card.set.name),
				pv: card.hp ? Number(card.hp) : 0,
				created_at: date().toSQL(),
				updated_at: date().toSQL(),
			})
			.returning(['id', 'name'])
			.executeTakeFirstOrThrow();

		if (card.types && card.types.length > 0) {
			for (const type of card.types) {
				await db
					.insertInto('cards_types')
					.values({
						card_id: row.id,
						type_id: getCache('type', type),
						created_at: date().toSQL(),
					})
					.execute();
			}
		}

		if (card.subtypes && card.subtypes.length > 0) {
			for (const subtype of card.subtypes) {
				await db
					.insertInto('cards_subtypes')
					.values({
						card_id: row.id,
						subtype_id: getCache('subtype', subtype),
						created_at: date().toSQL(),
					})
					.execute();
			}
		}

		console.log(`Card imported: ${row.id} - ${row.name}`);
	}
}
