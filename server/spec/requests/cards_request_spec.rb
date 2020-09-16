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
        expect(json.count).to eq(10)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end
end
