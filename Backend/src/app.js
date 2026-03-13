import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://reelnova-movies.vercel.app",
//       "https://reelnova-movies-bdyskxt99-nayans-projects-36235e77.vercel.app",
//     ],
//     credentials: true,
//   }),
// );
app.use(
  cors({
    origin: ["http://localhost:5173", "https://reelnova-movies.vercel.app"],
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("API working 🚀");
});

/**
 * Routes import and use here..
 **/
import authRouter from "./routes/auth.routes.js";
// import movieRouter from "./routes/movie.routes.js";
import tmdbRouter from "./routes/TMBD.routes.js";
import favRouter from "./routes/favorite.routes.js";
import historyRouter from "./routes/history.routes.js";
import adminRouter from "./routes/admin.routes.js";
app.use("/api/auth", authRouter);
// app.use("api/movies", movieRouter);
app.use("/api/tmdb", tmdbRouter);
app.use("/api/favorites", favRouter);
app.use("/api/history", historyRouter);
app.use("/api/admin", adminRouter);

export default app;
