import React from 'react'

import { waitFor, screen, render, fireEvent } from '@testing-library/react'

import axios from 'axios'

import { cards } from './components/helpers/jest_helpers'

import App from './App'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const pagination = {
  rows_per_page: 10,
  page_total: 20,
  current_page: '1',
}

describe('App', () => {
  describe('fetch card data', () => {
    beforeEach(async () => {
      mockedAxios.get.mockResolvedValue({
        data: { cards: { data: cards }, pagination },
      })

      render(<App />)

      await waitFor(() => screen.getByRole('heading'))
    })

    it('renders cards component', () => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BASE_API_URL}/cards?page=1`
      )
      expect(screen.getByRole('heading')).toHaveTextContent('Rewind')
      expect(screen.getByRole('main')).toMatchSnapshot()
    })

    describe('when searching', () => {
      it('find card name Squirtle', async () => {
        fireEvent.change(screen.getByTestId('searchBox'), {
          target: { value: 'squirtle' },
        })

        mockedAxios.get.mockResolvedValueOnce({
          data: { cards: { data: [cards[2]] }, pagination },
        })

        fireEvent.click(screen.getByText('Search'))

        expect(
          screen.getByText('Loading', { exact: false })
        ).toBeInTheDocument()

        await waitFor(() => screen.getByTestId('searchBox'))

        expect(mockedAxios.get).toHaveBeenLastCalledWith(
          `${process.env.REACT_APP_BASE_API_URL}/cards?name=squirtle&page=1`
        )

        expect(screen.getByTestId('searchBox')).toHaveDisplayValue('squirtle')

        expect(screen.getByTestId('base493Squirtle0')).toHaveTextContent(
          /squirtle/i
        )
        expect(screen.getAllByRole('row').length).toEqual(2)

        fireEvent.change(screen.getByTestId('searchBox'), {
          target: { value: 'lightning' },
        })

        expect(screen.getByTestId('searchBox')).toHaveDisplayValue('lightning')
      })

      it("reset card's table and URL on blank textbox", async () => {
        fireEvent.click(screen.getByText('Search'))

        await waitFor(() => screen.getByRole('heading'))

        expect(mockedAxios.get).toHaveBeenLastCalledWith(
          `${process.env.REACT_APP_BASE_API_URL}/cards?page=1`
        )
        expect(
          screen.getByTestId('base4128Lightning Energy0')
        ).toHaveTextContent(/lightning/i)
        expect(screen.getByTestId('base493Squirtle0')).toHaveTextContent(
          /squirtle/i
        )
        expect(screen.getAllByRole('row').length).toEqual(4)
      })
    })

    describe('when using contorls', () => {
      describe('to backing up', () => {
        it('click on back up and get the first page back', async () => {
          fireEvent.click(screen.getByTestId('control_backup_create'))

          mockedAxios.post.mockImplementationOnce(async () => {})

          expect(
            screen.getByText('Loading', { exact: false })
          ).toBeInTheDocument()

          await waitFor(() => screen.getByTestId('searchBox'))

          expect(
            screen.getByText('Unable to Retrive Data', { exact: false })
          ).toBeInTheDocument()
        })
      })
    })
  })

  describe('when loading the page', () => {
    it('should not render no card message and display loading text', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: { cards: { data: [] }, pagination },
      })

      render(<App />)

      expect(
        screen.queryByText('Loading', { exact: false })
      ).toBeInTheDocument()

      expect(
        screen.queryByText('No Cards Found', { exact: false })
      ).not.toBeInTheDocument()

      await waitFor(() => screen.getByTestId('searchBox'))

      expect(
        screen.queryByText('Loading', { exact: false })
      ).not.toBeInTheDocument()

      expect(
        screen.queryByText('No Cards Found', { exact: false })
      ).toBeInTheDocument()
    })

    describe('on error from the server', () => {
      it('should render an error message', async () => {
        mockedAxios.get.mockRejectedValue(new Error('fake error message'))

        render(<App />)

        await waitFor(() => screen.getByText('error', { exact: false }))

        expect(
          screen.queryByText('No Cards Found', { exact: false })
        ).not.toBeInTheDocument()

        expect(
          screen.getByText('fake error message', { exact: false })
        ).toBeInTheDocument()
      })
    })
  })
})
