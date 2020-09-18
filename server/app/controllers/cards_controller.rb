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

  def create
    cards = Card.back_up_from_pokemon_api

    render(
      json: {
        cards: CardSerializer.new(cards).serializable_hash,
      }.to_json,
      status: :created
    )
  end

  def destroy
    CardGroup.delete_all
    Text.delete_all
    Attack.destroy_all
    Card.destroy_all

    head :no_content
  end
end
