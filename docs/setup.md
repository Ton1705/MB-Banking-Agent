# Tài liệu Dự án MB Banking Agent

## 📂 Cấu trúc Thư mục

```
docs/
├── setup.md              ← Hướng dẫn cài đặt môi trường (file này)
├── api/
│   └── README.md         ← Tài liệu API (Swagger/OpenAPI)
├── architecture/
│   └── README.md         ← Kiến trúc hệ thống
└── database/
    └── README.md         ← Schema database
```

## 🛠 Môi trường đã cài đặt

| Tool | Version | Path |
|------|---------|------|
| Git | 2.55.0 | (hệ thống) |
| Node.js LTS | 24.18.0 | C:\Program Files\nodejs |
| npm | 11.16.0 | (đi kèm Node.js) |
| Java JDK 21 | 21.0.11 (Microsoft) | C:\Program Files\Microsoft\jdk-21.0.11.10-hotspot |
| Maven | 3.9.9 | C:\Users\kn\tools\maven\apache-maven-3.9.9 |
| PostgreSQL | 16.14 | C:\Program Files\PostgreSQL\16 |
| VS Code | (có sẵn) | — |

## 🔧 Biến Môi trường (User scope)

```
JAVA_HOME = C:\Program Files\Microsoft\jdk-21.0.11.10-hotspot
PATH += C:\Users\kn\tools\maven\apache-maven-3.9.9\bin
PATH += C:\Program Files\nodejs
PATH += C:\Program Files\PostgreSQL\16\bin
```

## 🗄 Database

```
Host: localhost
Port: 5432
Database: mb_banking
Username: postgres
Password: khanhngoc2012 (KHÔNG commit lên Git!)
```

## ▶️ Chạy Project

### Frontend (port 5173)
```bash
cd frontend
npm run dev
```

### Backend (port 8080)
```bash
cd backend
mvn spring-boot:run
```

## 🔗 Useful URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api
- Actuator Health: http://localhost:8080/actuator/health
- Swagger UI: http://localhost:8080/swagger-ui.html (sau khi thêm springdoc)

## 📌 VS Code Extensions đã cài

- ESLint, Prettier, Tailwind CSS IntelliSense
- Extension Pack for Java, Spring Boot Extension Pack
- SQLTools + PostgreSQL Driver
- GitLens, REST Client, Thunder Client
- Error Lens, Auto Rename Tag
- Material Icon Theme, Path IntelliSense
