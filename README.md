# 🐉 Tibia Huntrack

Tibia Huntrack is a full-stack application for **Tibia** players that allows tracking hunting sessions, analyzing loot, monsters, and received damage, as well as browsing past sessions with different levels of detail.

The project is designed with a **scalable and professional architecture**, clearly separating:

- persistence
- business logic
- data enrichment
- external data consumption (Tibia Fandom / Wikia)

---

## 🚀 Main Features

### ✅ Session Management

- Create hunting sessions with:
  - killed monsters
  - looted items
  - received damage (optional)
- Browse previous sessions
- View full details of a specific session

### 🧠 Automatic Data Enrichment

From minimal input data (`{ name, count }`), the backend:

- Checks the database
- If data does not exist:
  - fetches it from Tibia Fandom (MediaWiki API)
  - parses raw wikitext
  - normalizes and structures the data
- Returns enriched information such as:
  - NPC value
  - imbuements
  - outfits
  - monster statistics
  - elemental weaknesses

### ⚡ Layered Architecture

- **Controllers** → HTTP handling & validation
- **Services** → business logic
- **DB / Queries** → persistence layer
- **Parsers / Fetchers** → controlled scraping & external data

---

## 🏗️ General Architecture

src/
├── controllers/
├── services/
│ ├── sessions/
│ ├── items/
│ └── monsters/
├── db/
│ ├── schema/
│ └── queries/
├── utils/
└── server/

### Session Creation Flow

Frontend
→ POST /sessions/preview
→ enrichItems / enrichMonsters
→ summary (not persisted)

Frontend
→ POST /sessions
→ persist session
→ enrich data
→ return full session details

---

## 🧩 Session Data Types

| Type           | Purpose                         |
| -------------- | ------------------------------- |
| SessionSummary | Sessions list view              |
| SessionDetail  | Detailed session view / summary |
| Raw Session    | Database persistence            |

---

## 🛠️ Tech Stack

### Backend

- Node.js
- TypeScript
- Express
- Drizzle ORM
- PostgreSQL
- MediaWiki API (Tibia Fandom)

### Frontend (in progress)

- React
- TypeScript

---

## 🧪 Error Handling

- External fetch timeouts
- Graceful fallbacks when Tibia Fandom data is missing
- Typed errors using `AppError`
- Partial enrichment without blocking session creation

---

## 🔒 Security & Data Control

- Clear separation between preview and persistence
- No data is stored unless the user confirms
- Enrichment never blocks session creation

---

## 📌 Project Status

🚧 Actively under development  
Planned improvements:

- external data caching
- sessions pagination
- aggregated metrics
- frontend UI and data visualization

---

## 👤 Author

Developed by **Aloy Arzabal**  
Frontend Developer → Backend / Full-Stack in progress

GitHub: https://github.com/aloyarzabal
