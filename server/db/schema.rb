# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_13_172150) do

  create_table "attacks", force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.string "text", null: false
    t.string "damage", limit: 4
    t.integer "converted_energy_cost"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "attacks_cards", id: false, force: :cascade do |t|
    t.integer "attack_id"
    t.integer "card_id"
    t.index ["attack_id"], name: "index_attacks_cards_on_attack_id"
    t.index ["card_id"], name: "index_attacks_cards_on_card_id"
  end

  create_table "attacks_types", force: :cascade do |t|
    t.integer "attack_id"
    t.integer "type_id"
    t.index ["attack_id"], name: "index_attacks_types_on_attack_id"
    t.index ["type_id"], name: "index_attacks_types_on_type_id"
  end

  create_table "cards", force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.integer "national_pokedex_number"
    t.string "image_url", limit: 2048, null: false
    t.string "image_url_hi_res", limit: 2048, null: false
    t.string "subtype", limit: 50
    t.string "supertype", limit: 50
    t.string "hp", limit: 4
    t.string "artist", limit: 50, null: false
    t.integer "converted_retreat_cost"
    t.string "evolves_from", limit: 50
    t.string "number", limit: 4, null: false
    t.string "rarity", limit: 12, null: false
    t.string "series", limit: 12, null: false
    t.string "set", limit: 50, null: false
    t.string "set_code", limit: 12, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "ability_name", limit: 50
    t.string "ability_text"
    t.string "ability_type", limit: 50
  end

  create_table "texts", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "card_id"
    t.index ["card_id"], name: "index_texts_on_card_id"
  end

  create_table "types", force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "attacks_cards", "attacks"
  add_foreign_key "attacks_cards", "cards"
  add_foreign_key "attacks_types", "attacks"
  add_foreign_key "attacks_types", "types"
  add_foreign_key "texts", "cards"
end
