# Gestion de collections de cartes pokemon

```md
users

- id
- uid
- firstname
- lastname
- email
- password
- username
- reset_password_token
- created_at
- updated_at
```

```md
collections

- id
- uid
- name
- slug
- public
- created_at
- updated_at
```

```md
collections_users

- collection_id
- user_id
- created_at
```

```md
invitations

- id
- uid
- owner_id
- guest_id
- collection_id
- expires_at
- created_at
- updated_at
```

```md
cards_collections

- collection_id
- card_id
- created_at
```

```md
cards

- id
- uid
- name
- thumbnail
- description
- card_typology_id
- card_type_id
- rarity
- serial_number
- illustrator_id
- pv
- extension_id
- created_at
- updated_at
```

```md
card_types

- id
- uid
- name
- color
- created_at
- updated_at
```

```md
card_typology

- id
- uid
- name
- created_at
- updated_at
```

```md
illustrators

- id
- uid
- firstname
- lastname
- country_id
- created_at
- updated_at
```

```md
countries

- id
- uid
- name
- created_at
- updated_at
```

```md
extensions

- id
- uid
- name
- size
- released_at
- created_at
- updated_at
```
