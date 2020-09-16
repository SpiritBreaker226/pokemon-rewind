import { Card } from './Cards'
import { Pagination } from './Pagination'
import { Sorting, CardQuery } from './CardQuery'

export interface InitialState {
  cards: Card[]
  pagination: Pagination
  urlToEndpoint: string
  search: string
  errorMessage: string
  isLoading: boolean
  sorting: Sorting
}

export enum Types {
  UpdateCards = 'UPDATE_CARDS',
  UpdateURL = 'UPDATE_URL',
  UpdateSearch = 'UPDATE_SEARCH',
  UpdateSorting = 'UPDATE_SORTING',
  UpdateLoading = 'UPDATE_LOADING',
  UpdateErrorMessageFromServer = 'UPDATE_ERROR_MESSAGE_FROM_SERVER',
}

interface CardsPayload {
  [Types.UpdateCards]: {
    cards: Card[]
    pagination: Pagination
    isLoading: boolean
  }
}

interface CallingServerPayload {
  [Types.UpdateURL]: {
    params: CardQuery
  }
  [Types.UpdateLoading]: {
    isLoading: boolean
  }
  [Types.UpdateErrorMessageFromServer]: {
    errorMessage: string
    isLoading: boolean
  }
}

interface SearchPayload {
  [Types.UpdateSearch]: {
    search: string
  }
  [Types.UpdateSorting]: {
    sorting: Sorting
  }
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type CardsActions = ActionMap<CardsPayload>[keyof ActionMap<
  CardsPayload
>]

export type CallingServerActions = ActionMap<
  CallingServerPayload
>[keyof ActionMap<CallingServerPayload>]

export type SearchActions = ActionMap<SearchPayload>[keyof ActionMap<
  SearchPayload
>]

export type Action = CardsActions | CallingServerActions | SearchActions