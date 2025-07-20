import querystring from "node:querystring";
import type { NowPlayingProps, NowPlayingResponse } from "@/types";
import fetcher from "./fetcher";
import { getImageColors } from "./getColors";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TRACK_FEATURES_ENDPOINT = `https://api.spotify.com/v1/audio-features/`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

interface TokenCache {
	access_token: string;
	expires_at: number;
}

let tokenCache: TokenCache | null = null;

const getAccessToken = async () => {
	const now = Date.now();

	if (tokenCache && now < tokenCache.expires_at) {
		console.log("Using cached token");
		return { access_token: tokenCache.access_token };
	}

	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: querystring.stringify({
			grant_type: "refresh_token",
			refresh_token,
			client_id,
		}),
	});

	const data = await response.json();

	tokenCache = {
		access_token: data.access_token,
		expires_at: now + 10 * 60 * 1000,
	};

	return data;
};

export const getNowPlaying = async (): Promise<NowPlayingProps> => {
	const { access_token } = await getAccessToken();

	const data = await fetcher<NowPlayingResponse>(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	const colors = await getImageColors(data.item.album.images[0].url);
	console.log("colors:", colors);

	return {
		album: data.item.album.name,
		albumImageUrl: data.item.album.images[0].url,
		contextUrl: data.item.album.external_urls.spotify,
		artist: data.item.artists.map((_artist) => _artist.name).join(", "),
		isPlaying: data.is_playing,
		songUrl: data.item.external_urls.spotify,
		title: data.item.name,
		solidBgColor: colors.solidBgColor,
		bgColors: colors.bgColors,
		textColor: colors.textColor,
	};
};
export const getAudioFeatures = async (id: number) => {
	const { access_token } = await getAccessToken();

	return fetch(`${TRACK_FEATURES_ENDPOINT}/${id}`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};
