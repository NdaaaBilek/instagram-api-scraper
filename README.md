# instagram-api-scraper

![Frieren](https://s1.zerochan.net/Sousou.no.Frieren.600.3135315.jpg)

## Install

```bash
npm install instagram-api-scraper
```

or using `yarn`

## Usage

```js
import { insta } from "instagram-api-scraper";
const url = "https://www.instagram.com/p/xxxx/?xxx"; // make sure this is real post/reel ig url
insta(url).then((json) => {
  console.log(json);
});
```

- output

```js
{
  status: Boolean,
  username: String,
  full_name: String,
  is_verified: Boolean,
  caption: String,
  profile_pic_url: String,
  urls: [
    {
      id: String,
      shortcode: String,
      height: Number,
      width: Number,
      url: String,
      is_video: Boolean,
      has_audio?: Boolean,
      ext: String
    },
    ...
  ]
}
```
