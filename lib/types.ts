export type UserInfo = {
  id: string
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
  product: Product
  clicks: number
  orders: number
  earned: number
  content?: string
}

export interface Product {
  link: string
  tittle: string
  description: string
  image: string
  brand: Brand
}

export interface Brand {
  name: string
  commission: number
}
