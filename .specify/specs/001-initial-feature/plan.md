# Implementation Plan - YouTube Professional Learning Pack Generator

## Tech Stack
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, shadcn-ui (Components), Lucide React (Icons).
- **Backend**: Supabase (Database & Auth), Edge Functions (optional for generation logic).
- **State Management**: React Query (TanStack Query) or Zustand.
- **Routing**: React Router DOM.

## Architecture
- **SPA**: Single Page Application deployed on Vercel.
- **Database**: Supabase PostgreSQL to store generated packs (optional history feature).
- **API**: Next.js API Routes or Supabase Functions to handle "generation" (simulated or LLM integration).

## Component Structure
- `Layout`: Main container with Header.
- `GeneratorForm`: Input URL, Select Identity/Field.
- `ResultViewer`: Tabs component (radix-ui/shadcn).
  - `TabGuide`: Overview.
  - `TabVocab`: Vocabulary cards.
  - `TabCloze`: Interactive fill-in-the-blanks.
  - `TabShadowing`: Sentence list with timestamps.
  - `TabQuiz`: Quiz interface.

## Data Model (Supabase)
- `users`: (Standard Supabase Auth)
- `learning_packs`:
  - `id`: uuid
  - `user_id`: uuid (fk)
  - `video_url`: text
  - `video_title`: text
  - `content_json`: jsonb (stores the full generated pack)
  - `created_at`: timestamp

## Implementation Steps
1. **Setup**: Initialize Vite + React + TS + Tailwind + shadcn-ui.
2. **Supabase**: Connect to Supabase project.
3. **UI**: Build Form and Result Tabs using shadcn-ui components.
4. **Logic**: Implement `generatePack` function (mock for now, strictly typed).
5. **Export**: Implement Markdown download.
