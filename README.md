# Gallery Docker Project

פרויקט גלריה מלא עם Rust backend, React frontend, ו-Docker containers.

#test

## מבנה הפרויקט

- **gallery_server_rust-main/** - שרת Rust עם API
- **gallery_app_react-main/** - אפליקציית React
- **sqlite-db/** - מסד נתונים SQLite
- **nginx/** - Load balancer/Reverse proxy

## הרצת הפרויקט מקומית

### אפשרות 1: ללא Docker (מהיר לפיתוח)

```powershell
# טרמינל 1 — Backend
cd gallery_server_rust-main
$env:DATABASE_URL="sqlite:./mydb.db"
$env:PORT="3007"
.\target\release\app.exe

# טרמינל 2 — Frontend
cd gallery_app_react-main
$env:REACT_APP_API_BASE_URL="http://localhost:3007"
npm start
```

או הרצה אוטומטית:

```powershell
.\run_local.ps1
```

- Frontend: http://localhost:3000
- API ישיר: http://localhost:3007

> **הערה:** load balancing (Nginx + 2 backends) דורש Docker — ראה אפשרות 2.

### אפשרות 2: עם Docker (כולל load balancing)

```bash
# ודא ש-Docker Desktop פועל
docker compose up -d --build
```

- Frontend: http://localhost:3000
- API: http://localhost:8080 (דרך nginx, load balancing)
- Direct API: http://localhost:3007 או http://localhost:3008

## Rate Limiting (Nginx)

כשהפרויקט רץ עם Docker, Nginx מגביל את כמות הבקשות ל-API לפי כתובת IP — כדי למנוע spam, brute force, ושימוש יתר ב-AI.

ההגדרות נמצאות ב-`nginx/nginx.conf`.

| נתיב | Limit | Burst | מטרה |
|------|-------|-------|------|
| API כללי (`/artworks/`, `/customers/`, וכו') | 30 req/דקה | 10 | הגנה כללית |
| `/api/ai/` | 5 req/דקה | 2 | הגנה על קריאות Hugging Face |
| `/customers/login` | 10 req/דקה | 3 | הגנה מ-brute force |

**מה לא מוגבל:**
- בקשות CORS preflight (`OPTIONS`) — לא נספרות
- `/health` — health check
- `/generated-images/` — קבצים סטטיים
- Frontend (`/`) — דפי React

**תגובה בחריגה:** `429 Too Many Requests`

> **הערה:** בפיתוח מקומי ללא Docker (אפשרות 1), הבקשות עוברות ישירות ל-Rust על `:3007` — ללא rate limiting. ה-CI/CD גם רץ ישירות על `:3007` ולכן לא מושפע.

### בדיקה

```powershell
# 6 בקשות AI מהירות — השישית אמורה להחזיר 429
for ($i=1; $i -le 6; $i++) {
  curl -s -o NUL -w "Request $i : %{http_code}`n" `
    -X POST http://localhost:8080/api/ai/generate `
    -H "Content-Type: application/json" `
    -d '{"prompt":"test"}'
}
```

## CI/CD עם GitHub Actions

הפרויקט כולל GitHub Actions workflow שבודק את הקוד ודוחף תמונות ל-Docker Hub.

### הגדרת Secrets ב-GitHub

כדי שה-CI/CD יעבוד, יש להגדיר את ה-Secrets הבאים ב-GitHub repository:

1. **DOCKER_HUB_USERNAME** - שם המשתמש שלך ב-Docker Hub
2. **DOCKER_HUB_TOKEN** - Access Token מ-Docker Hub

#### איך ליצור Access Token ב-Docker Hub:

1. היכנס ל-[Docker Hub](https://hub.docker.com/)
2. לחץ על Account Settings → Security
3. לחץ על "New Access Token"
4. תן שם ל-token (למשל: "github-actions")
5. העתק את ה-token

#### איך להגדיר Secrets ב-GitHub:

1. היכנס ל-repository ב-GitHub
2. לחץ על Settings → Secrets and variables → Actions
3. לחץ על "New repository secret"
4. הוסף את שני ה-secrets:
   - `DOCKER_HUB_USERNAME`: שם המשתמש שלך
   - `DOCKER_HUB_TOKEN`: ה-token שהעתקת

### איך עובד ה-CI/CD:

1. **בכל push ל-main/master**: מריץ טסטים
2. **טסטים**: בודק חיבור למסד נתונים דרך API
3. **אם טסטים עוברים**: דוחף תמונות ל-Docker Hub
4. **אם טסטים נכשלים**: עוצר את התהליך

### התמונות שיידחפו ל-Docker Hub:

- `{username}/gallery-db:latest`
- `{username}/gallery-rust-app:latest`
- `{username}/gallery-nginx:latest`
- `{username}/gallery-frontend:latest`

## API Endpoints

- `GET /customers` - קבלת כל הלקוחות
- `GET /customers/jerusalem` - לקוחות בירושלים
- `POST /customers` - יצירת לקוח חדש
- `POST /customers/login` - התחברות לקוח
- ועוד endpoints לאמנים, יצירות אמנות והזמנות...

## טכנולוגיות

- **Backend**: Rust + Actix Web
- **Frontend**: React
- **Database**: SQLite
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Load Balancing**: Nginx
- **Rate Limiting**: Nginx (`limit_req`)
