import CreateBand from '../components/create-band'
import { createBand } from '../store/actions/create-band'
import { connect } from 'react-redux'

const mapStateToProps = state => state.createBand

const mapDispatchToProps = dispatch => ({
  create: () => dispatch(createBand())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBand)
