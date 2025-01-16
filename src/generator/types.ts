import type { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

import type { Uid } from './utils.js';

export type Generated<T> =
	T extends ColumnType<infer S, infer I, infer U>
		? ColumnType<S, I | undefined, U>
		: ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, string, string>;

export declare namespace Card {
	export interface Table {
		id: Generated<number>;
		uid: Uid;
		provider_id: string;
		name: string;
		thumbnail: string;
		description: null | string;
		supertype_id: number;
		rarity_id: number | null;
		illustrator_id: number | null;
		set_id: number;
		pv: number;
		created_at: Timestamp;
		updated_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace CardCollection {
	export interface Table {
		card_id: number;
		collection_id: number;
		created_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace CardType {
	export interface Table {
		card_id: number;
		type_id: number;
		created_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace CardSubtype {
	export interface Table {
		card_id: number;
		subtype_id: number;
		created_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace Rarity {
	export interface Table {
		id: Generated<number>;
		uid: Uid;
		name: string;
		created_at: Timestamp;
		updated_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace Subtype {
	export interface Table {
		id: Generated<number>;
		uid: Uid;
		name: string;
		created_at: Timestamp;
		updated_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace Type {
	export interface Table {
		id: Generated<number>;
		uid: Uid;
		name: string;
		created_at: Timestamp;
		updated_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace Supertype {
	export interface Table {
		id: Generated<number>;
		uid: Uid;
		name: string;
		created_at: Timestamp;
		updated_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace Collection {
	export interface Table {
		id: Generated<number>;
		uid: Uid;
		name: string;
		slug: string;
		public: boolean;
		created_at: Timestamp;
		updated_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace CollectionUser {
	export interface Table {
		collection_id: number;
		user_id: number;
		created_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace Set {
	export interface Table {
		id: Generated<number>;
		uid: Uid;
		name: string;
		size: number;
		released_at: Timestamp;
		created_at: Timestamp;
		updated_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace Illustrator {
	export interface Table {
		id: Generated<number>;
		uid: Uid;
		name: string;
		created_at: Timestamp;
		updated_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace Invitation {
	export interface Table {
		id: Generated<number>;
		uid: Uid;
		owner_id: number;
		guest_id: number;
		collection_id: number;
		expires_at: Timestamp;
		created_at: Timestamp;
		updated_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export declare namespace User {
	export interface Table {
		id: Generated<number>;
		uid: Uid;
		firstname: string;
		lastname: string;
		email: string;
		username: string;
		password: string;
		reset_password_token: null | Uid;
		created_at: Timestamp;
		updated_at: Timestamp;
	}

	export type Row = Selectable<Table>;
	export type Create = Insertable<Table>;
	export type Update = Updateable<Table>;
}

export interface DB {
	cards: Card.Table;
	rarities: Rarity.Table;
	types: Type.Table;
	subtypes: Subtype.Table;
	supertypes: Supertype.Table;
	collections: Collection.Table;
	sets: Set.Table;
	illustrators: Illustrator.Table;
	invitations: Invitation.Table;
	users: User.Table;
	cards_collections: CardCollection.Table;
	cards_types: CardType.Table;
	cards_subtypes: CardSubtype.Table;
	collections_users: CollectionUser.Table;
}
