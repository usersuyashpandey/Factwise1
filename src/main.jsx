import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CelebList from './CelebList'
import DataList from './DataList'
import './index.css'
import List from './List'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <List/> */}
    <DataList/>
    {/* <CelebList/> */}
  </React.StrictMode>,
)
