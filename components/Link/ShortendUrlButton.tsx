import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import React from "react";
import UrlShortenerForm from "@/components/Link/ShortendUrl";


export default function ShortendUrlButton(){
    return (
        <Dialog>
            <DialogTrigger asChild={true}>
                <Button>Shortened Url</Button>
            </DialogTrigger>
            <DialogContent>
                <UrlShortenerForm showBorder={false}/>
            </DialogContent>
        </Dialog>
    )
}