import React, { useContext } from 'react'

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { Card, Stats } from '../types/Cards'
import { Types } from '../types/Actions'

import { AppContext } from '../contexts/AppContext'

import TableHeader from './TableHeader'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    notFound: {
      margin: theme.spacing(10),
      textAlign: 'center',
    },
    pagination: {
      margin: theme.spacing(2),
      float: 'right',
    },
  })
)

const CardTable = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)

  if (state.isLoading || state.errorMessage) return null

  if (state.cards.length === 0) {
    return (
      <section className={classes.notFound}>
        <Typography variant="h4">No Cards Found</Typography>
      </section>
    )
  }

  const handleChangePage = (e: unknown, newPage: number) => {
    dispatch({
      type: Types.UpdateURL,
      payload: {
        params: { page: newPage.toString() },
      },
    })
  }

  return (
    <section>
      <TableContainer>
        <Table>
          <TableHeader />

          <TableBody>
            {state.cards.map((card: Card, cardIndex) => {
              const stats: Stats = card.attributes

              return (
                <TableRow key={`${stats.set_code}${stats.number}${cardIndex}`}>
                  {Object.values(stats).map((value, index) => (
                    <TableCell
                      data-testid={`${stats.set_code}${stats.number}${value}${index}`}
                      key={`${stats.set_code}${stats.number}${value}${index}`}
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {state.pagination.page_total > 1 && (
        <Pagination
          data-testid="pagination"
          className={classes.pagination}
          shape="rounded"
          count={state.pagination.page_total}
          page={Number(state.pagination.current_page)}
          onChange={handleChangePage}
        />
      )}
    </section>
  )
}

export default CardTable
