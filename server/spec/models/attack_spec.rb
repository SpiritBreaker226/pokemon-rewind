require 'rails_helper'

RSpec.describe Attack, type: :model do
  describe '#add_to_card' do
    let (:card) { create(:card) }
    let (:hash_types) { Type.to_h }

    context 'when there are no attacks' do
      context 'create and' do
        it 'should add attack to card' do
          type = create(:type, name: 'Grass')

          attacks = [
            {
              'cost' => ['Grass'],
              'name' => 'Stun Spore',
              'text' => 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.',
              'damage' => '10',
              'convertedEnergyCost' => 1
            }
          ]

          Attack.add_to_card(
            card,
            hash_types,
            attacks
          )

          expect(Attack.all.count).to eq(1)
          expect(card.attacks.count).to eq(1)
          expect(card.attacks.first.name).to eq('Stun Spore')
        end

        context 'when there are two of the same cost types' do
          it 'should add two to Attacks Types table' do
            type = create(:type, name: 'Colorless')

            existing_attack = create(:attack, name: 'Stun Spore')

            attacks = [
              {
                'cost' => ['Colorless', 'Colorless'],
                'name' => 'Leech Life',
                'text' => 'Remove a number of damage counters from Venonat equal',
                'damage' => '10',
                'convertedEnergyCost' => 2
              }
            ]

            Attack.add_to_card(
              card,
              hash_types,
              attacks
            )

            expect(card.attacks.first.costs.first.value).to eq(2)
          end
        end
      end
    end

    context 'when there is an existing attacks' do
      it 'should add exist attack to card' do
        grass_type = create(:type, name: 'Grass')
        colorless_type = create(:type, name: 'Colorless')

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

        Attack.add_to_card(
          card,
          hash_types,
          attacks
        )

        expect(Attack.all.count).to eq(2)
        expect(card.attacks.count).to eq(2)
        expect(card.attacks.first.name).to eq('Stun Spore')
        expect(card.attacks.last.costs.first.value).to eq(1)
        expect(card.attacks.last.costs.second.value).to eq(1)
      end
    end
  end
end
