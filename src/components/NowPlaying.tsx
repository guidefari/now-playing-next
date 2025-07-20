import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa6";
import { LuClipboardType } from "react-icons/lu";
import type { NowPlayingProps } from "../types";
import { CopyToClipBoard } from "./CopyToClipboard";

const useImageColors = (imageUrl: string) => {
	const [colors, setColors] = useState<string[]>([]);
	const [textColors, setTextColors] = useState<string[]>([]);

	useEffect(() => {
		if (!imageUrl) return;

		const extractColors = async () => {
			try {
				const img = new window.Image();
				img.crossOrigin = "anonymous";
				img.src = imageUrl;

				img.onload = () => {
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d");
					if (!ctx) return;

					canvas.width = img.width;
					canvas.height = img.height;
					ctx.drawImage(img, 0, 0);

					const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
					const data = imageData.data;
					const colorMap = new Map<string, number>();

					for (let i = 0; i < data.length; i += 4) {
						const r = data[i];
						const g = data[i + 1];
						const b = data[i + 2];
						const key = `${r},${g},${b}`;
						colorMap.set(key, (colorMap.get(key) || 0) + 1);
					}

					const sortedColors = Array.from(colorMap.entries())
						.sort((a, b) => b[1] - a[1])
						.slice(0, 5)
						.map(([color]) => `rgb(${color})`);

					setColors(sortedColors);

					const textColors = sortedColors.map((color) => {
						const [r, g, b] = color.match(/\d+/g)?.map(Number) || [0, 0, 0];
						const brightness = (r * 299 + g * 587 + b * 114) / 1000;
						return brightness > 128 ? "black" : "white";
					});
					setTextColors(textColors);
				};
			} catch (error) {
				console.error("Error extracting colors:", error);
			}
		};

		extractColors();
	}, [imageUrl]);

	return { bg: colors, text: textColors };
};

const NowPlaying = ({
	album,
	isPlaying,
	albumImageUrl,
	title,
	artist,
	songUrl,
	contextUrl,
}: NowPlayingProps) => {
	const colors = useImageColors(albumImageUrl);

	const getBackgroundStyle = () => {
		if (colors.bg.length === 0) {
			return { backgroundColor: "#1e293b" };
		}

		const gradientColors = colors.bg.slice(0, 3);
		return {
			background: `linear-gradient(135deg, ${gradientColors.join(", ")})`,
			backdropFilter: "blur(20px)",
			WebkitBackdropFilter: "blur(20px)",
		};
	};

	return (
		<>
			{isPlaying && (
				<div
					className="min-h-dvh p-4 relative overflow-hidden"
					style={getBackgroundStyle()}
				>
					<div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
					<div className="relative z-10 grid grid-rows-12 h-full rounded-xl  backdrop-blur-md">
						<div className="row-span-1 flex items-center justify-center"></div>
						<div className="row-span-5 flex items-center justify-center p-4">
							<figure className="aspect-square w-80 relative">
								<a href={songUrl} target="_blank" rel="noreferrer">
									<Image
										src={albumImageUrl}
										fill
										className="rounded-xl shadow-2xl"
										alt={`Album cover for ${title} by ${artist}. From the album ${album}`}
										title={`Album cover for ${title} by ${artist}. From the album ${album}`}
									/>
								</a>
								{/* <figcaption className="text-2xl text-amber-400 drop-shadow-lg">
									<a href={contextUrl}>{album}</a>
								</figcaption> */}
							</figure>
						</div>
						<div className="row-span-1 flex items-center justify-center">
							<h1
								className="tracking-tight text-center text-2xl md:text-4xl drop-shadow-lg"
								style={{ color: colors.text?.[0] ?? "white" }}
							>
								{artist} - {title}
							</h1>
						</div>
						<div className="row-span-2 flex items-center justify-center">
							{/* <div className="flex space-x-3">
								<CopyToClipBoard
									RenderComponent={
										<LuClipboardType className="clipboard-icon" />
									}
									title="Copy title to clipboard"
									stringToCopy={`${artist} - ${title}`}
								/>
								<CopyToClipBoard
									RenderComponent={<FaLink className="clipboard-icon" />}
									title="Copy spotify link clipboard"
									stringToCopy={songUrl}
								/>
							</div> */}
						</div>
						<div className="row-span-3 flex items-center justify-center">
							{/* Additional content area */}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default NowPlaying;
