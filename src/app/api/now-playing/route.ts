import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";
import type { NowPlayingProps, NowPlayingResponse } from "@/types";

export async function GET(): Promise<
	NextResponse<NowPlayingProps | { isPlaying: false }>
> {
	try {
		const response = await getNowPlaying();

		if (!response || !response.isPlaying) {
			return NextResponse.json({ isPlaying: false });
		}

		return NextResponse.json(response);
	} catch (error) {
		console.error("Error in now-playing API route:", error);
		return NextResponse.json({ isPlaying: false });
	}
}
