class CardsController < ApplicationController
  def index
    cards = Card.all

    render json: cards.to_json
  end
end
