//import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';;
import FormPage from './pages/FormPage';
import { DataProvider } from './compPages/DataContext';

function App() {
  return (
    <DataProvider>
      <div>

        <Routes>

          <Route path="/" element={<FormPage />} />

        </Routes>
      </div>
    </DataProvider>
  )
}

export default App
