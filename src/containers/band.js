import Band from '../components/band'
import { addSong, loadBand } from '../store/actions/band'
import { connect } from 'react-redux'

const mapStateToProps = state => state.band

const mapDispatchToProps = dispatch => ({
  addSong: (id, pay) => dispatch(addSong(id, pay)),
  loadBand: id => dispatch(loadBand(id))
})

const mergeProps = (state, dispatch, own) =>
  Object.assign({ id: own.match.params.id }, state, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Band)
