FactoryBot.define do
  factory :card_group do
    value { Faker::Number.within(range: 1..60).to_s }
    group_type { ["resistances" "weaknesses" "retreat_costs"].sample }
    card { create :card }
    type { create :type }
  end
end
