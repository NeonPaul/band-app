import enums from '../../enums'

// Define actions and types for weather
export const types = enums(
  'CREATE_BAND'
)

export const bandCreated = createdId => ({
  type: types.CREATE_BAND,
  createdId
})

export const createBand = () =>
  dispatch => {
    fetch('/api', {
      method: 'POST'
    }).then(
      res => dispatch(bandCreated(res.headers.get('Location')))
    )
  }
