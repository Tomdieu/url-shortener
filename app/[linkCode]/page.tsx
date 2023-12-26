"use client"

import { Link } from '@prisma/client';
import { redirect } from 'next/navigation';
import {useQuery} from "@tanstack/react-query";
import { isMobile, isTablet } from 'react-device-detect';

type Props = {
  params: { linkCode: string }
}

const fetchLink = (shortCode: string,referrer:string,deviceType:string): Promise<Link> => {
  return new Promise((resolve, reject) => {
    fetch(`/api/links/${shortCode}?referrer=${encodeURIComponent(referrer)}&deviceType=${deviceType}`,{next:{revalidate:600}})
      .then((res) => res.json() as unknown as Link)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

function getDeviceType() {
  if (isMobile) {
    return 'Mobile';
  } else if (isTablet) {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
}


const LinkDetail =  ({ params }: Props) => {
  const deviceType = getDeviceType()
  const {data,isLoading,error,isError} = useQuery({
    queryKey:["link-preview",params.linkCode],
    queryFn:()=>{
      return  fetchLink(params.linkCode,document.referrer || "Direct",deviceType);
    },
  })



  if(isLoading){
    return <div>Loading...</div>
  }

  if(isError){
    return (<div className="text">Error : {error.message}</div>)
  }
  // if(data && data.original){
  //   return redirect(data.original)
  //
  // }
}


export default LinkDetail;