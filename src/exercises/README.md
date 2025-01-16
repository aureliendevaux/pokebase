# Challenges

## Créer une table `addresses`

- id
- address_line1
- address_line2 (nullable)
- address_line3 (nullable)
- postal_code
- city
- country
- created_at
- updated_at

Unicité sur le combo `address_line1`, `postal_code` et `country`

## Insérer des lignes dans `addresses`

- 1 requête avec 1 adresse
- 1 requête avec 3 adresses

## Mettre à jour une ligne de la table `illustrators`

## Supprimer une ligne des tables `supertypes` et `rarities`