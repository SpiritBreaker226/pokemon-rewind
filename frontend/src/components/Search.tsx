import React, { useContext } from 'react'

import { Button } from '@material-ui/core'

import { Types } from '../types/Actions'

import { AppContext } from '../contexts/AppContext'

import SearchFrom from './SearchForm'

const Search = () => {
  const { state, dispatch } = useContext(AppContext)

  const toggleChecked = () => {
    dispatch({
      type: Types.ToggleSearch,
      payload: {
        toggle: !state.search.toggle,
      },
    })
  }

  return (
    <section>
      <Button
        variant="outlined"
        onClick={toggleChecked}
        data-testid="searchToggle"
      >
        Search Backup
      </Button>

      <SearchFrom />
    </section>
  )
}

export default Search
