import React, { useContext } from 'react'

import { Button } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { Types } from '../types/Actions'

import { AppContext } from '../contexts/AppContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    control: {
      textAlign: 'right',
      padding: '0.12em 0 0 0',
    },

    link: {
      backgroundColor: '#0078fd',
      padding: '0.5em 0.8em',
      textDecoration: 'none',
      color: '#fff',
      cursor: 'pointer',
      textAlign: 'center',
      fontWeight: 500,
      lineHeight: '32px',
      border: 'none',
      borderRadius: '4px',

      '&:hover': {
        backgroundColor: '#3290fc',
        textDecoration: 'none',
      },
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

  return (
    <section className={classes.control}>
      <Button
        variant="outlined"
        data-testid="control_backup_create"
        color="primary"
        onClick={handleClickBackUp}
      >
        Create Backup
      </Button>

      <Button
        variant="outlined"
        data-testid="control_backup_purge"
        color="primary"
      >
        Purge Backup
      </Button>
    </section>
  )
}

export default Control
