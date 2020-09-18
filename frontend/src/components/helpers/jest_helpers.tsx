import React, { FunctionComponent } from 'react'

import { Card } from '../../types/Cards'
import { Direction, Method } from '../../types/CardQuery'
import { Pagination } from '../../types/Pagination'
import { Action } from '../../types/Actions'
import { Search } from '../../types/Search'

import { AppContext } from '../../contexts/AppContext'

export const cards: Card[] = [
  {
    attributes: {
      name: 'Lightning Energy',
      supertype: 'Energy',
      subtype: 'Basic',
      number: '128',
      artist: 'Keiji Kinebuchi',
      rarity: 'Rare',
      series: 'Base',
      set: 'Base Set 2',
      set_code: 'base4',
    },
  },
  {
    attributes: {
      name: 'Jigglypuff',
      national_pokedex_number: 39,
      supertype: 'Pokémon',
      subtype: 'Basic',
      hp: 60,
      converted_retreat_cost: 1,
      number: '77',
      artist: 'Kagemaru Himeno',
      rarity: 'Common',
      series: 'Base',
      set: 'Base Set 2',
      set_code: 'base4',
    },
  },
  {
    attributes: {
      name: 'Squirtle',
      national_pokedex_number: 7,
      supertype: 'Pokémon',
      subtype: 'Basic',
      hp: 40,
      converted_retreat_cost: 1,
      number: '93',
      artist: 'Mitsuhiro Arita',
      rarity: 'Common',
      series: 'Base',
      set: 'Base Set 2',
      set_code: 'base4',
    },
  },
]

export interface TestingState {
  cards?: Card[]
  pagination?: Pagination
  urlToEndpoint?: string
  search?: Search
  method?: Method
  errorMessage?: string
  isLoading?: boolean
  sorting?: {
    fieldName: string | undefined
    dir: Direction
  }
}

export interface MakeWrapperProps {
  state: TestingState
  dispatch?: (action: Action) => void
}

export const MakeWrapper: FunctionComponent<MakeWrapperProps> = ({
  state,
  dispatch,
  children,
}) => (
  <AppContext.Provider
    value={{
      state: {
        cards: [],
        pagination: {
          rows_per_page: 10,
          page_total: 0,
          current_page: '1',
        },
        urlToEndpoint: '',
        search: {
          toggle: false,
          value: '',
        },
        method: 'GET',
        errorMessage: '',
        sorting: {
          fieldName: undefined,
          dir: undefined,
        },
        isLoading: false,
        ...state,
      },
      dispatch: dispatch || (() => null),
    }}
  >
    {children}
  </AppContext.Provider>
)
