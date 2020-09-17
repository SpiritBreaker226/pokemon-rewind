class CardGroup < ApplicationRecord
  GROUP_TYPES = %w(resistances weaknesses retreat_costs)

  belongs_to :card
  belongs_to :type

  validates :value, :group_type, presence: true
  validates :group_type, inclusion: { in: GROUP_TYPES }

  def self.add_to_card(card, type_name, attributes)
    return unless GROUP_TYPES.include?(type_name)

    attributes.each do |attribute|
      type_details = Type.find_by_name(attribute['type'])

      card.send(type_name).create!(
        type: type_details,
        value: attribute['value']
      )
    end
  end
end
