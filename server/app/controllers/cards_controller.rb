class CardsController < ApplicationController
  def index
    cards = Card.all

    render(
      json: {
        cards: CardSerializer.new(cards).serializable_hash,
      }.to_json
    )
  end
end
