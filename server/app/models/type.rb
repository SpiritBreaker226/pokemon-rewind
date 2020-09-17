class Type < ApplicationRecord
  has_and_belongs_to_many :cards

  validates :name, presence: true, uniqueness: true

  def self.add_to_card(card, types)
    types.each do |type|
      type_details = Type.find_by_name(type)

      if type_details.nil?
        card.types.create!(name: type)
      else
        card.types << type_details
      end
    end
  end
end
