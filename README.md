# Ohod - منصة ذكاء اصطناعي متكاملة

## مرحباً! 👋

Ohod هي منصة ذكاء اصطناعي متطورة تشبه Gemini، توفر:

✅ واجهة مستخدم حديثة وتفاعلية
✅ مصادقة آمنة (JWT + bcrypt)
✅ تكامل مع OpenAI GPT-4
✅ نمط ليل ونهار
✅ جاهزة للنشر مع Docker

## 🚀 البدء السريع

```bash
git clone https://github.com/xil2g4/rafiq-alkibar.git
cd rafiq-alkibar
cp .env.example .env

# أضف مفتاح API الخاص بك
npm install && npm run dev
```

## 📦 الهيكل

```
ohod/
├── server/          # Node.js Express
├── client/          # React + Vite
├── Dockerfile
└── docker-compose.yml
```

## 🔐 الأمان

- JWT Authentication
- bcrypt Password Hashing
- CORS Protection
- Rate Limiting
- Helmet Security Headers

## 📖 المزيد

انظر DEPLOYMENT.md للتفاصيل الكاملة