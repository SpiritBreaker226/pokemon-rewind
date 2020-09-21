require 'rails_helper'

RSpec.describe Type, type: :model do
  let (:hash_types) { Type.to_h }

  describe '#add_to_card' do
    let (:card) { create(:card) }

    it 'should find and add types to card' do
      type = create(:type)
      types = [type.name]

      Type.add_to_card(card, hash_types, types)

      expect(card.types.count).to eq(1)
      expect(card.types.first.name).to eq(type.name)
    end

    context 'when there are a new type' do
      it 'should create and add types to card' do
        type = create(:type)
        types = ['Water', type]

        Type.add_to_card(card, hash_types, types)

        expect(card.types.count).to eq(2)
        expect(card.types.first.name).to eq('Water')
      end
    end
  end
end
