class Type < ApplicationRecord
  has_and_belongs_to_many :cards

  validates :name, presence: true, uniqueness: true

  def self.add_to_card(card, types, card_types)
    card_types.each do |card_type|
      type_details = types[card_type]

      if type_details.nil?
        card.types.create!(name: card_type)
      else
        card.types << type_details
      end
    end
  end

  def self.to_h()
    types = Type.all

    Hash[ types.collect { |types| [types.name, types] } ]
  end
end
