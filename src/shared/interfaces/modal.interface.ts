import type { modalType } from '../types/types'

export interface modalInterface {
  type: modalType | null
  title: string | null
  message: string | null
  id?: {
    idUser?: string
    idApi?: string
  }
}


export interface updateModalInterface {
  type: modalType | null
  title: string
  message: string
  id?: { idUser?: string; idApi?: string }
}