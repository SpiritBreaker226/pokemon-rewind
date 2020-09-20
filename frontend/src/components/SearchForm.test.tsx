import React from 'react'

import { screen, render, fireEvent } from '@testing-library/react'

import SearchForm from './SearchForm'
import { MakeWrapper } from './helpers/jest_helpers'
import { Action, Types } from '../types/Actions'

jest.mock('axios')

describe('Search Form', () => {
  it('renders cards search', async () => {
    const { getByTestId } = render(<SearchForm />)

    expect(getByTestId('searchButton')).not.toBeVisible()
    expect(getByTestId('searchBox')).not.toBeVisible()
  })

  describe('using searchBox', () => {
    it('should search on enter', () => {
      const { getByTestId } = render(
        <MakeWrapper
          state={{
            search: {
              toggle: true,
              value: {
                name: 'squirtle',
                rarity: '',
              },
              field: 'name',
            },
          }}
          dispatch={(action: Action) => {
            if (action.type === Types.UpdateURL) {
              const paramValue = action.payload.params.value || { name: '' }

              expect(paramValue.name).toEqual('squirtle')
            }
          }}
        >
          <SearchForm />
        </MakeWrapper>
      )

      fireEvent.keyPress(getByTestId('searchBox'), {
        key: 'Enter',
        charCode: 13,
      })
    })

    it('should not search on non-enter key', () => {
      const { getByTestId } = render(
        <MakeWrapper
          state={{
            search: {
              toggle: true,
              value: {
                name: '',
                rarity: '',
              },
              field: 'name',
            },
          }}
          dispatch={(action: Action) => {
            if (action.type === Types.UpdateSearch) {
              expect(action.payload.value).toEqual('s')
            }
          }}
        >
          <SearchForm />
        </MakeWrapper>
      )

      fireEvent.keyPress(getByTestId('searchBox'), {
        key: 's',
        charCode: 74,
      })

      fireEvent.change(screen.getByTestId('searchBox'), {
        target: { value: 's' },
      })
    })
  })
})
