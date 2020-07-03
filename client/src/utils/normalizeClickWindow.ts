import { CamelModifiedClickWindow, ClickWindow } from '../types'

export function normalizeClickWindow(clickWindow: CamelModifiedClickWindow): ClickWindow {
  return {
    total_clicks: parseInt(clickWindow.totalClicks),
    window_start_time: parseInt(clickWindow.windowStartTime),
    window_end_time: parseInt(clickWindow.windowEndTime),
  }
}
