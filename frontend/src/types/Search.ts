export interface Search {
  toggle: boolean
  value: FieldValue
  field: FieldType
}

export type FieldValue = {
  [key in FieldType]?: string
}

export type FieldType = 'name' | 'hp' | 'rarity'

export type HTMLSelectElement = { name?: string | undefined; value: unknown }

export interface SearchParamsToServer {
  value: FieldValue
  page: number
}
