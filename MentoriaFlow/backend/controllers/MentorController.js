const Mentorship = require('../models/Mentorship')

// helpers
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class MentorController {
  // create 
  static async create(req, res) {
    const title = req.body.title
    const duration = req.body.duration
    const description = req.body.description
    const price = req.body.price
    const category = req.body.category
    const images = req.files
    const available = true

    // console.log(req.body)
    console.log(images)
    // return

    // validations
    if (!title) {
      res.status(422).json({ message: 'O título é obrigatório!' })
      return
    }

    if (!duration) {
      res.status(422).json({ message: 'A duração é obrigatória!' })
      return
    }

    if (!price) {
      res.status(422).json({ message: 'O preço é obrigatório!' })
      return
    }

    if (!category) {
      res.status(422).json({ message: 'A categoria é obrigatória!' })
      return
    }

    if (!images || images.length === 0) {
      res.status(422).json({ message: 'A imagem é obrigatória!' })
      return
    }

    // get user
    const token = getToken(req)
    const user = await getUserByToken(token, res)

    if (!user) {
      return
    }

    // create mentorship
    const mentorship = new Mentorship({
      title: title,
      duration: duration,
      description: description,
      price: price,
      category: category,
      available: available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    })

    images.forEach((image) => {
      mentorship.images.push(image.filename)
    })

    try {
      const newMentorship = await mentorship.save()
      console.log('Nova mentoria salva no banco:', newMentorship)

      res.status(201).json({
        message: 'Mentoria cadastrada com sucesso!',
        newMentorship: newMentorship,
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  // get all registered mentorships
  static async getAll(req, res) {
    const mentorships = await Mentorship.find().sort('-createdAt')

    res.status(200).json({
      mentorships: mentorships,
    })
  }

  // get all user mentorships
  static async getAllUserMentorships(req, res) {
    // get user
    const token = getToken(req)
    const user = await getUserByToken(token, res)

    if (!user) {
      return
    }

    const mentorships = await Mentorship.find({ 'user._id': user._id })

    res.status(200).json({
      mentorships: mentorships,
    })
  }

  // get all user schedulings
  static async getAllUserSchedulings(req, res) {
    // get user
    const token = getToken(req)
    const user = await getUserByToken(token, res)

    if (!user) {
      return
    }

    const mentorships = await Mentorship.find({ 'adopter._id': user._id })

    res.status(200).json({
      mentorships: mentorships,
    })
  }

  // get a specific mentorship
  static async getMentorshipById(req, res) {
    const id = req.params.id

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // check if mentorship exists
    const mentorship = await Mentorship.findOne({ _id: id })

    if (!mentorship) {
      res.status(404).json({ message: 'Mentoria não encontrada!' })
      return
    }

    res.status(200).json({
      mentorship: mentorship,
    })
  }

  // remove a mentorship
  static async removeMentorshipById(req, res) {
    const id = req.params.id

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // check if mentorship exists
    const mentorship = await Mentorship.findOne({ _id: id })

    if (!mentorship) {
      res.status(404).json({ message: 'Mentoria não encontrada!' })
      return
    }

    // check if user registered this mentorship
    const token = getToken(req)
    const user = await getUserByToken(token, res)

    if (!user) {
      return
    }

    if (mentorship.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    await Mentorship.findByIdAndRemove(id)

    res.status(200).json({ message: 'Mentoria removida com sucesso!' })
  }

  // update a mentorship
  static async updateMentorship(req, res) {
    const id = req.params.id
    const title = req.body.title
    const duration = req.body.duration
    const description = req.body.description
    const price = req.body.price
    const category = req.body.category
    const images = req.files
    const available = req.body.available

    const updateData = {}

    // check if mentorship exists
    const mentorship = await Mentorship.findOne({ _id: id })

    if (!mentorship) {
      res.status(404).json({ message: 'Mentoria não encontrada!' })
      return
    }

    // check if user registered this mentorship
    const token = getToken(req)
    const user = await getUserByToken(token, res)

    if (!user) {
      return
    }

    if (mentorship.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    // validations
    if (!title) {
      res.status(422).json({ message: 'O título é obrigatório!' })
      return
    } else {
      updateData.title = title
    }

    if (!duration) {
      res.status(422).json({ message: 'A duração é obrigatória!' })
      return
    } else {
      updateData.duration = duration
    }

    if (!price) {
      res.status(422).json({ message: 'O preço é obrigatório!' })
      return
    } else {
      updateData.price = price
    }

    if (!category) {
      res.status(422).json({ message: 'A categoria é obrigatória!' })
      return
    } else {
      updateData.category = category
    }

    if (images && images.length > 0) {
      updateData.images = []
      images.forEach((image) => {
        updateData.images.push(image.filename)
      })
    }

    if (available === undefined) {
      res.status(422).json({ message: 'O status é obrigatório!' })
      return
    } else {
      updateData.available = available
    }

    updateData.description = description

    await Mentorship.findByIdAndUpdate(id, updateData)

    res.status(200).json({ mentorship: mentorship, message: 'Mentoria atualizada com sucesso!' })
  }

  // schedule a visit
  static async schedule(req, res) {
    const id = req.params.id

    // check if mentorship exists
    const mentorship = await Mentorship.findOne({ _id: id })

    // check if user owns this mentorship
    const token = getToken(req)
    const user = await getUserByToken(token, res)

    if (!user) {
      return
    }

    console.log(mentorship)

    if (mentorship.user._id.equals(user._id)) {
      res.status(422).json({
        message: 'Você não pode agendar sua própria Mentoria!',
      })
      return
    }

    // check if user has already scheduled this mentorship
    if (mentorship.adopter) {
      if (mentorship.adopter._id.equals(user._id)) {
        res.status(422).json({
          message: 'Você já agendou esta Mentoria!',
        })
        return
      }
    }

    // add user to mentorship
    mentorship.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    }

    console.log(mentorship)

    await Mentorship.findByIdAndUpdate(mentorship._id, mentorship)

    res.status(200).json({
      message: `A mentoria foi agendada com sucesso, entre em contato com ${mentorship.user.name} no telefone: ${mentorship.user.phone}`,
    })
  }

  // conclude a mentorship
  static async concludeMentorship(req, res) {
    const id = req.params.id

    // check if mentorship exists
    const mentorship = await Mentorship.findOne({ _id: id })

    mentorship.available = false

    await Mentorship.findByIdAndUpdate(mentorship._id, mentorship)

    res.status(200).json({
      mentorship: mentorship,
      message: `Parabéns! O ciclo de mentoria foi finalizado com sucesso!`,
    })
  }
}
