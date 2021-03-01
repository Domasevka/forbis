import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { getTable } from '../actions'

import Menu from '../components/Menu/Menu'
import './style.css'

const Home = () => {
  const dispatch = useDispatch();
  const lastUpdated = useSelector(state => state.tableInfo.tableItems);
  const isFetching = useSelector(state => state.tableInfo.isFetching);
  const tableItems = useSelector(state => state.tableInfo.tableItems || []);

  useEffect(() => {
    dispatch(getTable());

    const interval = setInterval(() => {
      dispatch(getTable());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);


	const compareBy = (key) => {
		return function (a, b) {
		if (a[key] < b[key]) return -1;
		if (a[key] > b[key]) return 1;
		return 0;
		};
  }
	
	const renderTableData = (tableItems) => {
    console.log('tableItems', tableItems.tableItems)
    if (tableItems && tableItems.tableItems) {
      const arrayConvert = Object.keys(tableItems.tableItems).map(function(category) {
        return tableItems.tableItems[category];
      });	
      console.log("arrayConvert", arrayConvert)
      const sortedTable = arrayConvert.sort(compareBy('rate'))
      
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
      }
      )
    } 
  }
	 
  return (
    <>
    <div>
      <Menu /> 
    </div>
      
    <div>
      <h3 id='title'>Table</h3>
      <p>
        {lastUpdated && lastUpdated.lastUpdated &&
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            {' '}
          </span>
        }
      </p>
      {!tableItems && tableItems.tableItems 
        ? (isFetching && isFetching.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
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
              {renderTableData(tableItems)}
            </tbody>
          </table>
          </div>
      }
    </div>	
    </>
  )
}

export default hot(Home);
