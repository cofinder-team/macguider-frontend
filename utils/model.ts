import optionsIpad from '@/data/options/ipad'
import optionsMac from '@/data/options/mac'

export const getAppleProductInfo = (id: string, optionId: number, category: ModelType): Item => {
  const target: Model[] = category === 'M' ? optionsMac : optionsIpad

  const product = target
    .find((e) => e.id === id)
    ?.data.find((spec) => spec.options.map((option) => option.id).includes(optionId)) as Item

  return product
}
