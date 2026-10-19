import express from "express"
import { getTracks, getTrack } from "#db/query/tracks"

const router = express.Router()
export default router

router.route('/').get(async (req, res) => { res.send(await getTracks()) })

router.param("id", async (req, res, next, id) => {
  const track = await getTrack(id)
  if (!track) return res.status(404).send("Track not found.")
  req.track = track
  next()
})

router.route('/:id').get(async (req, res) => { res.send(req.track) })
