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

  deals = await Promise.all(
    deals.map(async (deal) => {
      const model = await getModel(deal.itemId, deal.type)

      return {
        ...deal,
        model,
        avgPrice: deal.average,
      }
    })
  )

  return deals
}

export async function getDealRaw(id) {
  const response = await axiosInstanceV2.get(`/deal/raw/${id}`)
  return response.data
}

export async function getDeal(id) {
  const response = await axiosInstanceV2.get(`/deal/${id}`)
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

export async function reportDeal(id, payload) {
  const response = await axiosInstanceV2.put(`/deal/${id}`, payload)
  return response.data
}

export async function getItemPrice(type, itemId, unused) {
  const response = await axiosInstanceV2.get(`/price/deal/${type}/${itemId}?unused=${unused}`)
  return response.data
}
