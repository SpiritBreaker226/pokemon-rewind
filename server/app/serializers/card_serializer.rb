class CardSerializer
  include JSONAPI::Serializer

  attributes(
    :name,
    :subtype,
    :supertype,
    :artist,
    :number,
    :rarity,
    :series,
    :set,
    :set_code,
    :national_pokedex_number,
    :hp,
    :converted_retreat_cost,
    :evolves_from
  )

  # use rails cache with a separate namespace and fixed expiry
  cache_options store: Rails.cache, namespace: 'jsonapi', expires_in: 1.hour
end
