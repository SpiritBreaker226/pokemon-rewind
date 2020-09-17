require 'rails_helper'

RSpec.describe Text, type: :model do
  describe '#add_to_card' do
    let (:card) { create(:card) }

    context 'when there are no texts' do
      it 'should create and add texts to card' do
        texts = ["Draw a card."]

        Text.add_to_card(card, texts)

        expect(Text.all.count).to eq(1)
        expect(card.texts.count).to eq(1)
        expect(card.texts.first.description).to include('Draw a card')
      end
    end
  end
end
