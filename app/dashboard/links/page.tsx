import LinkTables from "@/components/Link/LinkTables";
import getCurrentUser from "@/lib/getCurrentUser";
import React from "react";
import prisma from "@/lib/prismadb";


type Props = {};

const fetchUsersLink = async () => {
  const user = await getCurrentUser();
  const links = await prisma.link.findMany({ where: { ownerId: user?.id },include:{clicks:true} });

  return links || [];
}

export default async function Links(props: Props) {

  const links = await fetchUsersLink();

  return <div className="flex-1 flex flex-col h-full px-2 py-3">
    <h5 className="text-2xl font-bold">Links</h5>
    <LinkTables links={links} />
  </div>;
};

