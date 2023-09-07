interface ModelResponse {
  id: number
  name: string
  type: ModelType
}

type ModelType = 'M' | 'P' | 'I'
