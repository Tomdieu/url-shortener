"use client"
import {Link} from "@prisma/client"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"

import {Input} from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {linkSchema, LinkType} from "@/schema/link.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-hot-toast";
import {update} from "@/lib/actions/links";
import SubmitButton from "@/components/SubmitButton";
import {useRouter}  from "next/navigation";


type UpdateUrlProps = {
    link: Link
}

export default function UpdateUrl({link}: UpdateUrlProps) {

    const router = useRouter()

    const form = useForm<LinkType>({
        resolver: zodResolver(linkSchema), defaultValues: {
            original: link.original
        }, mode: "onBlur"
    })

    const onSubmit = async (value: LinkType) => {

        toast.success("Url Updated")
        const url = await update(link.short, value);
        if (url?.success) {
            toast.success("Link Updated")
            setTimeout(()=>{
                router.refresh()
            },1000)
        }
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
                        <FormField control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Original</FormLabel>
                                <FormControl>
                                    <Input autoCorrect={"off"} type={"url"} placeholder={"Enter a valid url"} {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Please Provide a valid url
                                </FormDescription>
                                <FormMessage className={"font-poppins"}/>
                            </FormItem>
                        )} name={"original"}/>
                        <FormItem>
                            <FormLabel>Shortend</FormLabel>
                            <FormControl>
                                <div className={"flex items-center"}>
                                    <Input className={"w-3/4 border-none"} value={process.env.NEXT_PUBLIC_URL+"/"} disabled onChange={()=>{}}/>
                                    <Input className={"w-1/4"} onChange={()=>{}} value={link.short}/>
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