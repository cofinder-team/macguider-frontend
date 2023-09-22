interface Category {
  name: string
  code?: ModelType
}

const categories: Category[] = [
  {
    name: 'iPhone',
    code: undefined,
  },
  {
    name: 'iPad',
    code: 'P',
  },
  {
    name: 'Mac',
    code: 'M',
  },
  {
    name: 'Apple Watch',
    code: undefined,
  },
  {
    name: 'Music',
    code: undefined,
  },
]

export { type Category, categories }
