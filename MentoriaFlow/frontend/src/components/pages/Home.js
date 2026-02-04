import api from '../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Home.module.css'

function Home() {
  const [mentorships, setMentorships] = useState([])

  useEffect(() => {
    api.get('/mentorships').then((response) => {
      console.log('Mentorias recebidas na Home:', response.data.mentorships)
      setMentorships(response.data.mentorships)
    })
  }, [])

  return (
    <section>
      <div className={styles.mentorship_home_header}>
        <h1>Encontre uma Mentoria</h1>
        <p>Veja os detalhes e conheça o mentor ideal para você</p>
      </div>
      <div className={styles.mentorship_container}>
        {mentorships.length > 0 &&
          mentorships.map((mentorship) => (
            <div className={styles.mentorship_card} key={mentorship._id}>
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/mentorships/${
                    mentorship.images && mentorship.images.length > 0 ? mentorship.images[0] : ''
                  })`,
                }}
                className={styles.mentorship_card_image}
              ></div>
              <h3>{mentorship.title}</h3>
              <p>
                <span className="bold">Preço:</span> R${mentorship.price}
              </p>
              {mentorship.available ? (
                <Link to={`/mentorship/${mentorship._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.mentorship_closed_text}>Encerrada!</p>
              )}
            </div>
          ))}
        {mentorships.length === 0 && (
          <p>Não há mentorias cadastradas ou disponíveis no momento!</p>
        )}
      </div>
    </section>
  )
}

export default Home
