import React from 'react'
import { NowPlayingProps } from '../lib/types'

const NowPlaying: React.FC<NowPlayingProps> = ({
  album,
  isPlaying,
  albumImageUrl,
  title,
  artist,
  songUrl,
}) => {
  return (
    <>
      {isPlaying && (
        <section className="flex flex-col space-x-7 md:flex-row">
          <figure>
            <a href={songUrl} target="_blank">
              <img
                src={albumImageUrl}
                className="rounded-xl"
                alt={`Album cover for ${title} by ${artist}. From the album ${album}`}
                title={`Album cover for ${title} by ${artist}. From the album ${album}`}
              />
            </a>
            <figcaption className="text-2xl font-black text-center dark:text-yellow-600">
              {album}
            </figcaption>
          </figure>
          <aside>
            <a
              href={songUrl}
              target="_blank"
              className="hover:underline hover:text-yellow-600"
            >
              <h1 className="my-24 text-4xl font-black tracking-tight text-center md:text-6xl dark:text-yellow-500">
                {artist} - {title}
              </h1>
            </a>
          </aside>
        </section>
      )}
    </>
  )
}

export default NowPlaying
