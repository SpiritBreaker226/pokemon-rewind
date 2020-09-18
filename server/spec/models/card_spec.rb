require 'rails_helper'

RSpec.describe Card, type: :model do
  describe '#search' do
    it 'find all cards' do
      create_list(:card, 10)

      all_found = Card.search

      expect(all_found.count).to eq(10)
    end

    context 'and no field is found' do
      it 'should return nil' do
        found = Card.search(
          field_name: 'not_a_field', value: Faker::Games::Pokemon.name
        )

        expect(found).to be_nil
      end
    end

    context 'when searching' do
      before(:each) do
        create_list(:card, 10)
      end

      context 'for names' do
        it 'find all cards name Zoe' do
          create_list(:card, 2, name: "Zoe #{Faker::Name.last_name}")

          found_all = Card.search(field_name: 'name', value: 'zoe')

          expect(found_all.count).to eq(2)
        end

        context 'and when no cards are found' do
          it 'should be an empty array' do
            found_all = Card.search(field_name: 'name', value: 'bob')

            expect(found_all.count).to eq(0)
          end
        end
      end

      context 'for hp' do
        it 'find all cards with hp 200 or greater' do
          create(:card, hp: 200)
          create(:card, hp: 300)

          found_all = Card.search(field_name: 'hp', value: 200)

          expect(found_all.count).to eq(2)
        end
      end

      context 'for rarity' do
        it 'find all cards name Zoe' do
          create_list(:card, 2, rarity: 'Ultra Rare')

          found_all = Card.search(field_name: 'rarity', value: 'Ultra Rare')

          expect(found_all.count).to eq(2)
        end
      end
    end

    context 'when doing pagination' do
      before(:each) do
        create_list(:card, 30)
      end

      context 'and searching for names' do
        it 'find all card name Zoe' do
          create_list(:card, 2, name: "Zoe #{Faker::Name.last_name}")

          page_cards = Card.search(page: 1, name: 'zoe')

          expect(page_cards.count).to eq(2)
        end
      end
    end
  end

  describe '#back_up_from_pokemon_api' do
    let (:pokemon_api_response) {
      JSON.parse(file_fixture('pokemon_api_response.json').read)
    }

    context 'when back up the cards' do
      let (:eigth_card) { Card.last(5).first }

      before :each do
        create(:type, name: 'Psychic')
        create(:type, name: 'Fighting')

        allow(Card).to(
          receive(:access_pokemon_api).and_return(pokemon_api_response)
        )

        @cards = Card.back_up_from_pokemon_api
      end

      it 'should populate the Cards table' do
        expect(@cards.count).to eq(11)

        expect(eigth_card.name).to eq('Meowth')
        expect(eigth_card.hp).to eq(50)
        expect(eigth_card.ability_name).to be_nil

        expect(Card.last.ability_name).to eq('Retreat Aid')
        expect(Card.last.ability_text).to include('pay 1 Colorless')
        expect(Card.last.ability_type).to eq('Pokémon Power')
      end

      it 'should populate the Attacks table' do
        expect(eigth_card.attacks.first.name).to eq('Pay Day')
      end

      it 'should populate the Types & Text table' do
        expect(eigth_card.types.first.name).to eq('Colorless')
        expect(Card.first.texts.first.description).to include('draw a card')
      end

      it 'should populate the Card Groups table' do
        expect(eigth_card.retreat_costs.first.type.name).to eq('Colorless')
        expect(eigth_card.resistances.first.type.name).to eq('Psychic')
        expect(eigth_card.weaknesses.first.type.name).to eq('Fighting')
      end
    end
  end
end
