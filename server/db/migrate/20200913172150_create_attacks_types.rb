class CreateAttacksTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :attacks_types do |t|
      t.references :attack, foreign_key: true
      t.references :type, foreign_key: true
    end
  end
end
