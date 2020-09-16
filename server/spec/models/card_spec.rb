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
  end
end
