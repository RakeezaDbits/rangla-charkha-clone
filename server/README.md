# Rangla Charkha – Backend (MySQL + Express)

## Setup

1. **MySQL**: Create a database (e.g. `rangla_charkha`).

   ```bash
   mysql -u root -p -e "CREATE DATABASE rangla_charkha;"
   ```

2. **Env**: Copy `.env.example` to `.env` and set:

   - `PORT` – server port (default 5000)
   - `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`
   - `SUPABASE_JWT_SECRET` – from Supabase: Project Settings → API → JWT Secret (used to verify login tokens)
   - `ADMIN_USER_IDS` – comma-separated Supabase user UUIDs who should be admin (e.g. your user id after first login)

3. **Install and run**:

   ```bash
   cd server && npm install && npm run dev
   ```

4. **Frontend**: In project root `.env` add:

   ```
   VITE_API_URL=http://localhost:5000
   ```

Tables (users, products, orders, order_items, cart_items, wishlist_items) are created automatically on first run.

## APIs

- `GET/POST /api/products` – list, create (admin)
- `PUT/DELETE /api/products/:id` – update, delete (admin)
- `GET /api/orders` – list orders (user: own, admin: all)
- `POST /api/orders` – create order (body: total, shipping_*, items[])
- `PATCH /api/orders/:id` – update status / tracking_number (admin)
- `GET /api/orders/track?order_id=&phone=` – track order (no auth)
- `GET/POST/DELETE /api/cart`, `PATCH /api/cart/:id`, `DELETE /api/cart/clear`
- `GET /api/wishlist`, `POST /api/wishlist/toggle`, `DELETE /api/wishlist/:productId`
- `GET /api/me` – current user + role (requires auth token)

Auth: send `Authorization: Bearer <Supabase access_token>` for protected routes.
