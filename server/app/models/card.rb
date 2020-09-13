class Card < ApplicationRecord
  validates(
    :name,
    :image_url,
    :image_url_hi_res,
    :artist,
    :number,
    :rarity,
    :series,
    :set,
    :set_code,
    presence: true
  )
end
