import React, { useContext } from 'react'

import { Button } from '@material-ui/core'

import { Types } from '../types/Actions'

import { AppContext } from '../contexts/AppContext'

const Search = () => {
  const { state, dispatch } = useContext(AppContext)

  if (state.isLoading) return null

  const toggleChecked = () => {
    dispatch({
      type: Types.ToggleSearch,
      payload: {
        toggle: !state.search.toggle,
      },
    })
  }

  return (
    <Button
      variant="outlined"
      onClick={toggleChecked}
      data-testid="searchToggle"
    >
      Search Backup
    </Button>
  )
}

export default Search
