class CreateAttacks < ActiveRecord::Migration[6.0]
  def change
    create_table :attacks do |t|
      t.string :name, null: false, limit: 50
      t.string :text, null: false
      t.string :damage, limit: 4
      t.integer :converted_energy_cost

      t.timestamps
    end
  end
end
