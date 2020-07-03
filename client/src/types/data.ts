export type Model<M> = { id: number } & M

export type Click = {
  clickTime: number
}

export type ClickWindow = {
  totalClicks: number
  windowStartTime: number
  windowEndTime: number
}
