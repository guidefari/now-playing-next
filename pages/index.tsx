import NowPlaying from '../components/NowPlaying'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import { NowPlayingProps } from '../lib/types'

function Homepage(): JSX.Element {
  const { data } = useSWR<NowPlayingProps>('/api/now-playing', fetcher)

  if (!data) {
    return <div></div>
  }

  return (
    <>
      <h1 className="mb-24 text-6xl font-black tracking-tight text-center dark:text-yellow-500">
        Now Playing{' '}
      </h1>
      <NowPlaying
        isPlaying={data.isPlaying}
        album={data.album}
        albumImageUrl={data.albumImageUrl}
        artist={data.artist}
        songUrl={data.songUrl}
        title={data.title}
      />
    </>
  )
}

export default Homepage
