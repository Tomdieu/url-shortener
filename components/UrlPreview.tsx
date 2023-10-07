"use client"
import React, { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { Divider, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Iframe from "react-iframe";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Link from "next/link"
interface Props {
  url: string;
}

interface MetaDataType {
  title: string;
  description?: string;
  image?: string;
}

const UrlPreview: React.FC<Props> = ({ url }) => {
  const [metadata, setMetadata] = useState<MetaDataType | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(`/api/preview?url=${url}`);
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchMetadata().catch((error) => {
      console.error('Error fetching metadata:', error);
    });
  }, [url]);

  return (
    <div className="max-w-md mx-auto">
      {metadata === null ? (
        <div className="p-0 border rounded-sm flex flex-col space-y-2 space-x-1">
          <Skeleton className="bg-gray-300 h-20 w-full" />
          <Divider className="my-2" />
          <div className="flex flex-col space-y-0.5">
            <Skeleton className="bg-gray-300 h-5 w-full" />
            <Skeleton className="bg-gray-300 h-8 w-full" />
          </div>
        </div>
      ) : (
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden my-3">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {metadata.image ? (
              <CardHeader className="justify-between py-3 items-center">
                {/* <AspectRatio ratio={16 / 9}>
                </AspectRatio> */}
                <Image width={500} src={metadata.image} height={500} alt={metadata.title} className="w-full h-[300px]" />
              </CardHeader>
            ) : (
              <CardBody className="px-3 py-0 text-small text-default-400">
                <Iframe
                  url={url}
                  allowFullScreen
                  className="w-full"
                />
                {/* <iframe src={url} frameBorder="0" width="100%" height="300px" /> */}
              </CardBody>
            )}
            <Divider />
            <CardBody className="px-3 py-1 text-small">
              <h5 className="text-xl font-bold">{metadata.title}</h5>
              <p className="text-gray-600">{metadata.description}</p>
            </CardBody>
          </Link>
        </Card>
      )}
    </div>
  );
};

export default UrlPreview;
