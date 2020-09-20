import React, { useContext, ChangeEvent, KeyboardEvent } from 'react'

import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { Types } from '../types/Actions'

import { AppContext } from '../contexts/AppContext'
import { HTMLSelectElement, SearchParamsToServer } from '../types/Search'

const useStyles = makeStyles(() =>
  createStyles({
    searchText: {
      paddingTop: '0.2em',
      marginRight: '1em',
    },
  })
)

const SearchFrom = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)

  const handleChangeSearchBox = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch({
      type: Types.UpdateSearch,
      payload: { value: e.target.value },
    })
  }

  const handleClickSearch = () => {
    const params: SearchParamsToServer = {
      value: {},
      page: 1,
    }
    const fieldName = state.search.field || 'name'

    params.value[fieldName] = state.search.value[fieldName]

    dispatch({
      type: Types.UpdateURL,
      payload: {
        params,
      },
    })
  }

  const handleTextFieldKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClickSearch()
    }
  }

  const handleFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: Types.UpdateSearchField,
      payload: { field: e.target.value },
    })
  }

  const displaySearchForm = state.search.toggle ? 'block' : 'none'
  const displaySearchField = (fieldName: string): string =>
    state.search.field === fieldName ? 'block' : 'none'

  return (
    <section style={{ display: displaySearchForm }}>
      <InputLabel htmlFor="fieldLabel" id="fieldLabel">
        Choose a Search Type
      </InputLabel>
      <Select
        labelId="fieldLabel"
        value={state.search.field}
        onChange={handleFieldChange}
        inputProps={{ 'data-testid': 'searchFieldSelect' }}
      >
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="rarity">Rarity</MenuItem>
        <MenuItem value="hp">Hit Point</MenuItem>
      </Select>

      <TextField
        type="text"
        name="searchBox"
        id="searchBox"
        inputProps={{ 'data-testid': 'searchBox' }}
        value={state.search.value.name}
        placeholder="Search by"
        className={classes.searchText}
        onKeyPress={handleTextFieldKeyPress}
        onChange={handleChangeSearchBox}
        style={{ display: displaySearchField('name') }}
      />

      <Select
        value={state.search.value.rarity}
        onChange={handleChangeSearchBox}
        inputProps={{ 'data-testid': 'searchFieldRarity' }}
        style={{ display: displaySearchField('rarity') }}
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
        onChange={handleChangeSearchBox}
        type="number"
        inputProps={{ 'data-testid': 'searchFieldHp' }}
        style={{ display: displaySearchField('hp') }}
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
