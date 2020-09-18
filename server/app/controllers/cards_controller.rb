class CardsController < ApplicationController
  def index
    field_name = params.keys.select {
      |key| key != 'controller' && key != 'action'
    }

    field_name = field_name.first unless field_name.nil?

    cards = Card.search(
      field_name: field_name,
      value: params[field_name]
    )

    render(
      json: {
        cards: CardSerializer.new(cards).serializable_hash,
      }.to_json
    )
  end
end
