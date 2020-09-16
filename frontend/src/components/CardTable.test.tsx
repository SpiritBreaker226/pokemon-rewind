import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { MakeWrapper, cards } from './helpers/jest_helpers'

import CardTable from './CardTable'
import { Types, Action } from '../types/Actions'

describe('CardTable', () => {
  it('should render as expeected', () => {
    const { queryByTestId, getAllByRole } = render(
      <MakeWrapper
        state={{
          cards,
          pagination: { rows_per_page: 10, page_total: 2, current_page: '1' },
        }}
      >
        <CardTable />
      </MakeWrapper>
    )

    expect(getAllByRole('columnheader').length).toEqual(13)
    expect(getAllByRole('row').length).toEqual(4)
    expect(queryByTestId('pagination')).toBeInTheDocument()
  })

  describe('when no cards are found', () => {
    it('should render no card message', () => {
      const { getByText } = render(
        <MakeWrapper state={{ cards: [] }}>
          <CardTable />
        </MakeWrapper>
      )

      expect(getByText('No cards Found', { exact: false })).toBeInTheDocument()
    })
  })

  describe('for pagination', () => {
    it('should not render pagination on a single page', () => {
      const { queryByTestId } = render(
        <MakeWrapper
          state={{
            cards,
            pagination: { rows_per_page: 10, page_total: 1, current_page: '1' },
          }}
        >
          <CardTable />
        </MakeWrapper>
      )

      expect(queryByTestId('pagination')).not.toBeInTheDocument()
    })

    it('should switch to another page on click on click', () => {
      const { getByRole } = render(
        <MakeWrapper
          state={{
            cards,
            pagination: {
              rows_per_page: 10,
              page_total: 2,
              current_page: '1',
            },
          }}
          dispatch={(action: Action) => {
            if (action.type === Types.UpdateURL) {
              expect(action.payload.params.page).toEqual('2')
            }
          }}
        >
          <CardTable />
        </MakeWrapper>
      )

      fireEvent.click(getByRole('button', { name: 'Go to page 2' }))
    })
  })
})
