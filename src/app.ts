import express from "express";
import agentRoutes from "./routes/agent.routes";

const app = express();

app.use(express.json());

app.use("/agent", agentRoutes);

export default app;