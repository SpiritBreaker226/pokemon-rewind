FactoryBot.define do
  factory :text do
    description { Faker::Movie.quote }
  end
end
