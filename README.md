# master2-cafe

## Installation

### Prérequis

- **Node.js** 18+
- **npm**
- **Expo CLI** (installé automatiquement)
- **composer**

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/SwanYooshy/master2-cafe.git
cd master2-cafe-expo
```

2. **Installer les dépendances**
```bash
npm install
composer install
```

3. **Lancer l'application**
```bash
php artisan serve
```
et dans un autre terminal :
```
npm run build
```

## lancement des factories (fournir en données la base de données) :
```bash
php artisan db:seed --class=ProductSeeder
php artisan db:seed --class=TablesSeeder
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=OrderSeeder
```
**Sinon pour tout exécuter en une commande:** `php artisan db:seed`

## Liste des commandes d'Api
## Produits
### Lister tous les produits
**Method:** `GET`  
**URL:** `http://localhost:8000/api/v1/products`

### Chercher un produit (catégorie et texte)
**Method:** `GET`
**URL:** `http://localhost:8000/api/v1/products?search={texte}&category={categorie}`

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
```
{
  "name": "Cappuccino Premium",
  "description": "Notre meilleur cappuccino",
  "price": 5.00,
  "Stock": 50,
  "category_id": 1,
  "is_active": true,
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
```

### Supprimer un produit
**Method:** DELETE
**URL:** `http://localhost:8000/api/v1/products/1`

### Lister toutes les catégories de produits
**Method:** GET
**URL:** `http://localhost:8000/api/v1/categories`

### Produit sans variantes
**Method:** `POST`
**URL:** `http://localhost:8000/api/v1/products`  
Body (raw - JSON):
```
{
  "name": "Croissant",
  "description": "Croissant au beurre frais",
  "price": 2.50,
  "category_id": 5
}
```

### Produit avec image (Form-data)
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
### Lister toutes les tables de l'établissement
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
```
{
  "name": "Table 8"
}
```

### Mettre à jour une table
**Method:** `PUT`  
**URL:** `http://localhost:8000/api/v1/tables/1`  
**Headers:**  
Content-Type: application/json
Accept: application/json
Body (raw - JSON):
```
{
  "name": "Table 1 - Mise à jour"
}
```

### Supprimer une table
**Method:** `DELETE`  
**URL:** `http://localhost:8000/api/v1/tables/1`

### Modifier l'état d'une table  
**Method** `PATCH`  
**URL:** `http://localhost:8000/api/v1/tables/{id}/status`  
**Headers:**  
Content-Type: application/json
Accept: application/json
Body (raw - JSON):
```
{
  "status" : "libre"
}
```

## Orders (les commandes client)
### Lister toutes les commandes
**Method:** `GET`  
**URL:** `http://localhost:8000/api/v1/orders`  

### Afficher une commande
**Method:** `GET`  
**URL:** `http://localhost:8000/api/v1/orders/1`  

### Créer une commande
**Method:** `POST`  
**URL:** `http://localhost:8000/api/v1/orders`  
**Headers:**  
Content-Type: application/json  
Accept: application/json  
Body (raw - JSON):
```
{
  "table_id": 1,
  "products": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 3,
      "quantity": 1
    }
  ]
}
```

### Modifier une commande
**Method:** `PUT`  
**URL:** `http://localhost:8000/api/v1/orders/{id_order}`  
**Headers:** 
Content-Type: application/json  
Accept: application/json  
Body (raw - JSON):
```
{
  "status": "ready"
}
```

### Supprimer une commande
**Method:** `DELETE`  
**URL:** `http://localhost:8000/api/v1/orders/1`  
