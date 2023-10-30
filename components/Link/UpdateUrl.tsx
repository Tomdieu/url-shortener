"use client"
import {Button} from "@/components/ui/button";
import {Clipboard} from "lucide-react";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {linkSchema, LinkType} from "@/schema/link.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import SubmitButton from "@/components/SubmitButton";
import {toast} from "react-hot-toast";
import {Link} from "@/types";

type UpdateUrlProps = {
    baseUrl?: string;
    url?: Link;
    className?: string;
};

export default function UpdateUrl({
                                      url,
                                      baseUrl = 'http://localhost:3000',
                                      className,
                                  }: UpdateUrlProps) {
    console.log("Url data")
    console.log(url)
    const {register, handleSubmit, formState: {errors}} = useForm<LinkType>({
        resolver: zodResolver(linkSchema),
    });

    const onSubmit: SubmitHandler<LinkType> = (data) => {
        console.log(data);
        toast.success("Url updated successfully")
    };


    return (
        <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 bg-white shadow p-2 border rounded-md"
        >
            <div className="flex gap-1 flex-col">
                <label htmlFor="original" className="font-bold text-xl">
                    Original Url
                </label>
                <input
                    id="original"
                    type="url"
                    value={url?.original}
                    {...register('original')}
                    className="py-3 px-2 border rounded-md"
                />
                {errors.original?.message && (
                    <p className={"font-bold text-red-300"}>{errors.original?.message}</p>
                )}
            </div>
            <div className="flex gap-1 flex-col">
                <label className="font-bold text-xl">Shorten Url</label>
                <div className="flex items-center justify-between flex-1 gap-1">
                    <input
                        disabled={true}
                        className="py-3 px-2 border rounded-md flex-1 text-gray-500"
                        value={`${baseUrl}/${url?.short}`}
                    />
                    <Button type="button" className="text-white py-3 h-full bg-black/90">
                        <Clipboard color="#ffffff"/>
                    </Button>
                </div>
            </div>
            <div className="flex gap-1 flex-col">
                <SubmitButton type="submit" className="py-6 px-2 font-bold text-xl">
                    Update Url
                </SubmitButton>
            </div>
        </form>
    );
}
