const Identity = require("../model/IdentityModel");

// Getting All identity cards
const getCards = async (req, res) => {
  try {
    const cards = await Identity.find({});
    res.status(200).json({
      cards,
    });
  } catch (error) {
    console.error("Error getting identity cards:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Getting a single identity card by ID
const getCard = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const card = await Identity.findById(id);
      if (card) {
        res.status(200).json({
          card,
        });
      } else {
        res.status(404).json({
          message: "Card not found",
        });
      }
    } else {
      res.status(400).json({
        message: "ID is required",
      });
    }
  } catch (error) {
    console.error("Error getting identity card:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Creating a new identity card
const createCard = async (req, res) => {
  try {
    const { name, description, social, interest } = req.body;
    if (name && description) {
      const newIdentity = await Identity.create({
        name,
        description,
        social,
        interest,
      });
      res.status(201).json({
        message: "Identity Card Created Successfully",
      });
    } else {
      res.status(400).json({
        message: "Name and Description are required fields",
      });
    }
  } catch (error) {
    console.error("Error creating identity card:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Update identity card
const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const cardExist = await Identity.findById(id);
      if (cardExist) {
        const { name, description, social, interest } = req.body;
        if (name && description) {
          await Identity.updateOne(
            { _id: id },
            {
              name,
              description,
              social,
              interest,
            }
          );
          res.status(200).json({
            message: "Identity Card Updated Successfully",
          });
        } else {
          res.status(400).json({
            message: "Name and Description are required fields",
          });
        }
      } else {
        res.status(404).json({
          message: "Card not found",
        });
      }
    } else {
      res.status(400).json({
        message: "ID is required",
      });
    }
  } catch (error) {
    console.error("Error updating identity card:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Delete identity card
const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const card = await Identity.findByIdAndDelete(id);
      if (card) {
        res.status(200).json({
          message: "Card deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "Card not found",
        });
      }
    } else {
      res.status(400).json({
        message: "ID is required",
      });
    }
  } catch (error) {
    console.error("Error deleting identity card:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
};
