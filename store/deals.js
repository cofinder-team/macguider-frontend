import optionsIpad from '@/data/options/ipad'
import optionsMac from '@/data/options/mac'
import { isDevelopment } from 'utils/env'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
export const filters = [
  {
    id: 'sort',
    name: '정렬',
    options: [
      { value: 'date', label: '최신 순' },
      { value: 'discount', label: '할인 순' },
    ],
    type: 'single',
  },
  {
    id: 'source',
    name: '중고 플랫폼',
    options: [
      { value: '', label: '전체' },
      { value: '중고나라', label: '중고나라' },
      { value: '번개장터', label: '번개장터' },
    ],
    type: 'single',
  },
  {
    id: 'model',
    name: '제품',
    options: [
      {
        value: [],
        label: '전체',
      },
      ...optionsMac
        .map((option) => ({
          value: ['M', option.id],
          label: option.model,
        }))
        .concat(
          optionsIpad.map((option) => ({
            value: ['P', option.id],
            label: option.model,
          }))
        ),
    ],
    type: 'single',
  },
]

export const store = (set) => ({
  filters: filters.map((filter) => ({
    ...filter,
    options: [filter.options[0]],
  })),
  setFilters: (filters) => set({ filters }),
})

const useDealsStore = create(isDevelopment ? devtools(store) : store)

export default useDealsStore
