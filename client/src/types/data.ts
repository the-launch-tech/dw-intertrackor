export type Model<M> = { id: number } & M

export type Click = {
  click_time: number
}

export type ClickWindow = {
  total_clicks: number
  window_start_time: number
  window_end_time: number
}

export type ModifiedClickWindow = {
  total_clicks: string
  window_start_time: string
  window_end_time: string
}

export type CamelModifiedClickWindow = {
  totalClicks: string
  windowStartTime: string
  windowEndTime: string
}
