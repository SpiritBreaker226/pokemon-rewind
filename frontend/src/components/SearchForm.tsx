import React, { useContext, ChangeEvent, KeyboardEvent } from 'react'

import { Button, Input, MenuItem, Select, TextField } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { Types } from '../types/Actions'

import { AppContext } from '../contexts/AppContext'
import { HTMLSelectElement } from '../types/Search'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      backgroundColor: theme.palette.success.main,
      padding: theme.spacing(2),
      textAlign: 'center',
    },

    field: {
      paddingTop: '0.2em',
      margin: '0 1em',
    },

    hpField: {
      width: '8em',
      paddingTop: '0.8em',
      display: 'inline',
    },

    rarityField: {
      display: 'inline',
      paddingTop: '0.8em',
    },
  })
)

const SearchFrom = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)

  const handleChangeSearchBox = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: Types.UpdateSearch,
      payload: { field: 'name', value: e.target.value },
    })
  }

  const handleChangeHp = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: Types.UpdateSearch,
      payload: { field: 'hp', value: e.target.value },
    })
  }

  const handleChangeRarity = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: Types.UpdateSearch,
      payload: { field: 'rarity', value: e.target.value },
    })
  }

  const handleClickSearch = () => {
    dispatch({
      type: Types.UpdateURL,
      payload: {
        params: {
          ...state.search.value,
          page: 1,
        },
      },
    })
  }

  const handleTextFieldKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClickSearch()
    }
  }

  const displaySearchForm = state.search.toggle ? 'block' : 'none'

  return (
    <section
      className={classes.formContainer}
      style={{ display: displaySearchForm }}
    >
      <TextField
        type="text"
        name="searchBox"
        id="searchBox"
        inputProps={{ 'data-testid': 'searchBox' }}
        value={state.search.value.name}
        placeholder="Search by"
        className={classes.field}
        onKeyPress={handleTextFieldKeyPress}
        onChange={handleChangeSearchBox}
      />

      <Select
        value={state.search.value.rarity}
        onChange={handleChangeRarity}
        inputProps={{
          'data-testid': 'searchFieldRarity',
          className: classes.rarityField,
        }}
        className={classes.field}
      >
        <MenuItem value="">Select a Rarity</MenuItem>
        <MenuItem value="common">Common</MenuItem>
        <MenuItem value="uncommon">Uncommon</MenuItem>
        <MenuItem value="rare">Rare</MenuItem>
        <MenuItem value="holo rare">Holo Rare</MenuItem>
        <MenuItem value="reverse holo">Reverse Holo</MenuItem>
        <MenuItem value="full art holo">Full Art Holo</MenuItem>
        <MenuItem value="ultra rare">Ultra Rare</MenuItem>
        <MenuItem value="secret rare">Secret Rare</MenuItem>
        <MenuItem value="promo">Promo</MenuItem>
      </Select>

      <Input
        value={state.search.value.hp}
        onChange={handleChangeHp}
        type="number"
        inputProps={{
          'data-testid': 'searchFieldHp',
          className: classes.hpField,
        }}
        className={classes.field}
      />

      <Button
        variant="outlined"
        onClick={handleClickSearch}
        data-testid="searchButton"
      >
        Search
      </Button>
    </section>
  )
}

export default SearchFrom
