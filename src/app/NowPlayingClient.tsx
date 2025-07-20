"use client";
import { useQuery } from "@tanstack/react-query";
import NowPlaying from "@/components/NowPlaying";
import fetcher from "@/lib/fetcher";
import type { NowPlayingProps } from "@/types";

async function getNowPlayingData(): Promise<
	NowPlayingProps | { isPlaying: false }
> {
	try {
		return await fetcher<NowPlayingProps>("/api/now-playing");
	} catch (error) {
		console.error("Error fetching now playing data on client:", error);
		return { isPlaying: false };
	}
}

export default function NowPlayingClient({
	initialData,
}: {
	initialData: NowPlayingProps | { isPlaying: false };
}) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["now-playing"],
		queryFn: getNowPlayingData,
		refetchInterval: 10000,
		initialData,
	});

	if (isLoading) {
		return (
			<div>
				<h1 className="mb-24 text-6xl font-black tracking-tight text-center text-slate-500">
					Loading...
				</h1>
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<h1 className="mb-24 text-6xl font-black tracking-tight text-center text-red-500">
					Error loading Spotify data
				</h1>
			</div>
		);
	}

	if (!data || !data?.isPlaying) {
		return (
			<div>
				<h1 className="mb-24 text-6xl font-black tracking-tight text-center">
					Guide's Not Listening to Anything on Spotify
				</h1>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center overflow-hidden">
			<NowPlaying data={data} />
		</div>
	);
}
