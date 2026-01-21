# master2-cafe

## lancement des factories :
```zsh
php artisan db:seed --class=ProductSeeder
php artisan db:seed --class=TablesSeeder
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=OrderSeeder
```

## Liste des commandes d'Api
## Product
### Lister tous les produits
**Method:** `GET`  
**URL:** `http://localhost:8000/api/v1/products`

### Filtrer par catégorie
**Method:** `GET`  
**URL:** `http://localhost:8000/api/v1/products?category=cappuccino`

### Afficher un produit
**Method:** `GET`  
**URL:** `http://localhost:8000/api/v1/products/1`

### Mettre à jour un produit
**Method:** `PUT`  
**URL:** `http://localhost:8000/api/v1/products/1`  
**Headers:**
Content-Type: application/json
Accept: application/json
Body (raw - JSON):
{
  "name": "Cappuccino Premium",
  "description": "Notre meilleur cappuccino",
  "price": 5.00,
  "category_id": 1,
  "variants": [
    {
      "id": 1,
      "name": "Small",
      "price": 4.00
    },
    {
      "id": 2,
      "name": "Medium",
      "price": 5.00
    },
    {
      "id": 3,
      "name": "Large",
      "price": 6.00
    }
  ]
}

## Supprimer un produit
**Method:** DELETE
**URL:** `http://localhost:8000/api/v1/products/1`

## Lister toutes les catégories
**Method:** GET
**URL:** `http://localhost:8000/api/v1/categories`

## Produit sans variantes
**Method:** `POST`
**URL:** `http://localhost:8000/api/v1/products`  
Body (raw - JSON):
{
  "name": "Croissant",
  "description": "Croissant au beurre frais",
  "price": 2.50,
  "category_id": 5
}

## Produit avec image (Form-data)
**Method:** `POST`  
**URL:** `http://localhost:8000/api/v1/products`  
**Headers:**
Accept: application/json
Body (form-data):
```
name: Cappuccino Classic
description: Notre cappuccino signature
price: 4.50
category_id: 1
image: [Sélectionner un fichier image]
variants[0][name]: Small
variants[0][price]: 3.50
variants[1][name]: Medium
variants[1][price]: 4.50
variants[2][name]: Large
variants[2][price]: 5.50
```

## Tables
### Lister toutes les tables
**Method:** `GET`  
**URL:** `http://localhost:8000/api/v1/tables`  

### Afficher une table
**Method:** `GET`  
**URL:** `http://localhost:8000/api/v1/tables/1`  

### Créer une table
**Method:** `POST`  
**URL:** `http://localhost:8000/api/v1/tables`  
**Headers:**
Content-Type: application/json
Accept: application/json
Body (raw - JSON):
{
  "name": "Table 8"
}

### Mettre à jour une table
**Method:** `PUT`  
**URL:** `http://localhost:8000/api/v1/tables/1`  
**Headers:**
Content-Type: application/json
Accept: application/json
Body (raw - JSON):
{
  "name": "Table 1 - Mise à jour"
}

### DELETE - Supprimer une table
**Method:** `DELETE`
**URL:** `http://localhost:8000/api/v1/tables/1`
