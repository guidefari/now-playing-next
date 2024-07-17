import NowPlaying from "@/components/NowPlaying";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import type { NowPlayingProps } from "@/types";

function Homepage(): JSX.Element {
  const { data } = useSWR<NowPlayingProps>("/api/now-playing", fetcher);
  console.log({ data });

  if (!data || data?.isPlaying === false) {
    return (
      <div>
        <h1 className="mb-24 text-6xl font-black tracking-tight text-center text-slate-500">
          Guide's Not Listening to Anything on Spotify
        </h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-24 text-5xl font-black tracking-tight text-center text-slate-400">
        Guide's listening to this on Spotify:
      </h1>
      <NowPlaying
        isPlaying={data.isPlaying}
        album={data.album}
        albumImageUrl={data.albumImageUrl}
        artist={data.artist}
        songUrl={data.songUrl}
        title={data.title}
        contextUrl={data.contextUrl}
      />
    </>
  );
}

export default Homepage;
