import sharp from "sharp";

export interface ColorResult {
	solidBgColor: string;
	bgColors: string[];
	textColor: string;
}

export async function getImageColors(imageUrl: string): Promise<ColorResult> {
	const defaultColor = "#1e293b";

	if (!imageUrl) {
		return { solidBgColor: defaultColor, bgColors: [], textColor: "white" };
	}

	try {
		const response = await fetch(imageUrl);
		if (!response.ok) throw new Error("Failed to fetch image");
		const buffer = Buffer.from(await response.arrayBuffer());

		const image = sharp(buffer);
		const stats = await image.resize(150, 150, { fit: "inside" }).stats();

		const channels = stats.channels;
		const dominantColors = [];

		if (channels.length >= 3) {
			const r = Math.round(channels[0].mean);
			const g = Math.round(channels[1].mean);
			const b = Math.round(channels[2].mean);

			const primaryColor = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
			dominantColors.push(primaryColor);

			const variations = [
				{
					r: Math.min(255, r + 30),
					g: Math.min(255, g + 30),
					b: Math.min(255, b + 30),
				},
				{
					r: Math.max(0, r - 30),
					g: Math.max(0, g - 30),
					b: Math.max(0, b - 30),
				},
				{
					r: Math.min(255, r + 60),
					g: Math.max(0, g - 20),
					b: Math.max(0, b - 20),
				},
				{
					r: Math.max(0, r - 20),
					g: Math.min(255, g + 60),
					b: Math.max(0, b - 20),
				},
			];

			for (const variation of variations) {
				const hex = `#${variation.r.toString(16).padStart(2, "0")}${variation.g.toString(16).padStart(2, "0")}${variation.b.toString(16).padStart(2, "0")}`;
				dominantColors.push(hex);
			}
		}

		const bgColors =
			dominantColors.length > 0 ? dominantColors : [defaultColor];

		const textColors = bgColors.map((hex) => {
			const rgb = hex
				.replace(/^#/, "")
				.match(/.{2}/g)
				?.map((x) => parseInt(x, 16)) || [0, 0, 0];
			const [r, g, b] = rgb;
			const brightness = (r * 299 + g * 587 + b * 114) / 1000;
			return brightness > 128 ? "black" : "white";
		});

		return {
			solidBgColor: bgColors[0] || defaultColor,
			bgColors: bgColors.slice(0, 2),
			textColor: textColors[0] || "white",
		};
	} catch (error) {
		return {
			solidBgColor: defaultColor,
			bgColors: [],
			textColor: "white",
		};
	}
}
