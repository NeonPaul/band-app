import enums from '../../enums'

export const types = enums(
  'BAND_DATA', 'SONG_ADDED'
)

export const bandData  = payload => ({
  type: types.BAND_DATA,
  payload
})

export const songAdded = song => ({
  type: types.SONG_ADDED,
  song
})

export const addSong = (id, song) =>
  dispatch => {
    console.log(song)
    fetch('/api/' + id + '/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(song)
    }).then(
      () => dispatch(songAdded(song))
    )
  }

export const loadBand = id =>
  dispatch => {
    fetch('/api/' + id)
    .then(
      res => res.json()
    ).then(
      json => dispatch(bandData(json))
    )
  }
