class Attack < ApplicationRecord
  has_and_belongs_to_many :cards
  has_and_belongs_to_many :costs, class_name: 'Type'

  validates :name, :text, presence: true
  validates :name, uniqueness: true
end
