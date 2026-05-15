# 🛒 WorldShop — Amazon for Africa

Built by Lovelead | Fresh Finish Cleaning LLC

## 🌍 What It Is
Full marketplace platform for Africa with:
- 16+ products from 10+ African countries
- AI shopping assistant powered by Claude
- Flutterwave payment integration
- Seller dashboard with AI product descriptions
- Order tracking system
- Wishlist & product comparison
- Business analytics dashboard

## 🚀 Deploy To Netlify

### Step 1 — Upload to GitHub
```bash
git init
git add .
git commit -m "WorldShop v1.0"
git remote add origin https://github.com/freshfinishcleaningllc-lgtm/worldshop
git push -u origin main
```

### Step 2 — Connect to Netlify
1. Go to netlify.com
2. Click "Add new site" → "Import from Git"
3. Select your GitHub repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Deploy"

### Step 3 — Add Environment Variables
In Netlify → Site Settings → Environment Variables:

```
ANTHROPIC_API_KEY = your_key_here
FLUTTERWAVE_SECRET_KEY = your_flutterwave_key_here
SITE_URL = https://worldshop-africa.netlify.app
```

## 💳 Connect Real Payments (Flutterwave)

1. Sign up at flutterwave.com
2. Complete KYC verification
3. Connect your bank account or mobile money
4. Get your Secret Key from Dashboard → API Keys
5. Add to Netlify environment variables

## 🤖 AI Shopping Assistant

Uses Claude Haiku via secure Netlify function.
API calls are hidden server-side — users never see your API key.

## 📱 Build Android APK

```bash
bubblewrap init --manifest https://your-site.netlify.app/manifest.webmanifest
bubblewrap build
```

## 💰 Revenue Model

Take 5-10% commission on every sale:
- Integrate Flutterwave Split Payments
- Auto-send seller their share minus commission

## 📞 Support

Email: freshfinishcleaningllc@gmail.com
Phone: (708) 689-7416
