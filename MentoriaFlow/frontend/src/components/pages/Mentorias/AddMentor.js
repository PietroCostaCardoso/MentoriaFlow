import api from '../../../utils/api'

import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './AddMentor.module.css'

import MentorshipForm from '../../form/MentorForm'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddMentoria() {
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const history = useHistory()

  async function registerMentorship(mentorship) {
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
      .post(`mentorships/create`, formData, {
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
    history.push('/mentorship/mymentorships')
  }

  return (
    <section>
      <div className={styles.addmentor_header}>
        <h1>Cadastre uma Mentoria</h1>
        <p>Depois ela ficará disponível para agendamento</p>
      </div>
      <MentorshipForm handleSubmit={registerMentorship} btnText="Cadastrar" />
    </section>
  )
}

export default AddMentoria
