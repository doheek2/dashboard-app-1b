import BigNumber from 'bignumber.js'
import { cloneDeep, groupBy } from 'lodash'
import data from 'data/wanted_FE-media-channel-data-set.json'

interface IProps {
  startDate: string
  endDate: string
}

type TData = Record<
  string,
  {
    click: number
    convValue: number
    cost: number
    cpa: number
    cpc: number
    ctr: number
    cvr: number
    imp: number
    roas: number
  }
>

const COMPANIES = ['facebook', 'google', 'kakao', 'naver']

export const getMediaData = (recoilDate: IProps) => {
  const dataStructure = {
    click: 0,
    convValue: 0,
    cost: 0,
    cpa: 0,
    cpc: 0,
    ctr: 0,
    cvr: 0,
    imp: 0,
    roas: 0,
  }
  const groupByData = groupBy(data, 'channel')

  const filterData: TData = {
    facebook: cloneDeep(dataStructure),
    google: cloneDeep(dataStructure),
    kakao: cloneDeep(dataStructure),
    naver: cloneDeep(dataStructure),
  }

  const totalData: TData = {
    all: dataStructure,
  }

  COMPANIES.forEach((company) => {
    groupByData[company].forEach((v) => {
      const selectDate = new Date(v.date)
      const startDate = new Date(recoilDate.startDate)
      const endDate = new Date(recoilDate.endDate)
      const target = filterData[company]

      if (startDate <= selectDate && selectDate <= endDate) {
        target.click = new BigNumber(target.click).plus(v.click).toNumber()
        target.convValue = new BigNumber(target.convValue).plus(v.convValue).toNumber()
        target.cost = new BigNumber(target.cost).plus(v.cost).toNumber()
        target.cpa = new BigNumber(target.cpa).plus(v.cpa).toNumber()
        target.cpc = new BigNumber(target.cpc).plus(v.cpc).toNumber()
        target.ctr = new BigNumber(target.ctr).plus(v.ctr).toNumber()
        target.imp = new BigNumber(target.imp).plus(v.imp).toNumber()
        target.roas = new BigNumber(target.roas).plus(v.roas).toNumber()
      }
    })
  })

  COMPANIES.forEach((item) => {
    const newFilterData = totalData.all
    const oldFilterData = filterData[item]

    newFilterData.click = new BigNumber(newFilterData.click).plus(oldFilterData.click).toNumber()
    newFilterData.convValue = new BigNumber(newFilterData.convValue).plus(oldFilterData.convValue).toNumber()
    newFilterData.cost = new BigNumber(newFilterData.cost).plus(oldFilterData.cost).toNumber()
    newFilterData.cpa = new BigNumber(newFilterData.cpa).plus(oldFilterData.cpa).toNumber()
    newFilterData.cpc = new BigNumber(newFilterData.cpc).plus(oldFilterData.cpc).toNumber()
    newFilterData.ctr = new BigNumber(newFilterData.ctr).plus(oldFilterData.ctr).toNumber()
    newFilterData.imp = new BigNumber(newFilterData.imp).plus(oldFilterData.imp).toNumber()
    newFilterData.roas = new BigNumber(newFilterData.roas).plus(oldFilterData.roas).toNumber()
  })

  const filterDataClone = cloneDeep(filterData)
  Object.assign(filterDataClone, totalData)

  return filterDataClone
}
