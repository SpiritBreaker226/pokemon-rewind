class Text < ApplicationRecord
  validates :description, presence: true

  def self.add_to_card(card, texts)
    texts.each do |text|
      card.texts.create!(description: text)
    end
  end
end
