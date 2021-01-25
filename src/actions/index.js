export const REQUEST_PAGE = 'REQUEST_PAGE'
export const RECEIVE_PAGE = 'RECEIVE_PAGE'

export const REQUEST_TABLE = 'REQUEST_TABLE'
export const RECEIVE_TABLE = 'RECEIVE_TABLE'


export const requestPage = () => ({
  type: REQUEST_PAGE
})

export const receivePage = (html) => ({
  type: RECEIVE_PAGE,
  htmlDoc: html
})

export const requestTable = () => ({
  type: REQUEST_TABLE,
})

export const receiveTable = (json) => ({
  type: RECEIVE_TABLE,
  tableItems: json.bpi,
  receivedAt: Date.now()
})


const fetchHtml = (url) => dispatch => {
console.log('url', url)
const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
  dispatch(requestPage())
  return fetch(proxyurl + url)
    .then(response => response.text())
    .then(html => dispatch(receivePage(html)))
    //.then(html => console.log(html))
    .catch((error) => {
      console.error('Error:', error);
    });
}

const fetchTable = () => dispatch => {
  dispatch(requestTable())
  return fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`)
    .then(response => response.json())
    .then(json => dispatch(receiveTable(json)))
    .catch((error) => {
      console.error('Error:', error);
    });
}

export const getHtml = (url) => (dispatch) => {
  dispatch(fetchHtml(url))
}

export const getTable = () => (dispatch) => {
  dispatch(fetchTable())
}