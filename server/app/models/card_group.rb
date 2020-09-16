class CardGroup < ApplicationRecord
  belongs_to :card
  belongs_to :type

  validates :value, :group_type, presence: true
  validates :group_type, inclusion: {
    in: %w(resistances weaknesses retreat_costs)
  }
end
