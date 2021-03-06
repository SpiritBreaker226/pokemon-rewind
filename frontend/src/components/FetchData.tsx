import React, { FunctionComponent, useContext, useEffect } from 'react'

import axios from 'axios'

import { Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { AppContext } from '../contexts/AppContext'

import { Types } from '../types/Actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      margin: theme.spacing(10),
      textAlign: 'center',
    },
  })
)

const FetchData: FunctionComponent = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({
          type: Types.UpdateLoading,
          payload: { isLoading: true },
        })

        if (state.method === 'DELETE') {
          await axios.delete(state.urlToEndpoint)

          dispatch({
            type: Types.UpdateCards,
            payload: {
              cards: [],
              pagination: 1,
              isLoading: false,
            },
          })

          return
        }

        const res =
          state.method === 'POST'
            ? await axios.post(state.urlToEndpoint)
            : await axios.get(state.urlToEndpoint)

        if (!res) throw new Error('Unable to Retrive Data')

        dispatch({
          type: Types.UpdateCards,
          payload: {
            cards: res.data.cards.data,
            pagination: res.data.pagination,
            isLoading: false,
          },
        })
      } catch (error) {
        dispatch({
          type: Types.UpdateErrorMessageFromServer,
          payload: {
            isLoading: false,
            errorMessage: error.message,
          },
        })
      }
    }

    fetchData()
  }, [dispatch, state.urlToEndpoint, state.method])

  if (state.isLoading)
    return (
      <div className={classes.message}>
        <Typography variant="h6">Loading...</Typography>
      </div>
    )
  if (state.errorMessage) {
    return (
      <div className={classes.message}>
        <Typography variant="h6" color="error">
          {state.errorMessage}
        </Typography>
      </div>
    )
  }

  return null
}

export default FetchData
