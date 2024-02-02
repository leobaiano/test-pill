# API

**Base URL por ambiente**

Local: http://localhost:7000

## Rotas

**/product**

Retorna dados de um produto.

**Metódo:** GET 
**Endpoint:** /product
**Parâmetros:**
`url`: string

### Retornos

#### Em caso de sucesso

Status Code: 200

```
{
	"data": {
		"name": "Naldecon Pack Dia e Noite 6 comprimidos",
		"barcode": "7896016807206",
		"brand": "Naldecon",
		"image": "https://product-data.raiadrogasil.io/images/3716717.webp",
		"price": "17.85"
	}
}
```

#### Caso não encontre o produto
Status Code 404:

```
{
	"message": "Error processing the request",
	"error": {
		"message": "Produto não encontrado.",
		"status": 404
	}
}
```

#### Em caso de erro

**URL não informada**
Status Code: 422

```
{
	"error": {
		"message": "É preciso informar a URL."
	}
}
```

**URL não permitida**
Status Code: 422

```
{
	"error": {
		"message": "Não é permitido consultar informações no dominio informado."
	}
}
```