class AddValueToAttacksTypes < ActiveRecord::Migration[6.0]
  def change
    add_column :attacks_types, :value, :integer, null: false, limit: 4
  end
end
