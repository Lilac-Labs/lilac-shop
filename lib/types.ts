import {
  Collection,
  SocialMedia,
  User,
  UserProfile as _UserProfile,
} from '@prisma/client'

export interface UserInfo extends User {
  // use image from userProfile
  // image from User is from gogole privder and will not be updated
  userProfile?: UserProfile
}

export interface UserProfile extends _UserProfile {
  socialMedias: SocialMedia[]
  ig: string
  tk: string
}

export interface AffiliateLink {
  id: number
  collection?: Collection
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
  uuid: string
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
