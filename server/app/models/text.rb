class Text < ApplicationRecord
  validates :description, presence: true
end
