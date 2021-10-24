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
    <NowPlaying
      isPlaying={data.isPlaying}
      album={data.album}
      albumImageUrl={data.albumImageUrl}
      artist={data.artist}
      songUrl={data.songUrl}
      title={data.title}
    />
  )
}

export default Homepage
