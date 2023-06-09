export type UserInfo = {
  id: string
  userName: string
  email: string
  firstName: string
  lastName: string
  bio: string
  image: string
  tk: string
  ig: string
}

export interface AffiliateLink {
  id: number
  content?: string
  title: string
  description?: string
  image: string
  brand: Brand
  link?: Link
}

export interface Link {
  id: number
  createdAt: Date
  clicks: string
  orders: string
  earned: string
  productLink: string
}

export interface CreateLinkParams {
  userId: string
  productLink: string
}
// for creating a new affiliate link
export interface Product {
  image: string
  productLink: string
  title: string
  description: string
  brandName: string
}

export interface Brand {
  name: string
  commission: number
}
