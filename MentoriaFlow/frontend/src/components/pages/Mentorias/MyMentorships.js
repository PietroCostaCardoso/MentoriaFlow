import api from '../../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'

import RoundedImage from '../../layout/RoundedImage'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyMentorships() {
  const [mentorships, setMentorships] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api
      .get('/mentorships/mymentorships', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setMentorships(response.data.mentorships)
      })
  }, [token])

  async function removeMentorship(id) {
    let msgType = 'success'

    const data = await api
      .delete(`/mentorships/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedMentorships = mentorships.filter((mentorship) => mentorship._id != id)
        setMentorships(updatedMentorships)
        return response.data
      })
      .catch((err) => {
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

  async function concludeMentorship(id) {
    let msgType = 'success'

    const data = await api
      .patch(`/mentorships/conclude/${id}`, {
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
    <section>
      <div className={styles.mentorshipslist_header}>
        <h1>Minhas Mentorias Cadastradas</h1>
        <Link to="/mentorship/create">Cadastrar Mentoria</Link>
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
              <div className={styles.actions}>
                {mentorship.available ? (
                  <>
                    {mentorship.mentee && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeMentorship(mentorship._id)
                        }}
                      >
                        Concluir mentoria
                      </button>
                    )}

                    <Link to={`/mentorship/edit/${mentorship._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removeMentorship(mentorship._id)
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Mentoria encerrada</p>
                )}
              </div>
            </div>
          ))}
        {mentorships.length === 0 && <p>Ainda não há mentorias cadastradas!</p>}
      </div>
    </section>
  )
}

export default MyMentorships
