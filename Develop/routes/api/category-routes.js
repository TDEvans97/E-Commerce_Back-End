const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find all Categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Find one Category (and its associated Products) by its ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new Category
router.post('/', async (req, res) => {
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json({ message: "Could not create a new category." });
  }
});

// Update a Category by its ID
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(400).json({ message: "Could not update the category." });
  }
});

// Remove a Category by its ID
router.delete('/:id', async (req, res) => {
  try {
    const removeCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(removeCategory);
  } catch (error) {
    res.status(400).json({ message: "Could not remove the category." });
  }
});

module.exports = router;
