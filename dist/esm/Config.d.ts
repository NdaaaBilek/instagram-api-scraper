export declare const API_URL: (code: string) => string;
export declare const Config: {
    "user-agent": string;
    accept: string;
    cookie: string;
    "content-type": string;
    "cache-control": string;
    authority: string;
    "x-requested-with": string;
    "accept-encoding": string;
    "accept-language": string;
    "x-ig-capabilities": string;
    "sec-fetch-site": string;
    "sec-fetch-mode": string;
    "sec-fetch-user": string;
    "sec-fetch-dest": string;
    referer: string;
};
export declare function extractCode(STR: string): string | boolean;
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
export declare const PARSER: (arr: any) => Results;
//# sourceMappingURL=Config.d.ts.map