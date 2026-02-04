import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'

/* components */
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Message from './components/layout/Message'
import Container from './components/layout/Container'

/* pages */
import Home from './components/pages/Home'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Profile from './components/pages/User/Profile'
import MyMentorships from './components/pages/Mentorias/MyMentorships'
import AddMentoria from './components/pages/Mentorias/AddMentor'
import EditMentoria from './components/pages/Mentorias/EditMentoria'
import MentoriaDetails from './components/pages/Mentorias/MentoriaDetails'
import MyMentoria from './components/pages/Mentorias/MyMentoria'

/* contexts */
import { UserProvider } from './context/UserContext'
function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/user/profile">
              <Profile />
            </Route>
            <Route path="/mentorship/create">
              <AddMentoria />
            </Route>
            <Route path="/mentorship/edit/:id">
              <EditMentoria />
            </Route>
            <Route path="/mentorship/mymentorships">
              <MyMentorships />
            </Route>
            <Route path="/mentorship/mymentoria">
              <MyMentoria />
            </Route>
            <Route path="/mentorship/:id">
              <MentoriaDetails />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  )
}

export default App
