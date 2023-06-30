export const orderListCompairFunction = (orderArray: number[]) => {
  return (a: any, b: any) => {
    const aIndex = orderArray.indexOf(a.id)
    const bIndex = orderArray.indexOf(b.id)
    if (aIndex === -1) {
      return 1
    }
    if (bIndex === -1) {
      return -1
    }
    return aIndex - bIndex
  }
}
