class Type < ApplicationRecord
  has_and_belongs_to_many :costs_to_attack, class_name: 'Attack'

  validates :name, presence: true, uniqueness: true
end
