class CardsController < ApplicationController
  def index
    if params["page"].present? == false
      render status: :bad_request
      return
    end

    hp = params["hp"].present? ? params["hp"].to_i : 0

    current_page = params["page"]
    cards = Card.search(
      name: params["name"] || '',
      rarity: params["rarity"] || '',
      hp: hp,
      page: current_page
    )

    render(
      json: {
        cards: CardSerializer.new(cards).serializable_hash,
        pagination: {
          rows_per_page: cards.page(current_page).limit_value,
          page_total: cards.page(current_page).total_pages,
          current_page: current_page
        },
      }.to_json
    )
  end

  def create
    cards = Card.back_up_from_pokemon_api
    current_page = '1'

    render(
      json: {
        cards: CardSerializer.new(cards).serializable_hash,
        pagination: {
          rows_per_page: cards.page(current_page).limit_value,
          page_total: cards.page(current_page).total_pages,
          current_page: current_page
        },
      }.to_json,
      status: :created
    )
  end

  def destroy
    CardGroup.delete_all
    Text.delete_all
    AttacksType.destroy_all
    Attack.destroy_all
    Card.destroy_all

    head :no_content
  end
end
