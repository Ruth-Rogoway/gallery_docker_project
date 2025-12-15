# Gallery Docker Project

פרויקט גלריה מלא עם Rust backend, React frontend, ו-Docker containers.

#test

## מבנה הפרויקט

- **gallery_server_rust-main/** - שרת Rust עם API
- **gallery_app_react-main/** - אפליקציית React
- **sqlite-db/** - מסד נתונים SQLite
- **nginx/** - Load balancer/Reverse proxy

## הרצת הפרויקט מקומית

```bash
# התקנת כל השירותים
docker-compose up -d

# האפליקציה תהיה זמינה ב:
# Frontend: http://localhost:3000
# API: http://localhost:8080 (דרך nginx)
# Direct API: http://localhost:3007 או 3008
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
