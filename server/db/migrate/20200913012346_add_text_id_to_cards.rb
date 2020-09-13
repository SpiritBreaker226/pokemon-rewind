class AddTextIdToCards < ActiveRecord::Migration[6.0]
  def change
    add_reference :texts, :card, foreign_key: true
  end
end
