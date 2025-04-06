# 📎 Clips

A personal web clipping management system that integrates with Notion and leverages AI for smart content organization.

## Overview

Clips is a personal tool that enhances your web clipping workflow by automatically processing and organizing content saved to Notion. When you save a new clip to your designated Notion database, this service:

1. Receives the webhook notification from Notion
2. Processes the clipped content
3. Uses LLM to generate a concise summary
4. Automatically labels and categorizes the content
5. Updates the Notion entry with enhanced metadata

## Features

- 🔗 Seamless Notion integration via webhooks
- 🤖 AI-powered content summarization
- 🏷️ Automatic content labeling and categorization
- 📱 Personal web interface for viewing clips
- 🔄 Real-time processing of new clips
- 🔁 Manual sync capability for existing Notion clips

## Tech Stack

- [Remix](https://remix.run) - React Router v7 Framework mode
- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [TailwindCSS](https://tailwindcss.com) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com) - Re-usable components
- [Turso](https://turso.tech) - SQLite database
- [Drizzle ORM](https://orm.drizzle.team) - Type-safe ORM
- [OpenAI API](https://platform.openai.com) + [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Zod](https://zod.dev) - Schema validation
- [Notion API](https://developers.notion.com) - Database integration
- [Fly.io](https://fly.io) - Hosting solution

## Setup

### 1. Database Setup

1. Install the Turso CLI:
   ```bash
   curl -sSfL https://get.turso.tech/install.sh | bash
   ```
2. Create a new Turso database:
   ```bash
   turso db create clips
   ```
3. Get your database URL and auth token:
   ```bash
   turso db show clips
   turso db tokens create clips
   ```

### 2. Notion Setup

1. Install the [Notion Web Clipper](https://www.notion.so/web-clipper) browser extension
2. Create a new database in Notion for your clips
3. Create a new integration at [Notion Developers](https://www.notion.so/my-integrations):
   - Give it a name (e.g., "Clips Integration")
   - Copy the Integration Token (you'll need this later)
4. Share your clips database with the integration
5. Configure webhook endpoints

### 3. Environment Setup

1. Clone this repository
2. Copy the example environment file
3. Fill in your environment variables

### 4. Application Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Automatic Processing

New clips are automatically processed when saved to your Notion database through the webhook integration.

### Manual Sync

To process existing clips in your Notion database:

1. Access the sync feature through the web interface
2. Click the sync button to start processing existing clips
3. The system will fetch, summarize, and label all existing clips in your database

## Personal Use Notice

This project is designed for personal use and is specifically tailored to work with a custom Notion database setup. While you're welcome to use it as inspiration, it may require modifications to work with your specific needs.

## License

MIT License - Feel free to use this code as inspiration for your own clipping system.
