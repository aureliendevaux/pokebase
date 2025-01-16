DELETE FROM supertypes WHERE id = 1;
DELETE FROM rarities WHERE name = 'Common';
DELETE FROM rarities WHERE name ILIKE 'R%' RETURNING id;