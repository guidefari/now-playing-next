import React from 'react'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'

type NowPlayingProps = {
  album?: string
  albumImageUrl?: string
  artist?: string
  isPlaying: boolean
  songUrl?: string
  title?: string
}

const NowPlaying: React.FC = ({}) => {
  const { data } = useSWR('/api/now-playing', fetcher)

  const { album, albumImageUrl, artist, isPlaying, songUrl, title } =
    data as NowPlayingProps

  return (
    <>
      {isPlaying && (
        <section>
          <h1 className="my-24 text-6xl font-black tracking-tight text-center dark:text-yellow-500">
            Now Playing {title}
          </h1>
          <img
            src={albumImageUrl}
            alt={`Album cover for ${title} by ${artist}. From the album ${album}`}
            title={`Album cover for ${title} by ${artist}. From the album ${album}`}
          />
        </section>
      )}
    </>
  )
}

export default NowPlaying
