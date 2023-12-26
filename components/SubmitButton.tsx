"use client"
import {Button, ButtonProps} from "@/components/ui/button";
import {cn} from "@/lib/utils";

import {useFormStatus} from 'react-dom'
import {ReloadIcon} from "@radix-ui/react-icons";
import {Loader2} from "lucide-react";

type SubmitButtonProps = {
    className?: string;
    isLoading?: boolean;
} & ButtonProps;

export default function SubmitButton(props: SubmitButtonProps) {
    const {pending} = useFormStatus()
    const {isLoading, disabled, className, children, ...others} = props;

    return <Button  aria-disabled={pending} disabled={isLoading || disabled}
                   className={cn("flex gap-2", className)} {...others}>
        {(pending || isLoading) && (

            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {children}
    </Button>
}