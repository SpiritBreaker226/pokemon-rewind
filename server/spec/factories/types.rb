FactoryBot.define do
  factory :type do
    sequence(:name) { |num| "#{Faker::Hacker.noun}#{num}" }
  end
end
