import type React from "react";
import type { NowPlayingProps } from "../types";

const NowPlaying: React.FC<NowPlayingProps> = ({
  album,
  isPlaying,
  albumImageUrl,
  title,
  artist,
  songUrl,
  contextUrl,
}) => {
  return (
    <>
      {isPlaying && (
        <section className="flex flex-col space-x-7 md:flex-row">
          <figure>
            <a href={songUrl} target="_blank" rel="noreferrer">
              <img
                src={albumImageUrl}
                className="rounded-xl"
                alt={`Album cover for ${title} by ${artist}. From the album ${album}`}
                title={`Album cover for ${title} by ${artist}. From the album ${album}`}
              />
            </a>
            <figcaption className="text-2xl font-black text-center dark:text-yellow-600">
              <a href={contextUrl}>{album}</a>
            </figcaption>
          </figure>
          <aside>
            <h1 className="my-24 text-4xl font-black tracking-tight text-left md:text-6xl dark:text-yellow-500">
              {artist} - {title}
            </h1>
            <button type="button">Copy title to clipboard</button>
            <button type="button">Copy spotify link clipboard</button>
          </aside>
        </section>
      )}
    </>
  );
};

export default NowPlaying;
