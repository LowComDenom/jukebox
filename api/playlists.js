import express from "express"
import { getPlaylists, getPlaylist, newPlaylist, getPlaylistTracks, newLink } from "#db/query/playlists"

const router = express.Router()
export default router

router.route('/')
  .get(async (req, res) => { res.send(await getPlaylists()) })
  .post(async (req, res) => {
    if (!req.body || !req.body.name || !req.body.description) { return res.status(400).send("Request body missing or malformed.") }
    res.status(201).send(await newPlaylist({name: req.body.name, description: req.body.description}))
  })

router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylist(id)
  if (!playlist) { return res.status(404).send("Playlist not found.") }
  req.playlist = playlist
  next()
})

router.route('/:id').get(async (req, res) => { res.send(req.playlist) })

router.route('/:id/tracks')
  .get(async (req, res) => { res.send(await getPlaylistTracks(req.playlist.id)) })
  .post(async (req, res) => {
    if (!req.body || !req.body.trackId) return res.status(400).send("Request body missing or malformed.")
    res.status(201).send(await newLink({
      playlist_id: req.playlist.id,
      track_id: req.body.trackId
    }))
  })