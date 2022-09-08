import express from "express";
import imageRouter from "./routers/image-router.js";

const app = express();

app.use(express.json());

app.use("/image", imageRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`app started listen at ${process.env.PORT || 4000} PORT`);
});
