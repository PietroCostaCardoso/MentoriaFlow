import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react'

import styles from './Navbar.module.css'

import Self from '../../assets/img/self-development.png'

/* contexts */
import { Context } from '../../context/UserContext'

/* hooks */

function Navbar() {
  const { authenticated, logout } = useContext(Context)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Self} alt="" />
        <h2>MentoriaFlow</h2>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
      <ul className={`${styles.list} ${menuOpen ? styles.active : ''}`}>
        <li>
          <Link to="/" onClick={toggleMenu}>
            Explorar
          </Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/mentorship/mymentoria" onClick={toggleMenu}>
                Sua trilha
              </Link>
            </li>
            <li>
              <Link to="/mentorship/mymentorships" onClick={toggleMenu}>
                Minhas mentorias
              </Link>
            </li>
            <li>
              <Link to="/user/profile" onClick={toggleMenu}>
                Meu Perfil
              </Link>
            </li>
            <li onClick={() => { logout(); toggleMenu(); }}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={toggleMenu}>Entrar</Link>
            </li>
            <li>
              <Link to="/register" onClick={toggleMenu}>Registar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
