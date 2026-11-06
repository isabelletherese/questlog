import type { Status } from './status'

export type Game = {
  id: string
  title: string
  platform: string
  status: Status
  rating?: number
  coverUrl?: string
  notes?: string
}

export type NewGame = {
  title: string
  platform: string
  status: Status
}
