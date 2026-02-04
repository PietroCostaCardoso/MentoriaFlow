import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'

import RoundedImage from '../../layout/RoundedImage'

function MyMentoria() {
  const [mentorships, setMentorships] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    if (!token) return

    api
      .get('/mentorships/myschedulings', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setMentorships(response.data.mentorships)
      })
  }, [token])

  return (
    <section>
      <div className={styles.mentorshipslist_header}>
        <h1>Minhas Mentorias Agendadas</h1>
      </div>
      <div className={styles.mentorshipslist_container}>
        {mentorships.length > 0 &&
          mentorships.map((mentorship) => (
            <div key={mentorship._id} className={styles.mentorshiplist_row}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/mentorships/${mentorship.images[0]}`}
                alt={mentorship.title}
                width="px75"
              />
              <span className="bold">{mentorship.title}</span>
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para:</span> {mentorship.user.phone}
                </p>
                <p>
                  <span className="bold">Fale com:</span> {mentorship.user.name}
                </p>
              </div>
              <div className={styles.actions}>
                {mentorship.available ? (
                  <p>Mentoria em andamento</p>
                ) : (
                  <p>Mentoria concluída</p>
                )}
              </div>
            </div>
          ))}
        {mentorships.length === 0 && <p>Ainda não há mentorias agendadas!</p>}
      </div>
    </section>
  )
}

export default MyMentoria
