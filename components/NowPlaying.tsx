import React from 'react'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import { NowPlayingProps } from '../lib/types'

const NowPlaying: React.FC<NowPlayingProps> = ({
  album,
  isPlaying,
  albumImageUrl,
  title,
  artist,
}) => {
  return (
    <>
      {isPlaying && (
        <section className="flex ">
          <img
            src={albumImageUrl}
            className="rounded-xl"
            alt={`Album cover for ${title} by ${artist}. From the album ${album}`}
            title={`Album cover for ${title} by ${artist}. From the album ${album}`}
          />
          <h1 className="my-24 text-6xl font-black tracking-tight text-center dark:text-yellow-500">
            Now Playing {title}
          </h1>
        </section>
      )}
    </>
  )
}

export default NowPlaying
