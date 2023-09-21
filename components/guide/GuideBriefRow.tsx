export interface ReleaseAmount {
  latestRelease: Date
  averageCycle: number
}

export interface PriceAmount {
  latestTradePrice: number
  latestRegularPrice: number
}

export const getReleaseAmountFromHistories = (
  histories: {
    date: Date
    info: string
  }[]
): ReleaseAmount => {
  const releases: number[] = histories
    .filter((history) => history.info === 'release')
    .map((history) => new Date(history.date).getTime())

  const { cycles }: { cycles: number[] } = releases.reduce(
    ({ last, cycles }: { last?: number; cycles: number[] }, cur: number) => ({
      last: cur,
      cycles: last ? [...cycles, Math.floor((last - cur) / (1000 * 60 * 60 * 24))] : cycles,
    }),
    { last: undefined, cycles: [] }
  )

  const averageCycle: number = Math.floor(cycles.reduce((a, b) => a + b, 0) / cycles.length)
  const latestRelease: Date = new Date(Math.max(...releases))
  return {
    latestRelease,
    averageCycle,
  }
}

const GuideBriefRow = ({ model }: { model: MainItemResponse }) => {
  return <></>
}

export default GuideBriefRow
