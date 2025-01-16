import { sql } from 'kysely';
import { DateTime } from 'luxon';
import { v7 as uuidV7 } from 'uuid';

import type { DB } from './types.js';

export interface Time {
	hour: number;
	minute: number;
	second: number;
}

class DateCreationError extends Error {
	constructor() {
		super('Invalid date');
	}
}

export function date(requestedDate?: Date | DateTime | string): DateTime<true> {
	if (!requestedDate) {
		return DateTime.now();
	}

	if (requestedDate instanceof DateTime) {
		if (!requestedDate.isValid) {
			throw new DateCreationError();
		}

		return requestedDate;
	}

	if (requestedDate instanceof Date) {
		const dateObject = DateTime.fromJSDate(requestedDate);

		if (!dateObject.isValid) {
			throw new DateCreationError();
		}

		return dateObject;
	}

	const dateObject = DateTime.fromSQL(requestedDate);

	if (!dateObject.isValid) {
		throw new DateCreationError();
	}

	return dateObject;
}

export function normalizeTime(value: null | Time) {
	if (value === null) return null;

	return `${padTime(value.hour)}:${padTime(value.minute)}:${padTime(value.second)}`;
}

export function parseTime(value: string): Time {
	const [hour, minute, second] = value.split(':').map(Number);

	return { hour, minute, second };
}

function padTime(value: number): string {
	return value.toString().padStart(2, '0');
}

// eslint-disable-next-line sonarjs/redundant-type-aliases
export type Uid = string;

export function generateUid() {
	return uuidV7();
}

export const uidRegex = /^[\dA-Za-z]{36}$/;

function now() {
	return sql`now()`;
}

export function tableNameGenerator(tableName: keyof DB) {
	function key(name: string) {
		return `${String(tableName)}_${name}`;
	}

	function pk() {
		return key('pk');
	}

	function uq(name: string) {
		return key(`${name}_uq`);
	}

	function fk(name: string) {
		return key(`${name}_fk`);
	}

	return {
		fk,
		key,
		pk,
		tableName,
		uq,
		now,
	};
}
