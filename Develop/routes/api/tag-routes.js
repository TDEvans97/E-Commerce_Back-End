const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all the tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Find a single tag by its ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
    include: [{model: Product}]
  });
  res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try { 
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update tag name by ID
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(updateTag);
  } catch (error) {
    res.status(400).json({ message: "Failed to update the tag." })
  }
});

router.delete('/:id', async (req, res) => {
  // Delete tag by ID
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(deleteTag);
  } catch (error) {
    res.status(400).json({ message: "Failed to delete the tag." })
  }
});

module.exports = router;