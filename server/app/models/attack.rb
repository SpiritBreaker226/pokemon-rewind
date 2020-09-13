class Attack < ApplicationRecord
  validates :name, :text, presence: true
  validates :name, uniqueness: true
end
