interface ItemResponse {
  type: ModelType
  id: number
  model: ModelResponse
  option: number
  details: unknown
}

interface MacItemResponse extends ItemResponse {
  details: MacItemDetailsResponse
}

interface IpadItemResponse extends ItemResponse {
  details: IpadItemDetailsResponse
}

interface IphoneItemResponse extends ItemResponse {
  details: IphoneItemDetailsResponse
}

type ItemDetailsResponse =
  | MacItemDetailsResponse
  | IpadItemDetailsResponse
  | IphoneItemDetailsResponse

interface MacItemDetailsResponse {
  chip: string
  cpu: number
  gpu: number
  ram: number
  ssd: string
}

interface IpadItemDetailsResponse {
  storage: string
  gen: number
  cellular: boolean
  chip: string
}

interface IphoneItemDetailsResponse {
  modelSuffix: 'DEFAULT' | 'PRO' | 'PLUS' | 'PROMAX' | 'MINI'
  storage: string
}
