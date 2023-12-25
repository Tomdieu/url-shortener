"use client"
import { Link } from "@prisma/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { linkSchema, LinkType } from "@/schema/link.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { update } from "@/lib/actions/links";
import SubmitButton from "@/components/SubmitButton";
import { useRouter } from "next/navigation";
import { Copy, Facebook, LinkedinIcon, TwitterIcon, } from "lucide-react"
import { Button } from "../ui/button"

import {FacebookShareButton,WhatsappShareButton,LinkedinShareButton,TwitterShareButton } from 'react-share';
import { useEffect } from "react"


type UpdateUrlProps = {
    link: Link
}

export default function UpdateUrl({ link }: UpdateUrlProps) {

    const router = useRouter()

    const urlToShare = process.env.NEXT_PUBLIC_URL + "/" + link.short;

    const form = useForm<LinkType>({
        resolver: zodResolver(linkSchema), defaultValues: {
            original: link.original
        }, mode: "onBlur"
    })

    // useEffect(() => {
    //     window.addEventListener('click', (event) => {
    //       // Don't open share popup on other buttons
    //       if (event.target.closest('.share-button')) return;
    //       window.removeEventListener('click', this);
    //     });
    //   }, []);

      

    const onSubmit = async (value: LinkType) => {

        toast.success("Url Updated")
        const url = await update(link.short, value);
        if (url?.success) {
            toast.success("Link Updated")
            setTimeout(() => {
                router.refresh()
            }, 1000)
        }
    }

    const copyLinkToClipBoard = () => {
        const urlToCopy = process.env.NEXT_PUBLIC_URL + "/" + link.short
        navigator.clipboard.writeText(urlToCopy)
        toast.success("Link Copied")
    }

    return (
        <Form {...form}>
            <form autoCorrect={"off"} onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8 font-poppins flex-1"}>
                <Card className={"rounded-sm"}>
                    <CardHeader>
                        <CardTitle>Update The Url</CardTitle>
                        <CardDescription className={"font-poppins"}>Fill the information&apos;s below</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                    <Input autoCorrect={"off"} type={"url"} placeholder={"Enter a valid url"} {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please Provide a valid url
                                </FormDescription>
                                <FormMessage className={"font-poppins"} />
                            </FormItem>
                        )} name={"original"} />
                        <FormItem>
                            <FormLabel>Shortend Url</FormLabel>
                            <FormControl>
                                <div className={"flex items-center"}>
                                    <Input className={"w-3/4"} value={process.env.NEXT_PUBLIC_URL + "/" + link.short} disabled onChange={() => { }} />
                                    <div className="flex space-x-2 share-buttons">
                                        <Button size="icon" variant="ghost" type="button" onClick={copyLinkToClipBoard}>
                                            <Copy className="h-4 w-4" />
                                            <span className="sr-only">Copy shortened URL</span>
                                        </Button>
                                        <FacebookShareButton url={urlToShare}>
                                        <Facebook className="h-4 w-4" />
                                            <span className="sr-only">Share on Facebook</span>
                                        </FacebookShareButton>
                                        <TwitterShareButton url={urlToShare}>
                                        <TwitterIcon className="h-4 w-4" />
                                            <span className="sr-only">Share on Twitter</span>
                                        </TwitterShareButton>
                                        
                                        <LinkedinShareButton url={urlToShare}>
                                        <LinkedinIcon className="h-4 w-4" />
                                            <span className="sr-only">Share on Linkedin</span>
                                        </LinkedinShareButton>
                                        
                                    </div>
                                </div>

                            </FormControl>
                        </FormItem>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton className={"w-full"} type={"submit"}>Update</SubmitButton>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}