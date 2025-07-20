import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaCopy, FaLink } from "react-icons/fa6";
import { SiSpotify } from "react-icons/si";
import { toast } from "sonner";
import { handleCopyToClipboard } from "@/lib/utils";
import type { NowPlayingProps } from "../types";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./Tooltip";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const NowPlaying = ({ data }: { data: NowPlayingProps }) => {
	const mainDivRef = useRef<HTMLDivElement>(null);
	const [currentProgress, setCurrentProgress] = useState(data.progressMs);
	const [isPlaying, setIsPlaying] = useState(data.isPlaying);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const playerStyle = useMemo(() => {
		return {
			background: `linear-gradient(135deg, ${data.bgColors.map((color) => color).join(", ")})`,
			backdropFilter: "blur(20px)",
			WebkitBackdropFilter: "blur(20px)",
			color: data.textColor,
		};
	}, [data.bgColors, data.textColor]);

	const bodyStyle = useMemo(() => {
		const grayBase = "rgb(128, 128, 128)";
		const colorInfluence = data.bgColors.map((color) => color).join(", ");

		if (!data.isPlaying) {
			return {
				background: "black",
				backdropFilter: "blur(40px)",
			};
		}

		return {
			background: `linear-gradient(to bottom, ${grayBase}, ${colorInfluence})`,
			backdropFilter: "blur(40px)",
		};
	}, [data.bgColors, data.isPlaying]);

	useEffect(() => {
		if (data.bgColors.length > 0) {
			const body = document.body;

			body.style.background = bodyStyle.background;
			body.style.backdropFilter = bodyStyle.backdropFilter;
		}
	}, [bodyStyle, data.bgColors]);

	useEffect(() => {
		setCurrentProgress(data.progressMs);
		setIsPlaying(data.isPlaying);

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}

		if (data.isPlaying && data.progressMs < data.durationMs) {
			const startTime = Date.now() - data.progressMs;

			intervalRef.current = setInterval(() => {
				const elapsed = Date.now() - startTime;

				if (elapsed >= data.durationMs) {
					setCurrentProgress(data.durationMs);
					setIsPlaying(false);
					if (intervalRef.current) {
						clearInterval(intervalRef.current);
						intervalRef.current = null;
					}
				} else {
					setCurrentProgress(elapsed);
				}
			}, 1000);
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [data.progressMs, data.durationMs, data.isPlaying]);

	const formatTime = (ms: number) => {
		const minutes = Math.floor(ms / 1000 / 60);
		const seconds = Math.floor((ms / 1000) % 60);
		return `${minutes}:${String(seconds).padStart(2, "0")}`;
	};

	const progressPercentage = (currentProgress / data.durationMs) * 100;
	const remainingTime = data.durationMs - currentProgress;

	return (
		<>
			{data.isPlaying && (
				<div
					ref={mainDivRef}
					className="px-4 lg:px-8 h-dvh w-full relative gap-4 lg:max-w-xl grid grid-rows-12 backdrop-blur-md"
					style={playerStyle}
				>
					<div className="row-span-1"></div>
					<div className="row-span-5 flex justify-center items-center">
						<Image
							src={data.albumImageUrl}
							width={320}
							height={320}
							priority
							className="rounded-xl shadow-2xl"
							alt={`Album cover for ${data.title} by ${data.artist}. From the album ${data.album}`}
							title={`Album cover for ${data.title} by ${data.artist}. From the album ${data.album}`}
						/>
					</div>
					<div className="row-span-2 flex flex-col gap-2 relative">
						<div className="flex justify-between items-start">
							<div className="flex-1">
								<h1 className="tracking-tight text-left text-lg drop-shadow-lg relative">
									{data.title}
								</h1>
								<h3 className="text-sm">{data.artist}</h3>
							</div>
							<div className="relative">
								<DropdownMenu modal={false}>
									<DropdownMenuTrigger asChild>
										<button
											type="button"
											className="p-1 hover:bg-white/10 rounded-full transition-colors"
											aria-label="More options"
										>
											<svg
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="currentColor"
												aria-hidden="true"
											>
												<circle cx="12" cy="12" r="2" />
												<circle cx="4" cy="12" r="2" />
												<circle cx="20" cy="12" r="2" />
											</svg>
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										side="top"
										className="w-48"
										sideOffset={8}
									>
										<DropdownMenuItem
											onClick={() => {
												handleCopyToClipboard(data.songUrl);
												toast.success("Track URL copied to clipboard");
											}}
										>
											<FaLink className="mr-2 h-4 w-4" />
											Copy track URL
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => {
												handleCopyToClipboard(data.title);
												toast.success("Track title copied to clipboard");
											}}
										>
											<FaCopy className="mr-2 h-4 w-4" />
											Copy track title
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
						<div className="w-full my-2 relative">
							<div className="w-full h-2 bg-gray-200 rounded-full relative">
								<div
									className="h-full bg-gray-300 rounded-full relative transition-all duration-1000 ease-linear"
									style={{
										width: `${progressPercentage}%`,
									}}
								>
									<div className="absolute -right-1 -top-0.5 w-3 h-3 bg-gray-400 rounded-full shadow-sm"></div>
								</div>
							</div>
							<div className="flex justify-between mt-2 text-xs">
								<span>{formatTime(currentProgress)}</span>
								<span>-{formatTime(remainingTime)}</span>
							</div>
						</div>
					</div>
					<div className="row-span-1 items-center flex justify-center text-5xl lg:text-7xl">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										onClick={() => {
											window.open(data.songUrl, "_blank");
										}}
										className="hover:scale-110 hover:text-green-400 transition-transform duration-200"
									>
										<SiSpotify className="cursor-pointer" />
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Stream on Spotify</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<div className="row-span-3 "></div>
				</div>
			)}
		</>
	);
};

export default NowPlaying;
