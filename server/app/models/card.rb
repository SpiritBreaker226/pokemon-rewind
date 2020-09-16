class Card < ApplicationRecord
  has_and_belongs_to_many :attacks
  has_and_belongs_to_many :types
  has_many :texts, dependent: :delete_all

  has_many(
    :resistances,
    -> { where group_type: 'resistances' },
    class_name: "CardGroup",
    dependent: :delete_all
  )
  has_many(
    :weaknesses,
    -> { where group_type: 'weaknesses' },
    class_name: "CardGroup",
    dependent: :delete_all
  )
  has_many(
    :retreat_costs,
    -> { where group_type: 'retreat_costs' },
    class_name: "CardGroup",
    dependent: :delete_all
  )

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
