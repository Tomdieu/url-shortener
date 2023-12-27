import UserCard from "@/components/settings/UserCard";
import getCurrentUser from "@/lib/getCurrentUser";

export default async function ProfilePage(){
    const user = await getCurrentUser()
    return (
        <div className={"flex flex-1"}>
            <UserCard user={user!}/>
        </div>
    )
}