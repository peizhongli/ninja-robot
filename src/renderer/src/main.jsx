import '@renderer/assets/styles/base.less'

import React from 'react'
import ReactDOM from 'react-dom/client'
import Entry from './pages/Entry'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Entry />
  </React.StrictMode>
)
