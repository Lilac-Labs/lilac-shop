import { faker } from '@faker-js/faker'
import { AffiliateLink, Product } from '@/lib/types'

/**
 * This file is used to generate fake data for the table for the purpose of development.
 */

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newProduct = (): Product => {
  return {
    tittle: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    link: faker.internet.url(),
    commission: faker.number.float(0.3),
    image: faker.image.urlLoremFlickr({ category: 'fashion' }),
  }
}

const newAffiliateLink = (): AffiliateLink => {
  return {
    id: faker.string.uuid(),
    url: faker.internet.url(),
    createdAt: faker.date.past(),
    product: newProduct(),
    clicks: faker.number.int(2000),
    orders: faker.number.int(100),
    earned: faker.number.float(10000),
    content: faker.internet.url(),
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): AffiliateLink[] => {
    const len = lens[depth]!
    return range(len).map((d): AffiliateLink => {
      return {
        ...newAffiliateLink(),
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
