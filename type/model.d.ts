interface ModelResponse {
  id: number
  name: string
  type: ModelType
  description: string
}

type ModelType = 'M' | 'P' | 'I'
