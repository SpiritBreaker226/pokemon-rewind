class Card < ApplicationRecord
  has_and_belongs_to_many :attacks
  has_and_belongs_to_many :types
  has_many :texts, dependent: :delete_all

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

  with_options unless: :with_an_ability? do |card|
    card.validates :ability_name, presence: true
    card.validates :ability_text, presence: true
  end

  def with_an_ability?
    ability_name.blank? && ability_text.blank?
  end
end
