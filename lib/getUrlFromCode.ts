"use server"
export const getUrlFromCode = (shorten:string):string =>{
    return `${process.env.URL}/${shorten}`
}