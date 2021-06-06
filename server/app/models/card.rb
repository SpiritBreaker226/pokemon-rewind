class Card < ApplicationRecord
  has_and_belongs_to_many :attacks
  has_and_belongs_to_many :types

  has_many :texts, dependent: :delete_all

  has_many(
    :resistances,
    -> { where group_type: 'resistances' },
    class_name: "CardGroup",
    dependent: :delete_all
  )
  has_many(
    :weaknesses,
    -> { where group_type: 'weaknesses' },
    class_name: "CardGroup",
    dependent: :delete_all
  )
  has_many(
    :retreat_costs,
    -> { where group_type: 'retreat_costs' },
    class_name: "CardGroup",
    dependent: :delete_all
  )

  validates(
    :name,
    :image_url,
    :image_url_hi_res,
    :artist,
    :number,
    :rarity,
    :series,
    :set_code,
    presence: true
  )

  with_options unless: :with_an_ability? do |card|
    card.validates :ability_name, presence: true
    card.validates :ability_text, presence: true
  end

  def with_an_ability?
    ability_name.nil? && ability_text.nil?
  end

  def self.access_pokemon_api(set_code: nil)
    response = HTTParty.get(
      "https://api.pokemontcg.io/v1/cards?setCode=#{set_code}"
    )

    JSON.parse(response.body)
  end

  def self.back_up_from_pokemon_api(set_code: 'base4')
    cards = Card.access_pokemon_api(set_code: set_code)

    types = Type.to_h
    hp = nil
    ability = nil
    created_card = nil

    cards['cards'].each do |card|
      hp = card['hp'].nil? ? nil : card['hp'].to_i

      if card['ability'].nil?
        ability = {
          name: nil,
          text: nil,
          type: nil,
        }
      else
        ability = {
          name: card['ability']['name'],
          text: card['ability']['text'],
          type: card['ability']['type'],
        }
      end

      created_card = Card.create!(
        name: card['name'],
        image_url: card['imageUrl'],
        image_url_hi_res: card['imageUrlHiRes'],
        subtype: card['subtype'],
        supertype: card['supertype'],
        artist: card['artist'],
        number: card['number'],
        rarity: card['rarity'],
        series: card['series'],
        set_code: card['setCode'],
        national_pokedex_number: card['nationalPokedexNumber'],
        hp: hp,
        converted_retreat_cost: card['convertedRetreatCost'],
        evolves_from: card['evolvesFrom'],
        ability_name: ability[:name],
        ability_text: ability[:text],
        ability_type: ability[:type]
      )

      unless card['types'].nil?
        Type.add_to_card(created_card, types, card['types'])
      end

      unless card['text'].nil?
        Text.add_to_card(created_card, card['text'])
      end

      unless card['attacks'].nil?
        Attack.add_to_card(created_card, types, card['attacks'])
      end

      unless card['retreatCost'].nil?
        CardGroup.add_retreat_costs_to_card(
          created_card,
          types,
          card['retreatCost']
        )
      end

      unless card['resistances'].nil?
        CardGroup.add_to_card(
          created_card,
          types,
          'resistances',
          card['resistances']
        )
      end

      unless card['weaknesses'].nil?
        CardGroup.add_to_card(
          created_card,
          types,
          'weaknesses',
          card['weaknesses'])
      end
    end

    Card.all
  end

  def self.search(name: '', rarity: '', hp: 0, page: nil)
    cards =
      if name == '' && rarity == '' && hp == 0
        Card.all
      else
        name_condition = name.blank? ? '' : 'LOWER(name) LIKE ?'
        rarity_condition = rarity.blank? ? '' : 'LOWER(rarity) = ?'
        hp_condition =  hp === 0 ? '' : 'IFNULL(hp, 0) >= ?'

        Card
          .where(name_condition, "%#{name.downcase}%")
          .where(rarity_condition, rarity.downcase)
          .where(hp_condition, hp)
      end

    page.nil? ? cards.order(name: :asc) : cards.order(name: :asc).page(page)
  end
end
