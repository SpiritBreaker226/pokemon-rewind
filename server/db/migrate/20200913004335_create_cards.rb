class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :name, null: false, limit: 50
      t.integer :national_pokedex_number
      t.string :image_url, null: false, limit: 2048
      t.string :image_url_hi_res, null: false, limit: 2048
      t.string :subtype, limit: 50
      t.string :supertype, limit: 50
      t.string :hp, limit: 4
      t.string :artist, null: false, limit: 50
      t.integer :converted_retreat_cost
      t.string :evolves_from, limit: 50
      t.string :number, null: false, limit: 4
      t.string :rarity, null: false, limit: 12
      t.string :series, null: false, limit: 12
      t.string :set, null: false, limit: 50
      t.string :set_code, null: false, limit: 12

      t.timestamps
    end
  end
end
