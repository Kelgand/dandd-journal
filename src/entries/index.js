import { connect } from 'react-redux';

import Entries from './entries.jsx';

const mapStateToProps = state => ({
 ...state
})

export default connect(mapStateToProps)(Entries);