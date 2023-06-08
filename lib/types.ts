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
  id: string
  link: string
  createdAt: Date
  clicks: number
  orders: number
  earned: number
  content?: string
  productLink: string
  title: string
  description?: string
  image: string
  brand: Brand
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
