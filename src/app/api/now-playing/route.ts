import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";
import type { NowPlayingProps, NowPlayingResponse } from "@/types";

export async function GET(): Promise<
	NextResponse<NowPlayingProps | { isPlaying: false }>
> {
	try {
		const response = await getNowPlaying();

		if (response.status === 204 || response.status > 400) {
			return NextResponse.json({ isPlaying: false });
		}

		const song: NowPlayingResponse = await response.json();

		const isPlaying = song.is_playing;
		const title = song.item.name;
		const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
		const album = song.item.album.name;
		const albumImageUrl = song.item.album.images[0].url;
		const songUrl = song.item.external_urls.spotify;

		return NextResponse.json({
			album,
			albumImageUrl,
			artist,
			isPlaying,
			songUrl,
			title,
			contextUrl: song.item.album.external_urls.spotify,
		});
	} catch (error) {
		console.error("Error in now-playing API route:", error);
		return NextResponse.json({ isPlaying: false });
	}
}
