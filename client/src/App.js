  import React from 'react'
  import { Container } from 'react-bootstrap'
  import { BrowserRouter, Route, Routes } from'react-router-dom'
  import ApolloProvider from './apolloProvider'

  import './App.scss'

  import Register from './pages/Register'
  import Home from './pages/Home'
  import Login from './pages/Login'

  function App() {
    return (
      <ApolloProvider>
        <BrowserRouter>
        <Container className="pt-5">
          <Routes>
            <Route path="/register" element={<Register/>} />
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </Container>
      </BrowserRouter>
      </ApolloProvider>
    )
  }
  export default App