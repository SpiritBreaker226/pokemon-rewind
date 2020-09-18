class Attack < ApplicationRecord
  has_and_belongs_to_many :cards
  has_many :costs, class_name: "AttacksTypes", dependent: :delete_all

  validates :name, presence: true, uniqueness: true

  def self.add_to_card(card, attacks)
    attacks.each do |attack|
      attack_details = Attack.find_by_name(attack['name'])

      if attack_details.nil?
        card.attacks.create!(
          name: attack['name'],
          text: attack['text'],
          damage: attack['damage'],
          converted_energy_cost: attack['convertedEnergyCost'],
        )
      else
        card.attacks << attack_details
      end
    end
  end
end
