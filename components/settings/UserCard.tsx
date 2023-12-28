"use client"
import {useForm} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";
import {userSchema, UserType} from "@/schema/user.schema";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {useMutation} from "@tanstack/react-query";
import {User} from "@prisma/client";
import SubmitButton from "@/components/SubmitButton";
// import {wait} from "next/dist/lib/wait";
import {toast} from "react-hot-toast";
import updateUser from "@/lib/updateUser";

type UserCardProps = {
    user: User
}

export default function UserCard({user}: UserCardProps) {


    const form = useForm<UserType>({
        resolver: zodResolver(userSchema), defaultValues: {
            name: user.name!,
            email: user.email!,
        }, mode: "onBlur"
    })

    const {data, mutate, isPending, isSuccess} = useMutation({
        mutationKey: ["update-user"],
        mutationFn: async (value: UserType) => {
            return updateUser({name:value.name!,email:value.email,password:value.password})
        }
    })

    const onSubmit = async (value: UserType) => {
        mutate(value, {
            onSuccess: () => {
                toast.success("Profile Updated", {position: "bottom-center"})
            }
        })
    }


    return (
        <Form {...form}>
            <form autoCorrect={"off"} onSubmit={form.handleSubmit(onSubmit)}
                  className={"space-y-8 font-poppins flex-1"}>
                <Card className={"rounded-sm"}>
                    <CardHeader>
                        <CardTitle>User Profile</CardTitle>
                        <CardDescription className={"font-poppins"}></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input autoCorrect={"off"} type={"text"} placeholder={"username"} {...field} />
                                </FormControl>
                                <FormDescription>

                                </FormDescription>
                                <FormMessage className={"font-poppins"}/>
                            </FormItem>
                        )} name={"name"}/>
                        <FormField control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled={Boolean(!user.hashedPassword)} autoCorrect={"off"} type={"email"}
                                           placeholder={"email"} {...field} />
                                </FormControl>
                                <FormDescription>

                                </FormDescription>
                                <FormMessage className={"font-poppins"}/>
                            </FormItem>
                        )} name={"email"}/>

                        <FormField control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input disabled={Boolean(!user.hashedPassword)}  autoCorrect={"off"} type={"password"} placeholder={"Password"} {...field} />
                                </FormControl>
                                <FormDescription>

                                </FormDescription>
                                <FormMessage className={"font-poppins"}/>
                            </FormItem>
                        )} name={"password"}/>
                        <FormField control={form.control} render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input disabled={Boolean(!user.hashedPassword)} autoCorrect={"off"} type={"password"}
                                           placeholder={"Confirm Password"} {...field} />
                                </FormControl>
                                <FormDescription>

                                </FormDescription>
                                <FormMessage className={"font-poppins"}/>
                            </FormItem>
                        )} name={"confirmPassword"}/>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton isLoading={isPending} className={"w-full"} type={"submit"}>Update</SubmitButton>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}