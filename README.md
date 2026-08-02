# ✨ عهود - Ohod 🤖
## منصة ذكاء اصطناعي متكاملة

مرحباً! أنا **عهود (Ohod)** - مساعدك الذكي الشخصي 👋

Ohod هي منصة ذكاء اصطناعي حديثة وموثوقة توفر واجهة مستخدم تفاعلية وخلفية قوية لإدارة الطلبات والاتصال الآمن مع نماذج الذكاء الاصطناعي.

---

## ✨ المميزات الرئيسية

✅ **واجهة مستخدم حديثة وسلسة**
- تصميم جميل يشبه Gemini
- نمط ليلي ونهاري
- رسائل فورية مع تأثيرات
- واجهة عربية كاملة 🇸🇦

✅ **مصادقة آمنة وموثوقة**
- تسجيل وتسجيل دخول آمن
- JWT tokens
- تشفير bcrypt

✅ **محادثات ذكية مع AI**
- تكامل مع OpenAI GPT-4
- استجابات فورية
- سجل محادثات

✅ **أمان عالي**
- CORS محسّنة
- Rate Limiting
- Helmet Security Headers

---

## 🚀 البدء السريع

### المتطلبات:
- Node.js 18+
- مفتاح OpenAI API

### التثبيت:

```bash
# 1. استنساخ
git clone https://github.com/xil2g4/rafiq-alkibar.git
cd rafiq-alkibar

# 2. الفرع
git checkout ohod-ai-integration

# 3. الإعدادات
cp .env.example .env

# 4. أضف مفتاح API
# عدّل .env وأضف: AI_API_KEY=your_key

# 5. التثبيت والتشغيل
npm install
cd client && npm install && cd ..
npm run dev
```

**الآن:** http://localhost:3000

---

## 🌐 الوصول

| الموارد | الرابط |
|--------|--------|
| 🎨 الواجهة | http://localhost:3000 |
| 🔌 API | http://localhost:5000 |
| ✅ الحالة | http://localhost:5000/health |

---

## 🐳 النشر مع Docker

```bash
# بناء
docker build -t ohod-ai:latest .

# تشغيل
docker run -p 3000:3000 -p 5000:5000 \
  -e AI_API_KEY=your_key \
  -e JWT_SECRET=your_secret \
  ohod-ai:latest

# أو Compose
docker-compose up -d
```

---

## 🌍 النشر على الإنترنت

### Railway.app ⭐ (الأفضل)

1. اذهب https://railway.app
2. "Create New Project"
3. "Deploy from GitHub"
4. اختر: xil2g4/rafiq-alkibar
5. الفرع: ohod-ai-integration
6. أضف المتغيرات:
   - AI_API_KEY
   - JWT_SECRET
7. Deploy! 🚀

### Heroku

```bash
heroku login
heroku create your-app-name
heroku config:set AI_API_KEY=your_key
git push heroku ohod-ai-integration:main
```

---

## 📊 الهيكل

```
rafiq-alkibar/
├── server/              # 🖥️ Node.js + Express
│   ├── routes/
│   ├── middleware/
│   └── index.js
├── client/              # 🎨 React + Vite
│   ├── src/
│   │   ├── pages/
│   │   └── store/
│   └── index.html
├── Dockerfile
├── docker-compose.yml
└── package.json
```

---

## 🔌 API الرئيسية

### التسجيل
```bash
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "123456",
  "name": "اسمك"
}
```

### الدخول
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "123456"
}
```

### رسالة
```bash
POST /api/chat/message
Authorization: Bearer <token>
{
  "message": "مرحباً"
}
```

---

## 🔐 الأمان

✅ Helmet.js
✅ CORS
✅ Rate Limiting
✅ JWT
✅ bcrypt
✅ Input Validation

---

## 📝 المتغيرات البيئية

```env
PORT=5000
NODE_ENV=development
AI_API_KEY=your_openai_key
JWT_SECRET=your_secret
AI_MODEL=gpt-4
```

---

## 💡 أمثلة

### cURL
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","name":"أنت"}'
```

### JavaScript
```javascript
const response = await fetch('/api/chat/message', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ message: 'مرحباً' })
})
```

---

## 🎯 الميزات المستقبلية

- [ ] دعم الصور
- [ ] الوصول الصوتي
- [ ] مشاركة المحادثات
- [ ] لوحة تحكم إدارية
- [ ] تحليلات متقدمة
- [ ] نماذج AI متعددة

---

## 🤝 المساهمة

```bash
git checkout -b feature/MyFeature
git commit -m 'Add MyFeature'
git push origin feature/MyFeature
# Open Pull Request
```

---

## 📄 الترخيص

MIT License

---

## 📞 التواصل

- 📧 Email: support@ohod.ai
- 🐙 GitHub: https://github.com/xil2g4/rafiq-alkibar/issues

---

**صُنعت بـ ❤️ من قبل عهود**

⭐ إذا أعجبك المشروع، أعطه نجمة!