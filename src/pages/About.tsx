import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import React from 'react'
import styles from './About.module.scss'
import FFlagTypeChip from '../components/FFlagTypeChip'

function Section ({ title, paragraphs, variant }: {title: string, paragraphs: (string | JSX.Element)[], variant?: 'h4' | 'h5'}) {
  return (
    <React.Fragment>
      <Typography variant={variant || 'h4'} style={{
        paddingTop: variant === 'h5' ? 0 : 30
      }}>{title}</Typography>
      {paragraphs.map(p => (
        <Typography paragraph style={{
          fontSize: 16,
          paddingTop: 10
        }}>
        {p}
        </Typography>
      ))}
    </React.Fragment>
  )
}

export default function About () {
  return (
    <Grid container justify='center' className={styles.about}>
      <Grid item xs={12} lg={5} md={8}>
        <Paper style={{
          padding: 40
        }}>
          <Typography variant='h3'>Roblox FFlag Watcher</Typography>
          <Typography variant='subheading'>By <Link href='https://eryn.io'>evaera</Link></Typography>

          <Grid container justify='center' alignContent='center' spacing={16}>
            <Grid item xs={6} style={{
              textAlign: 'right'
            }}>
              <Button variant='raised' color='primary' href='https://github.com/evaera/Roblox-FFlag-Watcher'>GitHub Repository</Button>
            </Grid>
            <Grid item xs={6} style={{
              textAlign: 'left'
            }}>
              <Button variant='raised' color='secondary' href='https://www.patreon.com/erynlynn'>Support on Patreon</Button>
            </Grid>
          </Grid>

          <Section
            title='What is a Fast Flag?'
            paragraphs={[
              'The Roblox engine uses a system called Fast Flags as part of its deployment process. When code is shipped, not all of it is active by default. Rather, the changes are suppressed by flags that are dynamically enabled and disabled, even after the code is live on production.'
            ]}
          />
          <Section
            title='Types of Fast Flags'
            paragraphs={[
              "There are several different kinds of Fast Flags. However, it's possible to separate them into two groups: Dynamic Fast Flags (DFFlags)and regular Fast Flags (FFlags).",
              <Section
                title='Fast Flags'
                variant='h5'
                paragraphs={[
                  'Standard FFlags are fetched on client startup and do not change thereafter.',
                  <div>
                    {FFlagTypeChip('Flag')}
                    {' '}
                    {FFlagTypeChip('Int')}
                    {' '}
                    {FFlagTypeChip('String')}
                    {' '}
                    {FFlagTypeChip('Log')}
                  </div>
                ]}
              />,
              <Section
                title='Dynamic Fast Flags'
                variant='h5'
                paragraphs={[
                  'DFFlags are fetched every 5 minutes and can change any number of times while the game is running.',
                  <div>
                    {FFlagTypeChip('Dynamic Flag')}
                    {' '}
                    {FFlagTypeChip('Dynamic Int')}
                    {' '}
                    {FFlagTypeChip('Dynamic String')}
                    {' '}
                    {FFlagTypeChip('Dynamic Log')}
                  </div>
                ]}
              />,
              <Section
                title='Synchronized Fast Flags'
                variant='h5'
                paragraphs={[
                  'SFFlags are synced to the client from the server. They are fetched at server startup, and the client receives whatever value the server currently has.',
                  <div>
                    {FFlagTypeChip('Synced Flag')}
                  </div>
                ]}
              />
            ]}
          />

        </Paper>
      </Grid>
    </Grid>
  )
}
