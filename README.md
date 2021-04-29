## README MERHACKONA

|**Method**|**Endpoints for base.routes** | **Description**                                    |
| -------- | ---------------------------- | -------------------------------------------------- |
| Get      | /create-product              | Admin can create a new product                     |
| Post     | /create-product              | Save new product on DB                             |
| Get      | /admin-products-list         | Show products in stock                             |
| Get      | /edit-product/:productId     | Edit a product                                     |
| Post     | /edit-product/:productId     | Save edition on DB                                 |
| Post     | /delete-product/:productId   | Delete a product from DB                           |
| Get      | /create-store                | Admin can create a new store                       |
| Post     | /create-store                | Save new store on DB                               |
| Get      | /stores-list                 | Show stores                                        |
| Get      | /edit-store/:storeId         | Edit a store                                       |
| Post     | /edit-store/:storeId         | Save edition on DB                                 |
| Post     | /delete-store/:storeId       | Delete a store from DB                             |
| Get      | /admin-panel                 | Where admin can do everything before               |
|**Method**|**Endpoints for base.routes** | **Description**                                    |
| Get      | /profile                     | User profile page                                  |
| Get      | /edit-profile                | Edit user profile (individually)                   |
| Post     | /edit-profile                | Save edition on DB                                 |
| Post     | /delete-profile              | User can delete its own user profile               |
|**Method**|**Endpoints for base.routes** | **Description**                                    |
| Get      | /signup                      | Create a new user                                  |
| Post     | /signup                      | Save the new user on DB                            |
| Get      | /login                       | Login for user or admin                            |
| Post     | /login                       | Create the session on DB (cookie)                  |
| Get      | /logout                      | Destroy the session on DB (cookie)                 |
|**Method**|**Endpoints for base.routes** | **Description**                                    |
| Get      | /                            | Stores listed on map                               |
|**Method**|**Endpoints for base.routes** | **Description**                                    |
| Get      | /details/:productId          | Show details of one product                        |
|**Method**|**Endpoints for base.routes** | **Description**                                    |
| Get      | /                            | Show stores and populate the products for the cart |
| Post     | /add-product/:productId      | Add a product to cart                              |
| Post     | /delete/:productId           | Delete a product of the cart                       |
| Post     | /purchase                    | Process the purchase                               |
|**Method**|**Endpoints for base.routes** | **Description**                                    |
| Get      | /                            | Filter for the search input on index               |