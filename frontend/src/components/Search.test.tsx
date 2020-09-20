import React from 'react'

import { screen, render, fireEvent } from '@testing-library/react'

import Search from './Search'
import { MakeWrapper } from './helpers/jest_helpers'
import { Action, Types } from '../types/Actions'

jest.mock('axios')

describe('Search', () => {
  it('renders cards search', async () => {
    const { getByTestId } = render(<Search />)

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
              value: 'squirtle',
              field: 'name',
            },
          }}
          dispatch={(action: Action) => {
            if (action.type === Types.UpdateURL) {
              expect(action.payload.params.name).toEqual('squirtle')
            }
          }}
        >
          <Search />
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
              value: '',
              field: 'name',
            },
          }}
          dispatch={(action: Action) => {
            if (action.type === Types.UpdateSearch) {
              expect(action.payload.value).toEqual('s')
            }
          }}
        >
          <Search />
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
