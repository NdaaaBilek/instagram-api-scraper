"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insta = void 0;
const axios_1 = __importDefault(require("axios"));
const Config_js_1 = require("./Config.js");
const insta = async (url) => {
    const valicode = (0, Config_js_1.extractCode)(url);
    if (!valicode || typeof valicode !== "string") {
        return {
            status: false,
            message: "Failed extract code in url, is that valid instagram url?",
        };
    }
    const data = await axios_1.default
        .get((0, Config_js_1.API_URL)(valicode), {
        headers: {
            // @ts-ignore:next-line
            ...Config_js_1.Config,
        },
    })
        .catch((e) => e.response);
    if (data.data && data.data.status == "ok") {
        delete data.data.data.shortcode_media.edge_media_to_parent_comment;
        delete data.data.data.shortcode_media.edge_media_preview_comment;
        const results = (0, Config_js_1.PARSER)(data.data);
        return results;
    }
    else {
        return {
            status: false,
            message: "idk dude",
        };
    }
};
exports.insta = insta;
const INSTA = {
    dl: exports.insta,
    instagram: exports.insta,
    insta: exports.insta,
};
exports.default = INSTA;
//# sourceMappingURL=index.js.map