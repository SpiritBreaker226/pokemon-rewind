FactoryBot.define do
  factory :attack do
    name { Faker::TvShows::GameOfThrones.character }
    text { Faker::TvShows::GameOfThrones.quote }
    damage { ['', '10', '+20'].sample }
    converted_energy_cost { Faker::Number.within(range: 1..10) }
  end
end
