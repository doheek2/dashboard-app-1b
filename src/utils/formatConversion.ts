import { IAdType } from 'types/adType'
import dayjs from 'dayjs'

const titleConverter = (adType: string, title: string) => {
  if (adType === 'web') {
    return `웹광고_${title}`
  }

  return `앱광고_${title}`
}

const statusConverter = (status: string) => {
  if (status === 'active') {
    return '진행중'
  }

  return '종료됨'
}

const dateConverter = (start: string, end: string | null) => {
  const startDate = dayjs(start).format('YYYY-MM-DD')

  if (end) {
    const endDate = dayjs(end).format('YYYY-MM-DD')
    return `${startDate} (${endDate})`
  }

  return startDate
}

const budgetConverter = (money: number) => {
  let num = money
  const result = []

  const tenThousand = Math.floor(num / 10000)
  if (tenThousand > 0) {
    result.push(`${tenThousand}만`)
    num -= tenThousand * 10000
  }

  const thousand = Math.floor(num / 1000)
  if (thousand > 0) {
    result.push(`${thousand}천`)
    num -= thousand * 1000
  }

  if (num > 0) {
    result.push(`${num}`)
  }

  return result.join(' ')
}

const reportConverter = (money: number) => {
  const tenThousand = Math.floor(money / 10000)
  return `${tenThousand.toLocaleString()}만`
}

export const converter = (data: IAdType) => {
  const {
    adType,
    title,
    status,
    startDate,
    endDate,
    budget,
    report: { roas, convValue, cost },
  } = data
  return {
    title: titleConverter(adType, title),
    status: statusConverter(status),
    date: dateConverter(startDate, endDate),
    budget: budgetConverter(budget),
    roas: roas.toLocaleString(),
    convValue: reportConverter(convValue),
    cost: reportConverter(cost),
  }
}
