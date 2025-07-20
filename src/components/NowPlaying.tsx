import Image from "next/image";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaLink } from "react-icons/fa6";
import { LuClipboardType } from "react-icons/lu";
import type { NowPlayingProps } from "../types";
import { CopyToClipBoard } from "./CopyToClipboard";

const NowPlaying = ({
	album,
	isPlaying,
	albumImageUrl,
	title,
	artist,
	songUrl,
	contextUrl,
	solidBgColor,
	bgColors,
	textColor,
}: NowPlayingProps) => {
	console.log("bgColors:", bgColors);
	const mainDivRef = useRef<HTMLDivElement>(null);

	const playerStyle = useMemo(() => {
		return {
			background: `linear-gradient(135deg, ${bgColors.map((color) => color).join(", ")})`,
			backdropFilter: "blur(20px)",
			WebkitBackdropFilter: "blur(20px)",
		};
	}, [bgColors]);

	const bodyStyle = useMemo(() => {
		const grayBase = "rgb(128, 128, 128)";
		const colorInfluence = bgColors.map((color) => color).join(", ");

		return {
			background: `linear-gradient(to bottom, ${grayBase}, ${colorInfluence})`,
			backdropFilter: "blur(40px)",
		};
	}, [bgColors]);

	useEffect(() => {
		if (bgColors.length > 0) {
			const body = document.body;

			body.style.background = bodyStyle.background;
			body.style.backdropFilter = bodyStyle.backdropFilter;
		}
	}, [bodyStyle, bgColors]);

	return (
		<>
			{isPlaying && (
				<div
					ref={mainDivRef}
					className="px-4 h-dvh w-full relative overflow-hidden gap-4 lg:max-w-xl grid grid-rows-12  backdrop-blur-md"
					style={playerStyle}
				>
					{/* <div className="row-span-1"></div> */}
					<div className="row-span-5 flex justify-center items-center">
						<Image
							src={albumImageUrl}
							width={320}
							height={320}
							priority
							className="rounded-xl shadow-2xl"
							alt={`Album cover for ${title} by ${artist}. From the album ${album}`}
							title={`Album cover for ${title} by ${artist}. From the album ${album}`}
						/>
					</div>
					<div className="row-span-1 ">
						<h1
							className="tracking-tight text-left drop-shadow-lg"
							style={{ color: textColor }}
						>
							{artist} - {title}
						</h1>
					</div>
					<div className="row-span-2 "></div>
					<div className="row-span-3 "></div>
				</div>
			)}
		</>
	);
};

export default NowPlaying;
