import React from 'react'

import { Grid, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import FetchData from './components/FetchData'
import CardTable from './components/CardTable'
import Search from './components/Search'
import Control from './components/Control'
import ErrorBoundary from './components/ErrorBoundary'

import { AppProvider } from './contexts/AppContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBody: {
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },

    headerActions: {
      marginTop: theme.spacing(1),
    },

    header: {
      backgroundColor: theme.palette.secondary.main,
      padding: theme.spacing(2),
    },
  })
)

function App() {
  const classes = useStyles()

  return (
    <main>
      <ErrorBoundary>
        <AppProvider>
          <header className={classes.header}>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="h1">Pokemon Rewind</Typography>
              </Grid>
              <Grid item xs={4} className={classes.headerActions}>
                <Search />
              </Grid>
              <Grid item xs={4} className={classes.headerActions}>
                <Control />
              </Grid>
            </Grid>
          </header>

          <div className={classes.appBody}>
            <CardTable />
            <FetchData />
          </div>
        </AppProvider>
      </ErrorBoundary>
    </main>
  )
}

export default App
