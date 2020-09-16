export interface Card {
  attributes: Stats
}

export interface Stats {
  name: string
  image_url: string
  image_url_hi_res: string
  subtype: string
  supertype: string
  artist: string
  number: string
  rarity: string
  series: string
  set: string
  set_code: string
  national_pokedex_number?: number
  hp?: string
  converted_retreat_cost?: number
  evolves_from?: string
}
