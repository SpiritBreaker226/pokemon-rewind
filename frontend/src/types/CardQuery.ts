import { FieldValue } from './Search'

export interface CardQuery extends FieldValue {
  page: string
  sort_by?: string
  sort_by_dir?: Direction
}

export interface Sorting {
  fieldName: string | undefined
  dir: Direction
}

export type Method = 'GET' | 'POST' | 'DELETE'

export type Direction = 'asc' | 'desc' | undefined
