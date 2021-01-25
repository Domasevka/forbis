import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTable } from '../actions'

import Menu from '../components/Menu/Menu'
import './style.css'

class App extends Component {

	componentDidMount() {
    const { dispatch } = this.props
		dispatch(getTable())
		setInterval(() => dispatch(getTable()), 10000);		
  }

	compareBy = (key) => {
		return function (a, b) {
		if (a[key] < b[key]) return -1;
		if (a[key] > b[key]) return 1;
		return 0;
		};
  }
	
	
	renderTableData = (tableItems) => {
			if (tableItems) {
					const arrayConvert = Object.keys(tableItems).map(function(category) {
					return tableItems[category];
				});	
				const sortedTable = arrayConvert.sort(this.compareBy('rate'))
				
				return sortedTable.map((item, index) => {
					const { code, symbol, rate, description, rate_float } = item
					return (
						 <tr key={code}>
								<td>{code}</td>
								<td>{symbol}</td>
								<td>{rate}</td>
								<td>{description}</td>
								<td>{rate_float}</td>
						 </tr>
					)
			 })
			} 
		 }

    render(){
			const { tableItems } = this.props
			const currentData = tableItems && tableItems.tableItems;
			const lastUpdated = tableItems && tableItems.lastUpdated;
			const isFetching = tableItems && tableItems.isFetching;

      return(
        <>
				<div>
					<Menu /> 
				</div>
					
				<div>
					<h3 id='title'>Table</h3>
					<p>
						{lastUpdated &&
							<span>
								Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
								{' '}
							</span>
						}
					</p>
					{!currentData
						? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
						: <div style={{ opacity: isFetching ? 0.5 : 1 }}>
							<table id='table'>
								<thead>
									<tr>
										<th>Сode</th>
										<th>Symbol</th>
										<th>Rate</th>
										<th>Description</th>
										<th>Rate float</th>
									</tr>
								</thead>
								<tbody>
									{this.renderTableData(currentData)}
								</tbody>
							</table>
							</div>
					}
				</div>	
        </>
      )
		}
	}
	
	const mapStateToProps = state => {
		const { tableInfo } = state

		const { isFetching, lastUpdated, tableItems } = tableInfo || {
			isFetching: true,
			items: []	
		}
	
		return {
			lastUpdated,
			isFetching,
			tableItems
		}
	}
export default  hot(connect(mapStateToProps)(App));
