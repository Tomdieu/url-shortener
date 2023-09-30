import { Link } from "@prisma/client";

export interface MetaDataType {
  title: string;
  description?: string;
  image?: string;
}

export type CreateLink = {
  original: string;
};

export interface LinkType extends Omit<Link, "createAt" | "updatedAt"> {}
