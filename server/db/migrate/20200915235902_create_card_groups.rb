class CreateCardGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :card_groups do |t|
      t.string :value, null: false, limit: 4
      t.string :group_type, null: false, limit: 50
      t.references :card, foreign_key: true
      t.references :type, foreign_key: true

      t.timestamps
    end
  end
end
