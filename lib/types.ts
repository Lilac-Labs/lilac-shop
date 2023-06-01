export type UserInfo = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
    image: string;
    tk: string;
    ig: string;
}


export interface AffiliateLink {
    id: string;
    url: string;
    createdAt: Date;
    product: Product;
    clicks: number;
    orders: number;
    earned: number;
    content?: string;
}

export interface Product {
    tittle: string;
    description: string;
    link: string;
    commission: number;
    image: string;
}