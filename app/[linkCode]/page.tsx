// import LinkChart from '@/components/LinkChart';
import { getLinkChartDetail } from '@/lib/getLinkChartDetail';
import { Link } from '@prisma/client';
import { redirect } from 'next/navigation';

type Props = {
  params: { linkCode: string }
}

const fetchLink = (shortCode: string): Promise<Link> => {
  return new Promise((resolve, reject) => {
    fetch(process.env.URL + `/api/links/${shortCode}`,{cache:'no-cache'})
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


const LinkDetail = async ({ params }: Props) => {
  const linkDetail = await fetchLink(params.linkCode);
  if(linkDetail){
    redirect(linkDetail.original);
  }  
}

// const data = await getLinkChartDetail(params.linkCode,"day");
  // if(data){

  //   return <LinkChart type="bar" clickDatas={data || []} />
  // }
  // return null

export default LinkDetail;