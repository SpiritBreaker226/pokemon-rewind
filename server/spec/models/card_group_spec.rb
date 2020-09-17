require 'rails_helper'

RSpec.describe CardGroup, type: :model do
  let (:card) { create(:card) }

  describe '#add_to_card' do
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

    context 'card type does not exisit' do
      it 'not add card type to cards' do
        group_types = [
          {
            'type' => 'Not A Card Group',
            'value' => '×42'
          }
        ]

        CardGroup.add_to_card(card, 'resistances', group_types)

        expect(card.resistances.count).to eq(0)
      end
    end

    context 'should not add Retreat Cost type' do
      context 'Retreat Cost types have a different use of value' do
        it 'not add any Retreat Costs' do
          types = ['Colorless']

          CardGroup.add_to_card(card, 'retreat_costs', types)

          expect(card.retreat_costs.count).to eq(0)
        end
      end
    end
  end

  describe '#add_retreat_costs_to_card' do
    it 'add card type to cards as Retreat Costs ' do
      type = create(:type, name: 'Colorless')
      types = ['Colorless', 'Colorless']

      CardGroup.add_retreat_costs_to_card(card, types)

      expect(card.retreat_costs.count).to eq(1)
      expect(card.retreat_costs.first.type.name).to eq(type.name)
      expect(card.retreat_costs.first.value).to eq('2')
    end

    context 'card type does not exisit' do
      it 'not add card type to cards as Retreat Costs' do
        CardGroup.add_retreat_costs_to_card(card, ['not a type'])

        expect(card.retreat_costs.count).to eq(0)
      end
    end
  end
end
