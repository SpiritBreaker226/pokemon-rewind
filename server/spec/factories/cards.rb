FactoryBot.define do
  factory :card do
      transient do
        set_series { ["Base", "XY", "EX"].sample }
      end

      name { Faker::Games::Pokemon.name }
      national_pokedex_number { Faker::Number.within(range: 1..60) }
      image_url { Faker::Avatar.image }
      image_url_hi_res { Faker::Avatar.image(size: "50x50")  }
      subtype { ["MEGA", "Stage 1", "BREAK", "Supporter"].sample }
      supertype { ["Pokémon", "Trainer", "Energy"].sample }
      hp { Faker::Number.within(range: 1..99).to_s }
      artist { Faker::Artist.name }
      converted_retreat_cost { Faker::Number.within(range: 1..10) }
      evolves_from { Faker::Games::Pokemon.name }
      number { Faker::Number.within(range: 1..60).to_s }
      rarity { ["Rare", "Rare Holo", "Common"].sample }
      series { set_series }
      set { ["BREAKthrough", "Phantom Forces", "Jungle"].sample }
      set_code { "#{series.downcase}#{Faker::Number.within(range: 1..10)}" }
  end
end
