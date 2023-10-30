import { Click, Link } from "@prisma/client";
import React from "react";

type LinkType = Link & {
  clicks: Click[];
};

type Props = {
  shortenedUrls: LinkType[];
};

const TopShortenUrl = ({ shortenedUrls }: Props) => {
  return (
    <div className="border dark:border-white/20 p-3 rounded-md shadow-md">
      <div className="my-2">
        <h5 className="text-xl font-bold">Top Shortened URLs</h5>
        <span className="block text-gray-400 text-xs px-1">
          You have {shortenedUrls.length} top shortened URLs
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {shortenedUrls.map((url) => (
          <div key={url.id} className="w-full flex items-center justify-around xl:justify-between">
            <a
              className="block dark:text-white/70 text-blue-500 text-sm font-serif font-semibold"
              href={url.original}
              target="_blank"
              rel="noopener noreferrer"
            >
              {url.original}
            </a>
            <span className="block dark:border-white/20 p-2 px-3 border text-xs/tight xl:text-sm rounded-xl cursor-pointer">
              {url.clicks.length < 10 ? `0${url.clicks.length}` : url.clicks.length} clicks
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopShortenUrl;
