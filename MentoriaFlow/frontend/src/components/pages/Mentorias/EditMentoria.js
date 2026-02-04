import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styles from './AddMentor.module.css'

import MentorshipForm from '../../form/MentorForm'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function EditMentoria() {
  const [mentorship, setMentorship] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api
      .get(`/mentorships/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setMentorship(response.data.mentorship)
      })
  }, [token, id])

  async function updateMentorship(mentorship) {
    let msgType = 'success'

    const formData = new FormData()

    await Object.keys(mentorship).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < mentorship[key].length; i++) {
          formData.append(`images`, mentorship[key][i])
        }
      } else {
        formData.append(key, mentorship[key])
      }
    })

    const data = await api
      .patch(`mentorships/${mentorship._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
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
      <div className={styles.addmentor_header}>
        <h1>Editando a Mentoria: {mentorship.title}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
      {mentorship.title && (
        <MentorshipForm handleSubmit={updateMentorship} mentorshipData={mentorship} btnText="Editar" />
      )}
    </section>
  )
}

export default EditMentoria
