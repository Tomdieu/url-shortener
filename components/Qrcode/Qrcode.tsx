"use client"
import React from 'react'

import { useEffect } from 'react';
import QRCode from 'qrcode';

import {cn} from "@/lib/utils"

type QrcodeProps = {
    url:string,
    className?:string
}

const Qrcode = ({url,className}: QrcodeProps) => {
    useEffect(() => {
        // Generate the QR code
        QRCode.toCanvas(document.getElementById('canvas'), url, function (error) {
            if (error) console.error(error);
        });
    }, [url]);

    return <canvas id='canvas' className={cn("h-full w-full",className)}></canvas>
}

export default Qrcode