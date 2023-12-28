"use client"
import {linkSchema, LinkType} from '@/schema/link.schema';
import {useRouter} from 'next/navigation';
import React from 'react';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {create} from "@/lib/actions/links";
import SubmitButton from "@/components/SubmitButton";
import {toast} from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";


type UrlShortenerFormProps = {
    showBorder?:boolean
}


const UrlShortenerForm: React.FC<UrlShortenerFormProps> = ({showBorder=true}:UrlShortenerFormProps) => {

    const form  = useForm<LinkType>({resolver:zodResolver(linkSchema),mode:"onBlur"})
    const router = useRouter()
    const queryClient = useQueryClient()
    const {mutate,isPending} = useMutation({
        mutationKey:["shortend-url"],
        mutationFn:async (value:LinkType)=>{
            return create(value)
        }
    })
    const onSubmit = async (value:LinkType) => {
        // const url =await create(value)
        mutate(value,{
            onSuccess:(res)=>{
                if(res.success){
                    queryClient.invalidateQueries({queryKey:["links"],exact:true})
                    // router.refresh()
                    toast.success("Url Shorten Successfully")
                    router.push("/dashboard/links/"+res?.data?.short)
                }else{

                    toast.error("Something went wrong")
                }
                

            }
        })
        // if(url){
        //     setLoading(true)
        //     router.refresh()
        //     toast.success("Url Shorten Successfully")
        //     setTimeout(()=>{
        //         router.push("/dashboard/links/")
        //     },2000)
        // }
    }

    return (
        <Form {...form}>
            <form  onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8 font-poppins"}>
                <Card className={showBorder?"":"border-none shadow-none"}>
                    <CardHeader>
                        <CardTitle>Shortened  Url</CardTitle>
                        <CardDescription className={"font-poppins"}>Enter the url you want to shortened</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField control={form.control} render={({field})=>(
                            <FormItem>
                                <FormLabel className={"font-bold"}>Url</FormLabel>
                                <FormControl>
                                    <Input placeholder={"Enter a valid url"} {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Please Provide a valid url
                                </FormDescription>
                                <FormMessage className={"font-poppins"}/>
                            </FormItem>
                        )} name={"original"} />
                    </CardContent>
                    <CardFooter>
                        <SubmitButton isLoading={isPending} className={"w-full"} type={"submit"}>Shortend Url</SubmitButton>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )

};

export default UrlShortenerForm;
