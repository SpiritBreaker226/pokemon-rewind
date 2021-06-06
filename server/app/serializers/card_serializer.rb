class CardSerializer
  include JSONAPI::Serializer

  attributes(
    :name,
    :national_pokedex_number,
    :subtype,
    :supertype,
    :hp,
    :artist,
    :converted_retreat_cost,
    :evolves_from,
    :number,
    :rarity,
    :series,
    :set_code
  )

  # use rails cache with a separate namespace and fixed expiry
  cache_options store: Rails.cache, namespace: 'jsonapi', expires_in: 1.hour
end
