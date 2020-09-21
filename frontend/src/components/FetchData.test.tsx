import React from 'react'

import { waitFor, screen, render } from '@testing-library/react'

import axios from 'axios'

import { MakeWrapper } from './helpers/jest_helpers'

import FetchData from './FetchData'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('FetchData', () => {
  describe('fetch card data', () => {
    it('renders loading screen', async () => {
      render(
        <MakeWrapper state={{ isLoading: true }}>
          <FetchData />
        </MakeWrapper>
      )

      expect(screen.getByText('Loading', { exact: false })).toBeInTheDocument()
      expect(screen.getByText('Loading', { exact: false })).toMatchSnapshot()

      await waitFor(() => {})
    })

    describe('on error from the server', () => {
      it('should render an error message', async () => {
        mockedAxios.get.mockRejectedValue(new Error('fake error message'))

        render(
          <MakeWrapper
            state={{
              errorMessage: 'fake error message',
            }}
          >
            <FetchData />
          </MakeWrapper>
        )

        await waitFor(() => screen.getByText('error', { exact: false }))

        const error = screen.getByText('fake error message', { exact: false })

        expect(error).toBeInTheDocument()
        expect(error).toMatchSnapshot()
      })
    })
  })
})
