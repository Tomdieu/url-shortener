"use client"

import { Link } from '@prisma/client';
import { redirect } from 'next/navigation';
import {useQuery} from "@tanstack/react-query";

type Props = {
  params: { linkCode: string }
}

const fetchLink = (shortCode: string): Promise<Link> => {
  return new Promise((resolve, reject) => {
    fetch(`/api/links/${shortCode}`)
      .then((res) => res.json() as unknown as Link)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


const LinkDetail =  ({ params }: Props) => {


  const {data,isLoading} = useQuery({
    queryKey:["link-preview",params.linkCode],
    queryFn:()=>{
      return  fetchLink(params.linkCode);
    },
  })

  console.log({data})

  if(isLoading){
    return <div>Loading...</div>
  }
  // if(data){
  //   // return data.original
  //   return redirect(data.original)

  // }
}


export default LinkDetail;