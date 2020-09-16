Rails.application.routes.draw do
  resources :cards, only: [:index, :create] do
    delete 'all', on: :collection, to: 'cards#destroy'
  end
end
