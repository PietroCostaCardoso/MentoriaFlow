const router = require('express').Router()

const MentorController = require('../controllers/MentorController')

// middlewares
const verifyToken = require('../helpers/check-token')
const { imageUpload } = require('../helpers/image-upload')

router.post(
  '/create',
  verifyToken,
  imageUpload.array('images'),
  MentorController.create,
)
router.get('/', MentorController.getAll)
router.get('/mymentorships', MentorController.getAllUserMentorships)
router.get('/myschedulings', verifyToken, MentorController.getAllUserSchedulings)
router.get('/:id', MentorController.getMentorshipById)
router.delete('/:id', verifyToken, MentorController.removeMentorshipById)
router.patch(
  '/:id',
  verifyToken,
  imageUpload.array('images'),
  MentorController.updateMentorship,
)
router.patch('/schedule/:id', verifyToken, MentorController.schedule)
router.patch('/conclude/:id', verifyToken, MentorController.concludeMentorship)

module.exports = router
