class CreateCardsTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :cards_types, id: false do |t|
      t.references :card, foreign_key: true
      t.references :type, foreign_key: true

      t.timestamps
    end
  end
end
