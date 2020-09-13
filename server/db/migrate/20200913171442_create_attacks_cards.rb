class CreateAttacksCards < ActiveRecord::Migration[6.0]
  def change
    create_table :attacks_cards, id: false do |t|
      t.references :attack, foreign_key: true
      t.references :card, foreign_key: true
    end
  end
end
