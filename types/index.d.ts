export type Link = {
    id: number,
    original: string,
    short: string,
    ownerId: string,
    createdAt: Date,
    updatedAt: Date 
}

export interface MetaDataType {
    title: string;
    description?: string;
    image?: string;
}

export type CreateLink = {
    original: string;
};

export type Url = {
    title: string;
    description: string;
    image?: string
}

export interface LinkType extends Omit<Link, "createAt" | "updatedAt"> {
}


