import type React from "react";
import type { NowPlayingProps } from "../types";
import { LuClipboardType } from "react-icons/lu";
import { CopyToClipBoard } from "./CopyToClipboard";
import { FaLink } from "react-icons/fa6";

const NowPlaying = ({
  album,
  isPlaying,
  albumImageUrl,
  title,
  artist,
  songUrl,
  contextUrl,
}: NowPlayingProps) => {
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
            <figcaption className="text-2xl font-black text-center text-yellow-600">
              <a href={contextUrl}>{album}</a>
            </figcaption>
          </figure>
          <aside>
            <div className="flex space-x-3">
            <CopyToClipBoard RenderComponent={<LuClipboardType className="clipboard-icon"/>} title="Copy title to clipboard" stringToCopy={`${artist} - ${title}`} />
              <CopyToClipBoard RenderComponent={<FaLink className="clipboard-icon"/>} title="Copy spotify link clipboard" stringToCopy={songUrl} />
          </div>
            <h1 className="text-4xl font-black tracking-tight text-left md:text-6xl text-yellow-500">
            {artist} - {title}
            </h1>
          </aside>
      </section>        
      )}
    </>
  );
};

export default NowPlaying;
