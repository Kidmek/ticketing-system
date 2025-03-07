import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth";
import ticketRoutes from "./routes/tickets";

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/ticketing";
const port = process.env.PORT || 9000;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
