import optionsIpad from '@/data/options/ipad'
import optionsMac from '@/data/options/mac'
import { axiosInstanceV2 } from '@/lib/axios'

export async function getDeals() {
  let { data: deals } = await axiosInstanceV2.get(`/deal`)

  const getModel = async (newItemId, itemType) => {
    const res = await axiosInstanceV2.get(`/item/${itemType}/${newItemId}`)
    const { model: itemId, option: optionId, type, details } = res.data
    let target

    if (type === 'M') {
      // 맥일 경우
      target = optionsMac
    } else {
      // 아이패드일 경우
      target = optionsIpad
    }

    const name = target.find((device) => device.id == itemId).model
    return {
      itemId,
      optionId,
      ...details,
      name,
      type,
    }
  }

  const getAvgPrice = async (newItemId, itemType, unused) => {
    const res = await axiosInstanceV2.get(`/price/deal/${itemType}/${newItemId}`, {
      params: {
        unused,
      },
    })

    const avgPrice = res.data.average

    return avgPrice
  }

  deals = await Promise.all(
    deals.map(async (deal) => {
      const model = await getModel(deal.itemId, deal.type)
      const avgPrice = await getAvgPrice(deal.itemId, deal.type, deal.unused)

      return {
        ...deal,
        model,
        avgPrice,
      }
    })
  )

  return deals
}

export async function getDealRaw(id) {
  const response = await axiosInstanceV2.get(`/deal/raw/${id}`)
  return response.data
}

export async function getItems() {
  const response = await axiosInstanceV2.get(`/item`)
  return response.data
}

export async function convertDealFromRaw(id, payload) {
  const response = await axiosInstanceV2.put(`/deal/raw/${id}`, payload)
  return response.data
}
