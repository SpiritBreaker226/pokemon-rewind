require 'rails_helper'

RSpec.describe "Cards", type: :request do
  describe 'GET /cards' do
    context 'get the first page of cards' do
      before(:each) do
        create_list(:card, 10)

        get '/cards'
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
          create_list(:card, 11, name: "Mewtwo")

          get "/cards?name=mewtwo"

          json = JSON.parse(response.body)

          expect(json).not_to be_empty
          expect(json['cards']['data'].count).to eq(11)
          expect(response).to have_http_status(200)
        end

        context 'when Mewtwo is not found' do
          it 'returns status code 200 with an empty array' do
            get "/cards?name=Mewtwo"

            json = JSON.parse(response.body)

            expect(json['cards']['data']).to be_empty
            expect(response).to have_http_status(200)
          end
        end
      end

      context 'for hp' do
        it 'find all cards with hp 200 or greater' do
          create(:card, hp: 200)
          create(:card, hp: 300)

          get "/cards?hp=200"

          json = JSON.parse(response.body)

          expect(json['cards']['data'].count).to eq(2)
          expect(response).to have_http_status(200)
        end
      end
    end
  end
end
