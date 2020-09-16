class ChangeHpInCardsToInteger < ActiveRecord::Migration[6.0]
  def change
    change_column :cards, :hp, :integer
  end
end
