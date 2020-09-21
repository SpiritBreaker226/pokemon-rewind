class Attack < ApplicationRecord
  has_and_belongs_to_many :cards
  has_many :costs, class_name: "AttacksType", dependent: :delete_all

  validates :name, presence: true, uniqueness: true

  def self.add_to_card(card, types, api_attacks)
    attack_details = nil
    attack_costs = []

    api_attacks.each do |attack|
      attack_details = Attack.find_by_name(attack['name'])

      if attack_details.nil?
        created_attack = card.attacks.create!(
          name: attack['name'],
          text: attack['text'],
          damage: attack['damage'],
          converted_energy_cost: attack['convertedEnergyCost']
        )

        unless attack['cost'].nil?
          attack_costs << { attack: created_attack, costs: attack['cost'] }
        end
      else
        card.attacks << attack_details
      end
    end

    attack_costs.each do |attack_cost|
      attack_cost[:costs].each do |type|
        cost_exist = attack_cost[:attack].costs.any? do |cost|
          cost.type.name == type
        end

        if cost_exist
          attack_types_details =
            AttacksType
              .where(attack: attack_cost[:attack], type: types[type])
              .first

          attack_types_details.value = attack_types_details.value + 1
          attack_types_details.save!
        else
          attack_cost[:attack].costs.create!(type: types[type], value: 1)
        end
      end
    end
  end
end
