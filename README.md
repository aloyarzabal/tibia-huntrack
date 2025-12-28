# 🐉 Tibia Huntrack

Tibia Huntrack is a full-stack application for **Tibia** players that allows tracking hunting sessions, analyzing loot, monsters, and received damage, as well as browsing past sessions with different levels of detail.

## 🚀 Main Features

### ✅ Session Management

- Create hunting sessions with:
  - killed monsters
  - looted items
  - received damage (optional)
  - party members (optional)
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

<!-- ## 📌 Project Status

🚧 Actively under development
Planned improvements:

- external data caching
- sessions pagination
- aggregated metrics
- frontend UI and data visualization

--- -->

## 👤 Author

Developed by **Aloyarzabal**  
Frontend Developer → Backend / Full-Stack in progress

GitHub: https://github.com/aloyarzabal
