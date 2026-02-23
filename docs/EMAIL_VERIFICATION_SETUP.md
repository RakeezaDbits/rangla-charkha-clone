# Email verification link – apne domain par

Taake "Verify Email" button par click karne par link **aapke app** par open ho (na ke Lovable/Supabase ke default domain par), ye steps follow karein.

## 1. App mein route (ho chuka hai)

App mein `/auth/confirm` route add hai. Ye page URL se `token_hash` leta hai aur Supabase se email verify karta hai, phir user ko home par redirect karta hai.

## 2. Supabase Dashboard

Agar aap **Supabase Auth** use kar rahe hain (project mein Supabase client hai):

### Site URL

1. **Supabase Dashboard** → **Authentication** → **URL Configuration**
2. **Site URL** mein apna app URL daalein, jaise:
   - Production: `https://yourdomain.com`
   - Local: `http://localhost:5173`
3. **Redirect URLs** mein bhi wahi URL add karein (e.g. `https://yourdomain.com/**`).

### Email template – Confirm signup

1. **Authentication** → **Email Templates** → **Confirm signup**
2. "Confirm signup" / "Verify Email" wale button/link ka **href** change karein.

**Default** (Supabase ka link):

```html
<a href="{{ .ConfirmationURL }}">Verify Email</a>
```

**Apna link** (aapke domain par):

```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Verify Email</a>
```

3. Template save karein.

Ab verification email mein jo link aayegi, woh aapke **Site URL** + `/auth/confirm?...` hogi, matlab hover karne par bhi aapka hi URL dikhega.

## 3. Lovable se email aa raha ho

Agar email **Lovable** se aa raha hai (sender `@lovable-app.email`), to:

- Link/redirect **Lovable project settings** ya **Auth / Email** section mein change hota hai.
- Wahan apna production URL set karein aur jahan “Confirmation URL” / “Redirect URL” diya ho, wahan apna domain use karein (e.g. `https://yourdomain.com/auth/confirm`).
- Agar option ho “Custom redirect URL” ya “Confirmation path”, to path `/auth/confirm` set karein.

## 4. Env (optional)

Agar aap chahein ki signup ke waqt redirect URL fixed ho (e.g. production):

- Root `.env` mein: `VITE_APP_URL=https://yourdomain.com`
- `Auth.tsx` mein `emailRedirectTo` ko isi se set kar sakte hain:  
  `emailRedirectTo: import.meta.env.VITE_APP_URL || window.location.origin`

Ab verification link email mein aapke domain par hi jayegi.
