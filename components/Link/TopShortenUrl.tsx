import React from "react";

type Props = {};

type ShortenedUrl = {
  id: number;
  url: string;
  clicks: number;
};

const TopShortenUrl = (props: Props) => {
  const shortenedUrls: ShortenedUrl[] = [
    { id: 1, url: "https://github.com/tomdieu", clicks: 10 },
    { id: 2, url: "https://github.com/tomdieu", clicks: 8 },
    { id: 3, url: "https://github.com/tomdieu", clicks: 6 },
    { id: 4, url: "https://github.com/tomdieu", clicks: 4 },
    { id: 5, url: "https://github.com/tomdieu", clicks: 2 },
  ];

  return (
    <div className="border p-3 rounded-md shadow-md">
      <div className="my-2">
        <h5 className="text-xl font-bold">Top shortened URLs</h5>
        <span className="block text-gray-400 text-xs px-1">You have {shortenedUrls.length} top shortened urls</span>
      </div>
      <div className="flex flex-col gap-2">
        {shortenedUrls.map((url) => (
          <div key={url.id} className="w-full flex items-center justify-between">
            <a className="block text-blue-500 text-sm font-serif font-semibold" href={url.url}>{url.url}</a>
            
            <span className="block p-2 px-3 border text-sm rounded-full cursor-pointer">{url.clicks<10?`0${url.clicks}`:url.clicks} clicks</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopShortenUrl;
