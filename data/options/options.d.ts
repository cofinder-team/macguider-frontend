interface Model {
  id: string
  model: string
  releasedDateHistory: string[]
  desc: string
  href: string
  price: number
  imgSrc: string
  data: Item[]
}

interface IpadModel extends Model {
  data: IpadItem[]
}

interface Item {
  title: string
  alias: string
  imgSrc: string
  href: string
  isDeprecated?: boolean // 단종 여부
  releasedDate?: string
  colors: string[]
  specs: any
  options: ItemDetails[]
}
interface IpadItem extends Item {
  summaries: string[]
  options: IpadItemDetails[]
  size: number
}

interface ItemDetails {
  id: number
  price?: number
}
interface IpadItemDetails extends ItemDetails {
  connectivity: 'wifi' | 'cellular'
  ssd: string
}
