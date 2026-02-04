import { useState } from 'react'

import formStyles from './Form.module.css'

import Input from './Input'
import Select from './Select'

function MentorshipForm({ handleSubmit, mentorshipData, btnText }) {
  const [mentorship, setMentorship] = useState(mentorshipData || {})
  const [preview, setPreview] = useState([])
  const categories = ['Desenvolvimento', 'Design', 'Negócios', 'Marketing', 'Idiomas']

  function onFileChange(e) {
    setPreview(Array.from(e.target.files))
    setMentorship({ ...mentorship, images: [...e.target.files] })
  }

  function handleChange(e) {
    setMentorship({ ...mentorship, [e.target.name]: e.target.value })
  }

  function handleCategory(e) {
    setMentorship({
      ...mentorship,
      category: e.target.options[e.target.selectedIndex].text,
    })
  }

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(mentorship)
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={mentorship.title}
                key={`${mentorship.title}+${index}`}
              />
            ))
          : mentorship.images &&
            mentorship.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/images/mentorships/${image}`}
                alt={mentorship.title}
                key={`${mentorship.title}+${index}`}
              />
            ))}
      </div>
      <Input
        text="Imagens da Mentoria"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Título da Mentoria"
        type="text"
        name="title"
        placeholder="Digite o título"
        handleOnChange={handleChange}
        value={mentorship.title || ''}
      />
      <Input
        text="Duração (ex: 2 meses)"
        type="text"
        name="duration"
        placeholder="Digite a duração"
        handleOnChange={handleChange}
        value={mentorship.duration || ''}
      />
      <Input
        text="Preço"
        type="number"
        name="price"
        placeholder="Digite o preço"
        value={mentorship.price || ''}
        handleOnChange={handleChange}
      />
      <Select
        name="category"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={mentorship.category || ''}
      />
      <input type="submit" value={btnText} />
    </form>
  )
}

export default MentorshipForm
