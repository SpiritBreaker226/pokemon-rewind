require 'rails_helper'

RSpec.describe Attack, type: :model do
  describe '#add_to_card' do
    let (:card) { create(:card) }

    context 'when there are no attacks' do
      context 'create and' do
        it 'should add attack to card' do
          create(:type, name: 'Grass')

          attacks = [
            {
              'cost' => ['Grass'],
              'name' => 'Stun Spore',
              'text' => 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.',
              'damage' => '10',
              'convertedEnergyCost' => 1
            }
          ]

          Attack.add_to_card(card, attacks)

          expect(Attack.all.count).to eq(1)
          expect(card.attacks.count).to eq(1)
          expect(card.attacks.first.name).to eq('Stun Spore')
        end
      end
    end

    context 'when there is an existing attacks' do
      it 'should add exist attack to card' do
        create(:type, name: 'Grass')
        create(:type, name: 'Colorless')

        existing_attack = create(:attack, name: 'Stun Spore')

        attacks = [
          {
            'cost' => ['Grass'],
            'name' => 'Stun Spore',
            'text' => 'Flip a coin. If heads, the Defending Pokémon is now',
            'damage' => '10',
            'convertedEnergyCost' => 1
          },
          {
            'cost' => ['Grass', 'Colorless'],
            'name' => 'Leech Life',
            'text' => 'Remove a number of damage counters from Venonat equal',
            'damage' => '10',
            'convertedEnergyCost' => 2
          }
        ]

        Attack.add_to_card(card, attacks)

        expect(Attack.all.count).to eq(2)
        expect(card.attacks.count).to eq(2)
        expect(card.attacks.first.name).to eq('Stun Spore')
      end
    end
  end
end
