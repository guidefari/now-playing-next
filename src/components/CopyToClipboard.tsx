"use client";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/Tooltip";
import { handleCopyToClipboard } from "@/lib/utils";
import type React from "react";
import { useState } from "react";
import { GiCheckMark as CheckIcon } from "react-icons/gi";

type Props = {
	RenderComponent: React.JSX.Element;
	title: string;
	stringToCopy: string;
};

export const CopyToClipBoard = ({
	RenderComponent,
	title,
	stringToCopy,
}: Props) => {
	const [isCopied, setIsCopied] = useState(false);

	const toggleIsCopiedForThreeSeconds = () => {
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 1234);
	};

	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger
					onClick={() => {
						toggleIsCopiedForThreeSeconds();
						handleCopyToClipboard(stringToCopy);
					}}
				>
					<div className="flex justify-center items-center w-5 h-5">
						{isCopied ? (
							<CheckIcon className="clipboard-icon" />
						) : (
							RenderComponent
						)}
					</div>
				</TooltipTrigger>
				<TooltipContent side="top">
					{isCopied ? "Copied to clipboard!" : title || "Copy to clipboard"}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
