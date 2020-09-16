import React from 'react'

import { screen, render, fireEvent } from '@testing-library/react'

import Search from './Search'
import { MakeWrapper } from './helpers/jest_helpers'
import { Action, Types } from '../types/Actions'

jest.mock('axios')

describe('Search', () => {
  it('renders cards search', async () => {
    const { getByTestId, getByText } = render(<Search />)

    expect(getByText('Search', { exact: false })).toBeInTheDocument()
    expect(getByTestId('searchBox')).toBeInTheDocument()
  })

  describe('using searchBox', () => {
    it('should search on enter', () => {
      const { getByTestId } = render(
        <MakeWrapper
          state={{
            search: 'squirtle',
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
          state={{}}
          dispatch={(action: Action) => {
            if (action.type === Types.UpdateSearch) {
              expect(action.payload.search).toEqual('s')
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
