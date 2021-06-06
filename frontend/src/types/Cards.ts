export interface Card {
  attributes: Stats
}

export interface Stats {
  name: string
  subtype: string
  supertype: string
  artist: string
  number: string
  rarity: string
  series: string
  set_code: string
  national_pokedex_number?: number
  hp?: number
  converted_retreat_cost?: number
  evolves_from?: string
}
