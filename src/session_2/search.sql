SELECT
    cards.id, cards.name AS card_name, subtypes.name AS subtype_name, types.name AS type_name
FROM cards
     INNER JOIN cards_types ON cards.id = cards_types.card_id
     INNER JOIN types ON cards_types.type_id = types.id
     INNER JOIN cards_subtypes ON cards.id = cards_subtypes.card_id
     INNER JOIN subtypes ON cards_subtypes.subtype_id = subtypes.id
WHERE cards.id = 5;