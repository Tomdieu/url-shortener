import UrlShortenerForm from "@/components/Link/ShortendUrl";
import React from "react";

type Props = {};

export default async function Links(props: Props) {


    return <div className="flex-1 flex flex-col h-full px-2 py-3">
        <h5 className="text-xl px-3 font-medium lg:text-2xl lg:font-bold">Shortened Url</h5>
        <UrlShortenerForm/>
    </div>;
};

