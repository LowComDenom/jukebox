import db from "#db/client";

import { faker } from "@faker-js/faker"
import { newTrack } from "#db/query/tracks";
import { newPlaylist } from "#db/query/playlists";
import { newLink } from "#db/query/playlists";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO: add 20 tracks, 10 playlists, 15 playlists_tracks
  for (let i = 0; i < 20; i++)
    await newTrack({ name: faker.music.songName(), duration_ms: Math.floor(Math.random() * (60000 + 360000)) })

  for (let i = 0; i < 10; i++)
    await newPlaylist({ name: faker.string.uuid(), description: faker.lorem.sentence() })

  for (let i = 1; i < 11; i++) {
    await newLink({ playlist_id: i, track_id: i })
    await newLink({ playlist_id: i, track_id: i+2 })
  }
}
