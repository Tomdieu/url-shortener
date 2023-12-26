import { Click, Link } from "@prisma/client";
import React from "react";
import {cn} from "@/lib/utils";
import {formatNumber} from "@/lib/formatNumber";

type LinkType = Link & {
  clicks: Click[];
};

type Props = {
  shortenedUrls: LinkType[];
};

const TopShortenUrl = ({ shortenedUrls }: Props) => {
  return (
    <div className={cn("p-3 rounded-xl border border-stone-200 bg-white text-stone-950 shadow dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50")}>
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
              className="block dark:text-white/70 text text-sm font-serif font-semibold truncate"
              href={url.original}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/*{url.original}*/}
                {process.env.NEXT_PUBLIC_URL+"/"+url.short}
            </a>
            <span className="block  p-1 px-2 border text-xs/tight xl:text-sm rounded-xl cursor-pointer">
              {url.clicks.length < 10 ? `0${url.clicks.length}` : formatNumber(url.clicks.length)} clicks
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopShortenUrl;
