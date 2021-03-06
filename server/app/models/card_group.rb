class CardGroup < ApplicationRecord
  GROUP_TYPES = %w(resistances weaknesses retreat_costs)

  belongs_to :card
  belongs_to :type

  validates :value, :group_type, presence: true
  validates :group_type, inclusion: { in: GROUP_TYPES }

  def self.add_to_card(card, types, type_name, attributes)
    return unless GROUP_TYPES.include?(type_name)

    attributes.each do |attribute|
      type_details = types[attribute['type']]

      unless type_details.nil?
        card.send(type_name).create!(
          type: type_details,
          value: attribute['value']
        )
      end
    end
  end

  def self.add_retreat_costs_to_card(card, types, api_types)
    retreat_cost_types = {}

    api_types.each do |api_type|
      type_details = types[api_type]

      unless type_details.nil?
        if retreat_cost_types[api_type].nil?
          retreat_cost_types[api_type] = {
            type: type_details,
            value: 1
          }
        else
          retreat_cost_types[api_type][:value] =
            retreat_cost_types[api_type][:value] + 1
        end
      end
    end

    retreat_cost_types.each do |type, details|
      card.retreat_costs.create!(
        type: details[:type],
        value: details[:value]
      )
    end
  end
end
