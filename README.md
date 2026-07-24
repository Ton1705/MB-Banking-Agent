# MB Banking Agent

> 🏦 Ứng dụng Banking Agent thông minh — React + Spring Boot + PostgreSQL

## 🗂 Cấu trúc Project

```
MB-Banking-Agent/
├── frontend/          # React 19 + Vite + TypeScript + TailwindCSS v4 + Shadcn UI
├── backend/           # Spring Boot 3 + Java 21 + Maven
├── docs/              # Tài liệu dự án
└── .vscode/           # VS Code workspace settings
```

## 🛠 Tech Stack

### Frontend
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| React | 19 | UI Framework |
| TypeScript | ~5.8 | Type Safety |
| Vite | ~6.3 | Build Tool |
| TailwindCSS | v4 | Styling |
| Shadcn UI | latest | Component Library |

### Backend
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| Spring Boot | 3.x | Backend Framework |
| Java | 21 (LTS) | Runtime |
| Maven | 3.9.9 | Build Tool |
| Spring Security | included | Authentication |
| Spring Data JPA | included | ORM |

### Database
| Công nghệ | Phiên bản | Mục đích |
|-----------|-----------|----------|
| PostgreSQL | 16.14 | Primary Database |

## 🚀 Khởi chạy Development

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Backend
```bash
cd backend
mvn spring-boot:run
# → http://localhost:8080
```

### Database
```
Host: localhost
Port: 5432
Database: mb_banking
Username: postgres
Password: khanhngoc2012
```

## 📁 Frontend Structure
```
frontend/src/
├── components/        # Reusable UI components
│   └── ui/            # Shadcn UI components
├── pages/             # Page components
├── hooks/             # Custom React hooks
├── lib/               # Utilities (axios, utils)
├── types/             # TypeScript type definitions
├── store/             # State management
└── assets/            # Static assets
```

## 📁 Backend Structure
```
backend/src/main/java/com/mbbanking/
├── controller/        # REST Controllers
├── service/           # Business Logic
├── repository/        # JPA Repositories
├── entity/            # JPA Entities
├── dto/               # Data Transfer Objects
├── config/            # Spring Configuration
└── exception/         # Exception Handling
```

## 🔧 Environment Variables

### Frontend (`.env.local`)
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=MB Banking Agent
```

### Backend (`application.properties`)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mb_banking
spring.datasource.username=postgres
spring.datasource.password=khanhngoc2012
spring.jpa.hibernate.ddl-auto=update
```

## 📚 Tài liệu thêm
Xem thư mục `docs/` để có tài liệu chi tiết hơn.