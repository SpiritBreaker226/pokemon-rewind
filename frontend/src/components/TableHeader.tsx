import React, { useContext } from 'react'

import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core'

import { AppContext } from '../contexts/AppContext'

import { Types } from '../types/Actions'
import { Direction } from '../types/CardQuery'

const headers = [
  { name: 'Name', sortByField: '' },
  { name: 'National Pokedex Number', sortByField: '' },
  { name: 'Subtype', sortByField: '' },
  { name: 'Supertype', sortByField: '' },
  { name: 'HP', sortByField: '' },
  { name: 'Artist', sortByField: '' },
  { name: 'Converted Retreat Cost', sortByField: '' },
  { name: 'Evolves From', sortByField: '' },
  { name: 'Number', sortByField: '' },
  { name: 'Rarity', sortByField: '' },
  { name: 'Series', sortByField: '' },
  { name: 'Set', sortByField: '' },
  { name: 'Set Code', sortByField: '' },
]

const TableHeader = () => {
  const { state, dispatch } = useContext(AppContext)
  const handleOnClick = (sortByField: string) => {
    let dir: Direction =
      state.sorting.dir && state.sorting.dir === 'asc' ? 'desc' : 'asc'

    // reset direction on field change
    if (sortByField !== state.sorting.fieldName) dir = 'asc'

    dispatch({
      type: Types.UpdateURL,
      payload: {
        params: {
          sort_by: sortByField,
          sort_by_dir: dir,
          page: state.pagination.current_page.toString(),
        },
      },
    })

    dispatch({
      type: Types.UpdateSorting,
      payload: {
        sorting: {
          fieldName: sortByField,
          dir,
        },
      },
    })
  }

  return (
    <TableHead>
      <TableRow>
        {headers.map(({ name, sortByField }) => (
          <TableCell component="th" key={name}>
            {sortByField ? (
              <TableSortLabel
                data-testid={sortByField}
                active={sortByField === state.sorting.fieldName}
                direction={
                  sortByField === state.sorting.fieldName
                    ? state.sorting.dir
                    : 'asc'
                }
                onClick={() => handleOnClick(sortByField)}
              >
                {name}
              </TableSortLabel>
            ) : (
              name
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeader
