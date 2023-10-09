"use client"
import React, { useState } from 'react'

import { useEffect } from 'react';
import QRCode from 'qrcode';

import {cn} from "@/lib/utils"
import { Button } from '../ui/button';

type QrcodeProps = {
    url:string,
    className?:string,
    containerClassName?:string,
    buttonClassName?:string,
    isDownloadable?:boolean
}

const Qrcode = ({url,className,containerClassName,buttonClassName,isDownloadable=false}: QrcodeProps) => {
    useEffect(() => {
        // Generate the QR code
        QRCode.toCanvas(document.getElementById('canvas'), url, function (error) {
            if (error) console.error(error);
        });
    }, [url]);
    const downloadQRCode = () => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (canvas) {
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = `${url}-qrcode.png`;
            link.click();
        }
      };
    return (
        <div className={cn("flex flex-1 flex-col gap-2",containerClassName)}>
            <canvas id='canvas' className={cn("flex-1 h-full w-full",className)} style={{ width: '100%' ,height:'100%'}}></canvas>
            {isDownloadable && (
                <Button className={cn("h-full w-full py-3",buttonClassName)} onClick={downloadQRCode}>Download QR Code</Button>
            )}
        </div>
    )
}

export default Qrcode