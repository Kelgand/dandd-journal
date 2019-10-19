import { connect } from 'react-redux';

import Calendar from './calendar.jsx';

const mapStateToProps = state => ({
 ...state
})

export default connect(mapStateToProps)(Calendar);