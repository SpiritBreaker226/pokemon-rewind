require 'rails_helper'

RSpec.describe "Cards", type: :request do
  describe 'GET /cards' do
    context 'get the first page of cards' do
      before(:each) do
        create_list(:card, 20)

        get '/cards?page=1'
      end

      it 'returns cards' do
        json = JSON.parse(response.body)

        expect(json).not_to be_empty
        expect(json['cards']['data'].count).to eq(10)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'searching' do
      context 'for name Mewtwo' do
        it 'returns all cards and status code 200' do
          create_list(:card, 5, name: "zackman")

          get "/cards?page=1&name=zackman"

          json = JSON.parse(response.body)

          expect(json).not_to be_empty
          expect(json['cards']['data'].count).to eq(5)
          expect(response).to have_http_status(200)
        end

        context 'when Mewtwo is not found' do
          it 'returns status code 200 with an empty array' do
            get "/cards?page=1&name=Mewtwo"

            json = JSON.parse(response.body)

            expect(json['cards']['data']).to be_empty
            expect(response).to have_http_status(200)
          end
        end
      end

      context 'on mutiple columns' do
        it 'find all cards with hp 200 or greater' do
          create(:card, hp: 200, name: "Zackman")
          create(:card, hp: 300, name: "Zackman 2")

          get "/cards?page=1&hp=200&name=zackman"

          json = JSON.parse(response.body)

          expect(json['cards']['data'].count).to eq(2)
          expect(
            json['cards']['data'][0]['attributes']['name']
          ).to eq('Zackman')
          expect(response).to have_http_status(200)
        end
      end
    end

    context 'when doing paginate page' do
      context 'if no page parmas is found' do
        it 'should send back a 400 error' do
          get '/cards'

          expect(response).to have_http_status(400)
        end
      end
    end
  end

  describe 'POST /cards' do
    let (:pokemon_api_response) {
      JSON.parse(file_fixture('pokemon_api_response.json').read)
    }

    context 'create cards from Pokemon API' do
      it 'returns status code 201' do
        create(:type, name: 'Psychic')
        create(:type, name: 'Fighting')

        allow(Card).to(
          receive(:access_pokemon_api).and_return(pokemon_api_response)
        )

        post '/cards'

        json = JSON.parse(response.body)

        expect(json['cards']['data'].count).to eq(11)
        expect(response).to have_http_status(201)
      end
    end
  end

  describe 'DELETE /cards' do
    it 'remove all cards connected to the Cards table' do
      create_list(:card_with_all_attributes, 10)

      delete '/cards/all'

      expect(Card.all.count).to eq(0)
      expect(Text.all.count).to eq(0)
      expect(Attack.all.count).to eq(0)
      expect(AttacksType.all.count).to eq(0)
      expect(CardGroup.all.count).to eq(0)
      expect(Type.all.count).to eq(10)
    end
  end
end
