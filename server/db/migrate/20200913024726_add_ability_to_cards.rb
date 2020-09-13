class AddAbilityToCards < ActiveRecord::Migration[6.0]
  def change
     add_column :cards, :ability_name, :string, limit: 50
     add_column :cards, :ability_text, :string
     add_column :cards, :ability_type, :string, limit: 50
  end
end
