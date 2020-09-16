require 'rails_helper'

RSpec.describe Card, type: :model do
  describe '#search' do
    it 'find all cards' do
      create_list(:card, 10)

      all_found = Card.search

      expect(all_found.count).to eq(10)
    end

    context 'when searching for names' do
      before(:each) do
        create_list(:card, 10)
      end

      it 'find all cards name Zoe' do
        create_list(:card, 2, name: "Zoe #{Faker::Name.last_name}")

        found_all = Card.search(value: 'zoe')

        expect(found_all.count).to eq(2)
      end

      context 'and when no cards are found' do
        it 'should be an empty array' do
          found_all = Card.search(value: 'bob')

          expect(found_all.count).to eq(0)
        end
      end
    end
  end
end
