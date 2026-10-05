# To-do

## Cart: build selector (planned, not started)

Blocked by: finishing the product (concept) reshape.

Products in react-shop are items that describe skills. Instead of a traditional e-commerce cart with prices, the cart tab becomes a game-like **build selector**.

- A **build** is a named set of products. Builds can share products (overlaps are expected).
- Each build shows:
  - a title
  - a description
  - its composition: the list of products that make it up
- Replaces the current cart, including the `$--` price placeholders and the item count.
