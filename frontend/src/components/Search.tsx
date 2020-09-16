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
      payload: { search: e.target.value },
    })
  }
  const handleClickSearch = () => {
    dispatch({
      type: Types.UpdateURL,
      payload: {
        params: { name: state.search, page: '1' },
      },
    })
  }
  const handleTextFieldKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClickSearch()
    }
  }

  // TODO: Add Search Backup button to toggle search aaera as to the requirements
  // also add in dropdowns fro rarity and a field select that will show text
  return (
    <section>
      <TextField
        type="text"
        name="searchBox"
        id="searchBox"
        inputProps={{ 'data-testid': 'searchBox' }}
        value={state.search}
        placeholder="Search by"
        className={classes.searchText}
        onKeyPress={handleTextFieldKeyPress}
        onChange={handleChangeSearchBox}
      />

      <Button variant="outlined" onClick={handleClickSearch}>
        Search
      </Button>
    </section>
  )
}

export default Search
