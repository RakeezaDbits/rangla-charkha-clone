# Admin Panel – Kaise access karein

## 1. Pehle login karein

1. Site kholen (e.g. `http://localhost:5173`).
2. **Sign Up** se naya account banaen (ya pehle se account ho to **Sign In**).
3. Login hone ke baad URL bar mein apna **User ID** dekhna mushkil hota hai, isliye next step ke liye backend use karenge.

## 2. Apna user ID nikalein (admin ke liye)

**Option A – Browser / Supabase se**

- Supabase Dashboard → **Authentication** → **Users** → apna email dhoonden → **UUID** copy karein.

**Option B – Backend log se (agar pehli baar login kiya)**

- Server (MySQL backend) run karte waqt koi bhi API call karein (e.g. Cart open karein).  
- Backend logs mein `userId` ya `user_id` aata hai – wahi UUID copy karein.

**Option C – Database se**

- MySQL mein: `SELECT id, email FROM users;`  
- Jis email pe login ho, us row ka `id` (UUID) copy karein.

## 3. Server ko bataein ye user admin hai

1. `server/.env` file kholen.
2. **ADMIN_USER_IDS** mein apna UUID daalein (ek se zyada admin ho to comma-separated):
   ```env
   ADMIN_USER_IDS=your-uuid-here
   ```
3. Server restart karein:
   ```bash
   cd server
   npm run dev
   ```

## 4. Admin panel kholen (hidden – site par link nahi hota)

1. Browser mein **login** karein (wo user jo admin hai).
2. Address bar mein **ye URL direct type karein** (site par kahi dikhaya nahi jata):
   ```
   http://localhost:5173/manage
   ```
   (Production pe apna domain use karein, path **`/manage`** same rahega.)

Sirf admin user login hone par **Admin Panel** khulega; baaki users ko access nahi milega. Wahan se:

- **Products** – add / edit / delete, image change (upload ya URL).
- **Orders** – saari orders, status update, tracking number daalna.

## 5. Naye products ki images (reference style)

- Admin panel → **Products** → product select karein → **Product Image** mein nayi image upload karein ya image URL daalein.
- Jo images abhi generate ki gayi hain (black casual shirt, beige trousers, coral top) woh `public/products/` mein hain; site ke base URL ke saath path use karein, jaise:  
  `http://localhost:5173/products/black-casual-shirt.png`  
  (Production pe apna domain use karein.)

Agar koi step clear na ho to bataen, usi hisaab se steps aur short kar sakte hain.
