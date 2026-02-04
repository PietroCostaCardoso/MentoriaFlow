import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './MentoriaDetails.module.css'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MentoriaDetails() {
  const [mentorship, setMentorship] = useState({})
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get(`/mentorships/${id}`).then((response) => {
      setMentorship(response.data.mentorship)
    })
  }, [id])

  async function schedule() {
    let msgType = 'success'

    const data = await api
      .patch(`mentorships/schedule/${mentorship._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

  return (
    <>
      {mentorship.title && (
        <section className={styles.mentoria_details_container}>
          <div className={styles.mentoriadetails_header}>
            <h1>Conhecendo a Mentoria: {mentorship.title}</h1>
            <p>Se tiver interesse, marque uma reunião para conhecê-la!</p>
          </div>
          <div className={styles.mentoria_images}>
            {mentorship.images.map((image, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_API}/images/mentorships/${image}`}
                alt={mentorship.title}
              />
            ))}
          </div>
          <p>
            <span className="bold">Preço:</span> R${mentorship.price}
          </p>
          <p>
            <span className="bold">Duração:</span> {mentorship.duration}
          </p>
          {token ? (
            <button onClick={schedule}>Solicitar Agendamento</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              solicitar a mentoria.
            </p>
          )}
        </section>
      )}
    </>
  )
}

export default MentoriaDetails
