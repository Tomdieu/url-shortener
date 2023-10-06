import { Link } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params: { linkCode: string }
}

const fetchLink = (shortCode:string) :Promise<Link>=> {
    return new Promise((resolve, reject) => {
      fetch(process.env.URL + `/api/links/${shortCode}`)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  

const LinkDetail = async ({params}: Props) => {
  const linkDetail = await fetchLink(params.linkCode);
  if(linkDetail){
    redirect(linkDetail.original);
  }
  
}

export default LinkDetail 