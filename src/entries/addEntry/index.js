import { connect } from 'react-redux';

import AddEntry from './addEntry.jsx';

const mapStateToProps = state => ({
 ...state
})

export default connect(mapStateToProps)(AddEntry);