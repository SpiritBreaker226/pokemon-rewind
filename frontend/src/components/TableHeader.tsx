import React from 'react'

import { TableHead, TableRow, TableCell } from '@material-ui/core'

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
  { name: 'Set Code', sortByField: '' },
]

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {headers.map(({ name }) => (
          <TableCell component="th" key={name}>
            {name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeader
