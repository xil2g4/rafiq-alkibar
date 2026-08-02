# نشر تطبيق Ohod

## البدء السريع المحلي

```bash
git clone https://github.com/xil2g4/rafiq-alkibar.git
cd rafiq-alkibar
cp .env.example .env
# عدل .env وأضف مفتاح API الخاص بك
npm install
cd client && npm install && cd ..
npm run dev
```

## النشر مع Docker

```bash
# بناء الصورة
docker build -t ohod-ai:latest .

# تشغيل الكونتينر
docker run -p 3000:3000 -p 5000:5000 \
  -e AI_API_KEY=your_key \
  -e JWT_SECRET=your_secret \
  ohod-ai:latest

# أو استخدم Docker Compose
docker-compose up -d
```

## نقاط النهاية الرئيسية

- الواجهة: http://localhost:3000
- API: http://localhost:5000
- Health: http://localhost:5000/health

## API الأساسية

### التسجيل
```bash
POST /api/auth/register
{"email":"user@test.com", "password":"123456", "name":"Name"}
```

### تسجيل الدخول
```bash
POST /api/auth/login
{"email":"user@test.com", "password":"123456"}
```

### إرسال رسالة
```bash
POST /api/chat/message
Headers: Authorization: Bearer <token>
{"message":"Hello"}
```

## النشر على Railway

1. اذهب إلى railway.app
2. ربط حسابك على GitHub
3. اختر المستودع
4. أضف المتغيرات البيئية
5. سيتم النشر تلقائياً