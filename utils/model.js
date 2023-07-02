import optionsIpad from '@/data/options/ipad'
import optionsMac from '@/data/options/mac'

export const getAppleProductInfo = (id, optionId, category) => {
  const target = category === 'mac' ? optionsMac : optionsIpad

  const product = target
    .find((e) => e.id === id)
    ?.data.find((spec) => spec.options.map((option) => option.id).includes(optionId))

  return product
}
