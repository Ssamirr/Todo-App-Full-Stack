const express = require('express')
const { todoController } = require('../controller/todosController')
const router = express.Router()



router.get('/',todoController.getAll)
router.post('/',todoController.add)
router.get('/:id',todoController.getById)
router.delete('/:id',todoController.delete)
router.put('/:id',todoController.update)



module.exports = router;