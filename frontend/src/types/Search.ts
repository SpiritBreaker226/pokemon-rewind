export interface Search {
  toggle: boolean
  value: string
  field: FieldType
}

export type FieldType = 'name' | 'hp' | 'rarity'
