class AttacksType < ApplicationRecord
  belongs_to :attack
  belongs_to :type

  validates :value, presence: true, numericality: { only_integer: true }
end
