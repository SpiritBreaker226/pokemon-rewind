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
    :set,
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
    Pokemon::Card.where(set_code: set_code)
  end

  def self.back_up_from_pokemon_api(set_code: 'base4')
    cards = Card.access_pokemon_api(set_code: set_code)
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
        set: card['set'],
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
        Type.add_to_card(created_card, card['types'])
      end

      unless card['text'].nil?
        Text.add_to_card(created_card, card['text'])
      end

      unless card['attacks'].nil?
        Attack.add_to_card(created_card, card['attacks'])
      end

      unless card['retreatCost'].nil?
        CardGroup.add_retreat_costs_to_card(created_card, card['retreatCost'])
      end

      unless card['resistances'].nil?
        CardGroup.add_to_card(created_card, 'resistances', card['resistances'])
      end

      unless card['weaknesses'].nil?
        CardGroup.add_to_card(created_card, 'weaknesses', card['weaknesses'])
      end
    end

    Card.all
  end

  def self.search(field_name: nil, value: nil)
    cards = case field_name
      when 'name'
        Card.where("LOWER(name) LIKE ?", "%#{value.downcase}%")
      when 'rarity'
        Card.where("LOWER(rarity) = ?", value.downcase)
      when 'hp'
        Card.where("hp >= ?", value)
      else
        if value.nil?
          Card.all
        else
          return nil
        end
    end

    cards.order(name: :asc)
  end
end
