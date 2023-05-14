import type { NextApiRequest, NextApiResponse } from 'next'
import { getNowPlaying } from '../../lib/spotify'
import fs from 'fs'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getNowPlaying()
  // also get song tempo

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false })
  }

  const song = await response.json()
  console.log(song)
  // fs.writeFile("track.txt", JSON.stringify(song), (err) => {
  //   if (err)
  //     console.log(err);
  //   else {
  //     console.log("File written successfully\n");
  //     console.log("The written has the following contents:");
  //     console.log(fs.readFileSync("books.txt", "utf8"));
  //   }
  // })

  const isPlaying = song.is_playing
  const title = song.item.name
  // @ts-ignore
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ')

  const album = song.item.album.name
  const albumImageUrl = song.item.album.images[0].url
  const songUrl = song.item.external_urls.spotify

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  })
}
