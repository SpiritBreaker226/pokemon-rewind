require 'rails_helper'

RSpec.describe CardGroup, type: :model do
  describe '#add_to_card' do
    let (:card) { create(:card) }

    context 'when there is a valid card group type' do
      it 'find the card type and add weaknesses to card' do
        type = create(:type, name: 'Lightning')
        type_content = [
          {
            'type' => 'Lightning',
            'value' => '×2'
          }
        ]

        CardGroup.add_to_card(card, 'weaknesses', type_content)

        expect(card.weaknesses.count).to eq(1)
        expect(card.weaknesses.first.type.name).to eq(type.name)
        expect(card.weaknesses.first.value).to eq('×2')
      end
    end

    context 'when there is an invalid card group type' do
      it 'not add it to cards' do
        create(:type, name: 'Lightning')
        type_content = [
          {
            'type' => 'Lightning',
            'value' => '×2'
          }
        ]

        CardGroup.add_to_card(card, 'not_a_group_type', type_content)

        expect(card.weaknesses.count).to eq(0)
      end
    end
  end
end
