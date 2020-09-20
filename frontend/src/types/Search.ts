export interface Search {
  toggle: boolean
  value: FieldValue
  field: FieldType
}

export type FieldValue = {
  [key in FieldType]?: string
}

export type FieldType = 'name' | 'hp' | 'rarity'
