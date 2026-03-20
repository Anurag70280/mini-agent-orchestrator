# 🤖 Mini-Agent Orchestrator

A lightweight, **TypeScript-based Task Orchestrator** that transforms natural language input into a series of automated actions — demonstrating how a real AI Agent pipeline works.

```
Input → Planning → Orchestration → Execution
```

---

## 🚀 How It Works

The system is built on three core layers:

### 1. 🧠 The Planner (`PlannerService`)
Parses raw natural language input (e.g., `"Cancel order #1234 and send an OTP"`) using **pattern matching and Regex** to extract intent. Outputs a structured **Execution Plan** — an ordered array of tasks.

### 2. 📋 The Orchestrator (`OrchestratorService`)
Receives the plan and executes each task **sequentially**. Manages the full lifecycle of each operation — if a critical step fails, it logs the error and gracefully handles state without crashing the server.

### 3. 🛠️ The Tools (`tools/`)
Modular, asynchronous functions that simulate real-world API calls:

| Tool | Responsibility |
|------|---------------|
| **Order Tool** | Cancels orders in the database |
| **Email Tool** | Sends confirmation emails |
| **SMS/OTP Tool** | Handles mobile verification & notifications |

---

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Runtime:** Node.js

---

## 📦 Project Structure

```
├── src/
│   ├── controllers/      # Route handlers
│   ├── services/         # Planner & Orchestrator logic
│   ├── tools/            # Individual action modules (Email, SMS, Order)
│   ├── types/            # TypeScript Interfaces & Task Definitions
│   ├── routes/           # API Endpoints
│   └── app.ts            # Express app configuration
└── server.ts             # Entry point
```

---

## 🚥 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

```bash
npm start
```

### 3. Test the agent

Send a `POST` request to `http://localhost:3000/agent/execute`:

**Request body:**
```json
{
  "input": "cancel order #1234 and send otp to 7028088940 and email to anurag@gmail.com"
}
```

**Response:**
```json
{
  "plan": [
    { "type": "cancel_order", "payload": { "orderId": "1234" } },
    { "type": "send_otp",     "payload": { "phone": "7028088940" } },
    { "type": "send_email",   "payload": { "email": "anurag@gmail.com" } }
  ],
  "result": [
    { "task": "cancel_order", "status": "success", "details": { "message": "Order cancelled" } },
    { "task": "send_otp",     "status": "success", "details": { "message": "OTP sent" } },
    { "task": "send_email",   "status": "success", "details": { "message": "Email sent" } }
  ]
}
```

---

## ✨ Key Features

- **Intent Extraction** — Automatically identifies Order IDs, emails, and phone numbers from plain text
- **Sequential Execution** — Tasks run in order to maintain data integrity
- **Error Resilience** — Failures are captured at the tool level without crashing the server
- **Extensible Architecture** — Add new tools (WhatsApp, Slack, DB logging) by simply defining a new task type

---

## ⚠️ Troubleshooting

### Order cancellation fails intermittently
The `OrderTool` simulates a **20% random failure rate** to mimic real-world API instability. This is intentional — it demonstrates the Orchestrator's error handling. If you see a failure, simply retry the request.

---
