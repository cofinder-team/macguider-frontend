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

interface MacModel extends Model {
  data: MacItem[]
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

interface MacItem extends Item {
  options: MacItemDetails[]
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

interface MacItemDetails extends ItemDetails {
  ram: string
  ssd: string
}

interface IpadItemDetails extends ItemDetails {
  connectivity: 'wifi' | 'cellular'
  ssd: string
}
