# AI Career Guidance & Next-Gen Mentorship Platform

An enterprise-grade AI-powered career navigation, resume intelligence, and personalized mentorship platform built with **Next.js 14**, **Firebase Authentication**, **Supabase PostgreSQL & Storage**, and **Google Gemini 2.5 Flash**.

---

## 🌟 Key Features

* **AI Career Mentorship Chatbot:** Real-time conversational guidance powered by Gemini 2.5 Flash with Server-Sent Events (SSE) streaming and contextual student profile injection.
* **Interactive Mermaid Flowcharts:** Dynamic SVG architecture and workflow rendering with client-side zoom, pan controls, and in-memory caching to eliminate re-render flicker.
* **Universal Document Intelligence:** Seamless document ingestion (PDF, DOCX, TXT) normalized into structured Markdown with real-time Gemini token savings analytics (60–85% token reduction).
* **Automated CV Entity Extraction:** Parses personal info, education, skills, work experience, certifications, and achievements directly into verified student records.
* **Multi-Factor Career Recommendations:** Algorithmic role matching comparing skills, target domains, and market demands to provide stage-by-stage learning milestones.
* **Gamified Roadmap & Milestone Tracking:** Interactive skill tree canvas with visual energy connections, node mastery status, and automatic achievement unlocking.
* **Dual-Cloud Enterprise Security:** Firebase Auth identity management coupled with Supabase PostgreSQL Row-Level Security (RLS) enforcing strict user isolation across all tables and private storage buckets.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Three.js
* **Backend:** Next.js Serverless API Routes (`force-dynamic`), Server-Sent Events (SSE)
* **AI & LLM:** Google Gemini 2.5 Flash (`@google/genai`)
* **Authentication:** Firebase Auth (Client SDK & Firebase Admin SDK)
* **Database & Storage:** Supabase PostgreSQL with RLS, Supabase Private Storage
* **Document Processing:** `pdf-parse`, `mammoth`, `xlsx`, `jszip`
* **Markdown & Diagrams:** `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex`, `mermaid`

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18.x or 20.x
* npm / pnpm / yarn
* Firebase Project
* Supabase Project
* Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hardhiksai05/AI-Career-Guidance.git
   cd AI-Career-Guidance
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the `.env.example` template to `.env.local` and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```

4. **Apply Supabase Migrations:**
   Run the SQL scripts in `supabase/migrations/` sequentially in your Supabase SQL Editor, or run `all_migrations.sql`.

5. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License

This project is proprietary and confidential.
