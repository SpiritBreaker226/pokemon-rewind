class RemoveSetFromCards < ActiveRecord::Migration[6.0]
  def change
    remove_column :cards, :set, :string
  end
end
