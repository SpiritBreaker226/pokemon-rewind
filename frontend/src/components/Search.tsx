import React, { useContext, ChangeEvent, KeyboardEvent } from 'react'

import { Button, TextField } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { Types } from '../types/Actions'

import { AppContext } from '../contexts/AppContext'

const useStyles = makeStyles(() =>
  createStyles({
    searchText: {
      paddingTop: '0.2em',
      marginRight: '1em',
    },
  })
)

export interface cardsSearchProps {
  onSearchClick: () => {}
}

const Search = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)
  const handleChangeSearchBox = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: Types.UpdateSearch,
      payload: { value: e.target.value },
    })
  }
  const handleClickSearch = () => {
    dispatch({
      type: Types.UpdateURL,
      payload: {
        params: { name: state.search.value, page: '1' },
      },
    })
  }
  const toggleChecked = () => {
    dispatch({
      type: Types.ToggleSearch,
      payload: {
        toggle: !state.search.toggle,
      },
    })
  }
  const handleTextFieldKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClickSearch()
    }
  }

  const displaySearchForm = state.search.toggle ? 'block' : 'none'
  // TODO: Add Search Backup button to toggle search aaera as to the requirements
  // also add in dropdowns fro rarity and a field select that will show text
  return (
    <section>
      <Button
        variant="outlined"
        onClick={toggleChecked}
        data-testid="searchToggle"
      >
        Search Backup
      </Button>

      <section style={{ display: displaySearchForm }}>
        <TextField
          type="text"
          name="searchBox"
          id="searchBox"
          inputProps={{ 'data-testid': 'searchBox' }}
          value={state.search.value}
          placeholder="Search by"
          className={classes.searchText}
          onKeyPress={handleTextFieldKeyPress}
          onChange={handleChangeSearchBox}
        />

        <Button
          variant="outlined"
          onClick={handleClickSearch}
          data-testid="searchButton"
        >
          Search
        </Button>
      </section>
    </section>
  )
}

export default Search
