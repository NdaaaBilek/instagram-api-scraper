const BASE_URL = "https://www.instagram.com/graphql/query";
const HASH = "9f8827793ef34641b2fb195d4d41151c";

export const API_URL = (code: string): string =>
	`${BASE_URL}?query_hash=${HASH}&variables=${encodeURIComponent(
		`{"shortcode": "${code}","child_comment_count":3,"fetch_comment_count":40,"parent_comment_count":24,"has_threaded_comments":true}`
	)}`;
export const Config = {
	"user-agent":
		"Mozilla/5.0 (Linux; Android 13; M2007J20CG Build/TQ1A.221205.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.79 Mobile Safari/537.36",
	accept:
		"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
	// @ts-ignore:next-line
	cookie: "ds_user_id=null",
	// @ts-ignore:next-line
	cookie: "sessionid=null",
	// @ts-ignore:next-line
	cookie: "",
	"content-type":
		"application/x-www-form-urlencoded; application/json; charset=utf-8",
	"cache-control": "no-cache",
	authority: "i.instagram.com/",
	"x-requested-with": "",
	"accept-encoding": "gzip, deflate, br",
	"accept-language": "en-GB,en-US;q=0.8,en;q=0.6;q=0.5",
	"x-ig-capabilities": "3w==",
	"sec-fetch-site": "none",
	"sec-fetch-mode": "navigate",
	"sec-fetch-user": "?1",
	"sec-fetch-dest": "document",
	referer: "https://www.instagram.com/",
};

const REGEXP: RegExp = /(?:https?:\/\/www\.)?instagram\.com\/[\w]+\/(.*?)\//;
/*/(?:https?:\/\/www\.)?instagram\.com\S*?\/[A-Za-z0-9]\/(.*?)\//*/

export function extractCode(STR: string): string | boolean {
	const isValidUrl = STR.match(REGEXP);
	if (isValidUrl !== null && isValidUrl[1]) {
		return isValidUrl[1];
	} else {
		return false;
	}
}
type Results = {
	status: boolean;
	message?: string;
	username?: string;
	is_verified?: string;
	full_name?: string;
	profile_pic_url?: string;
	caption?: string;
	urls?: {
		id?: string;
		shortcode?: string;
		height?: number | string;
		width?: number | string;
		url?: string;
		is_video?: boolean;
		has_audio?: boolean;
		video_view_count?: number | string;
		video_play_count?: number | string;
		ext?: string;
	}[];
};
export { Results };
export const PARSER = (arr: any): Results => {
	let Urls = [];
	const shortVar = arr.data.shortcode_media;
	if (
		shortVar &&
		shortVar.__typename == "GraphSidecar" &&
		shortVar.edge_sidecar_to_children.edges
	) {
		shortVar.edge_sidecar_to_children.edges.map((v: any) => {
			if (v.node.__typename == "GraphImage") {
				Urls.push({
					id: v.node.id,
					shortcode: v.node.shortcode,
					...v.node.dimensions,
					url: v.node.display_url,
					is_video: v.node.is_video,
					ext: ".jpg",
				});
			}
			if (v.node.__typename == "GraphVideo" && v.node.is_video) {
				Urls.push({
					id: v.node.id,
					shortcode: v.node.shortcode,
					...v.node.dimensions,
					url: v.node.video_url,
					is_video: v.node.is_video,
					has_audio: v.node.has_audio,
					ext: ".mp4",
				});
			}
		});
	} else if (shortVar && shortVar.__typename == "GraphVideo") {
		Urls.push({
			id: shortVar.id,
			shortcode: shortVar.shortcode,
			...shortVar.dimensions,
			url: shortVar.video_url,
			is_video: shortVar.is_video,
			has_audio: shortVar.has_audio,
			video_view_count: shortVar.video_view_count,
			video_play_count: shortVar.video_play_count,
			ext: ".mp4",
		});
	} else if (shortVar && shortVar.__typename == "GraphImage") {
		Urls.push({
			id: shortVar.id,
			shortcode: shortVar.shortcode,
			...shortVar.dimensions,
			url: shortVar.display_url,
			is_video: shortVar.is_video,
			ext: ".jpg",
		});
	} else {
		return { status: false, message: "ktl" };
	}
	const username = shortVar.owner.username || "";
	const is_verified = shortVar.owner.is_verified || "";
	const full_name = shortVar.owner.full_name || "";
	const profile_pic_url = shortVar.owner.profile_pic_url || "";
	const caption = shortVar.edge_media_to_caption.edges[0].text || "";
	return {
		status: true,
		username,
		full_name,
		is_verified,
		caption,
		profile_pic_url,
		urls: Urls,
	};
};
