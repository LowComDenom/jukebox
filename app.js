import express from "express";
const app = express();
export default app;

import trackRouter from "#api/tracks"
import playlistRouter from "#api/playlists"

app.use(express.json())

app.use('/tracks', trackRouter)
app.use('/playlists', playlistRouter)

app.use((err, req, res, next) => {
  console.error(err)

  if (err.code === "23503") {
    return res.status(400).send(err.detail);
  }
  
  if (err.code === "22P02") {
    return res.status(400).send(err.detail);
  }

  if (err.code === "23505") {
    return res.status(400).send(err.detail);
  }
  res.status(500).send("Sorry! Something went wrong.")
})
