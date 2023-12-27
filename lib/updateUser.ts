"use server"

import getCurrentUser from "@/lib/getCurrentUser";
import bcrypt from "bcrypt";

type UpdateUserType = {
    name:string;
    email:string;
    password?:string;
}

export default async function updateUser({name,password,email}:UpdateUserType){
    const user = await getCurrentUser()

    if(user){

        if(password){
            const hashedPassword = await bcrypt.hash(password, 12) || user.hashedPassword;

            await prisma?.user.update({
                where:{
                    id:user.id
                },
                data:{
                    name:name,
                    email:email,
                    hashedPassword:hashedPassword
                }
            })
        }
        else{
            await prisma?.user.update({
                where:{
                    id:user.id
                },
                data:{
                    name:name || user.name,
                    email:email || user.email,
                }
            })
        }

    }

}