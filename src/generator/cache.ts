export const cache = {
	rarity: new Map<string, number>(),
	subtype: new Map<string, number>(),
	type: new Map<string, number>(),
	supertype: new Map<string, number>(),
	illustrator: new Map<string, number>(),
	set: new Map<string, number>(),
} as const;

export function clearCache() {
	cache.rarity.clear();
	cache.subtype.clear();
	cache.type.clear();
	cache.supertype.clear();
	cache.illustrator.clear();
	cache.set.clear();
}

export function setCache(type: keyof typeof cache, name: string, id: number) {
	if (!cache[type]) {
		throw new Error(`Invalid cache type: ${type}`);
	}

	if (cache[type].has(name)) return;

	cache[type].set(name, id);
}

export function getCache(type: keyof typeof cache, name: string) {
	if (!cache[type]) {
		throw new Error(`Invalid cache type: ${type}`);
	}

	const found = cache[type].get(name);

	if (!found) {
		throw new Error(`Cache not found(${type}): ${name}`);
	}

	return found;
}

export function getSafeCache(type: keyof typeof cache, name: string) {
	if (!cache[type]) {
		throw new Error(`Invalid cache type: ${type}`);
	}

	return cache[type].get(name) ?? null;
}
