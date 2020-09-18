import React, { useContext } from 'react'

import { Grid, Button } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { Types } from '../types/Actions'

import { AppContext } from '../contexts/AppContext'

const useStyles = makeStyles(() =>
  createStyles({
    control: {
      textAlign: 'right',
      padding: '0.12em 0 0 0',
    },
  })
)

const Control = () => {
  const classes = useStyles()

  const { state, dispatch } = useContext(AppContext)

  if (state.isLoading) return null

  const handleClickBackUp = () => {
    dispatch({
      type: Types.BackUpFromAPI,
      payload: {
        method: 'POST',
      },
    })
  }

  const handleClickBackUpPurge = () => {
    dispatch({
      type: Types.PurgeBackUp,
      payload: {
        method: 'DELETE',
      },
    })
  }

  return (
    <section className={classes.control}>
      <Grid container>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            data-testid="control_backup_create"
            color="primary"
            onClick={handleClickBackUp}
          >
            Create Backup
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            data-testid="control_backup_purge"
            color="secondary"
            onClick={handleClickBackUpPurge}
          >
            Purge Backup
          </Button>
        </Grid>
      </Grid>
    </section>
  )
}

export default Control
