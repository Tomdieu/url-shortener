"use client"
import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {usePathname} from "next/navigation";

export default function DashboardBreadCumb(){

    const path = usePathname();
    const sections = path.split("/")

    const buildUrl = (index:number)=>{
        const _path = [];
        for(let i=0;i<=index;i++){
            _path.push(sections[i])
        }

        return _path.join("/")
    }

    return (
        <Breadcrumbs className={"mt-3"}>
            {sections.map((section,index)=>{
                return (<BreadcrumbItem className={"py-3 text-xl font-poppins font-bold"} href={buildUrl(index)} key={section}>{section}</BreadcrumbItem>)
            })}
        </Breadcrumbs>
    )

}