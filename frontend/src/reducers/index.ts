import queryString from 'query-string'

import { Types, InitialState, Action } from '../types/Actions'

export const cardsReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.UpdateCards:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        cards: action.payload.cards,
        pagination: action.payload.pagination,
      }
    default:
      return state
  }
}

export const callingServerReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.UpdateURL:
      const currentURL = queryString.parseUrl(state.urlToEndpoint)
      const query = { ...currentURL.query, ...action.payload.params }
      const newUrl = queryString.stringifyUrl(
        {
          url: currentURL.url,
          query,
        },
        {
          skipEmptyString: true,
          skipNull: true,
        }
      )

      return { ...state, urlToEndpoint: newUrl, method: action.payload.method }
    case Types.UpdateLoading:
      return { ...state, isLoading: action.payload.isLoading }
    case Types.UpdateErrorMessageFromServer:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        errorMessage: action.payload.errorMessage,
      }
    default:
      return state
  }
}

export const searchReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.UpdateSearch:
      return {
        ...state,
        search: action.payload.search,
      }
    case Types.UpdateSorting:
      return {
        ...state,
        sorting: action.payload.sorting,
      }
    default:
      return state
  }
}

export default { cardsReducer, callingServerReducer, searchReducer }
