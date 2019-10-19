import React from 'react';
import { connect } from 'react-redux';

import './year.css';

class Year extends React.Component{
	constructor(props){
		super(props);
	};
	
	render(){
		const { year, months, setDate } = this.props;
		return(
			<div className="yearContainer">
				<div className="year" onClick={() => setDate(parseInt(year), null)}>
					{year}
				</div>
				<div className="months">
					{
						months.map((month, index) => {
							return (
								<div className="month" key={month.name} onClick={() => setDate(parseInt(year), index)}>
									{month.name}
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
 ...state
})

export default connect(mapStateToProps)(Year);