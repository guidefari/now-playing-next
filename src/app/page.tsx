import NowPlayingClient from "@/app/NowPlayingClient";
import { getNowPlaying } from "@/lib/spotify";
import type { NowPlayingProps } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
	const initialData: NowPlayingProps | { isPlaying: false } =
		await getNowPlaying().catch((error) => {
			console.error("Error fetching now playing data on server:", error);
			return { isPlaying: false };
		});

	return <NowPlayingClient initialData={initialData} />;
}
