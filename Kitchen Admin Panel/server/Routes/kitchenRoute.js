const express = require("express");
const Kitchen = require("../models/kitchen");
const router = express.Router();

router.get("/details", async (req, res) => {
  try {
    const details = await Kitchen.find();
    res.json(details);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/create", async (req, res) => {
  const post = new Kitchen({
    img: req.body.img,
    "kitchen name": req.body["kitchen name"],
    Owner: req.body.Owner,
    price: 15000,
    address: req.body.address,
    Phone: parseInt(req.body.Phone),
    email: req.body.email,
    FSSAI: parseInt(req.body.FSSAI),
    available: req.body.available,
    rating: 3,
    "prep time": parseInt(req.body["prep time"]),
    place: {
      "North Eastern": req.body.place["North Eastern"],
      Bengali: req.body.place.Bengali,
      Kashmiri: req.body.place.Kashmiri,
      "South Indian": req.body.place["South Indian"],
      Punjabi: req.body.place.Punjabi,
      Mahrastrian: req.body.place.Mahrastrian,
      Bihari: req.body.place.Bihari,
      Gujarati: req.body.place.Gujarati,
      Rajasthani: req.body.place.Rajasthani,
    },
    Order: {
      breakfast: {
        from: req.body.Order.breakfast.from,
        to: req.body.Order.breakfast.to,
      },
      lunch: {
        from: req.body.Order.lunch.from,
        to: req.body.Order.lunch.to,
      },
      hightea: {
        from: req.body.Order.hightea.from,
        to: req.body.Order.hightea.to,
      },
      dinner: {
        from: req.body.Order.dinner.from,
        to: req.body.Order.dinner.to,
      },
    },
  });

  try {
    const savedpost = await post.save();
    console.log(!success);
    res.json(savedpost);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/details/:postId", async (req, res) => {
  try {
    const details = await Kitchen.findById(req.params.postId);
    res.json(details);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const details = await Kitchen.findByIdAndUpdate(
      { _id: req.params.postId },
      {
        img: req.body.img,
        "kitchen name": req.body["kitchen name"],
        Owner: req.body.Owner,
        address: req.body.address,
        Phone: parseInt(req.body.Phone),
        email: req.body.email,
        FSSAI: parseInt(req.body.FSSAI),
        available: req.body.available,
        rating: parseInt(req.body.rating),
        "prep time": parseInt(req.body["prep time"]),
        place: {
          "North Eastern": req.body.place["North Eastern"],
          Bengali: req.body.place.Bengali,
          Kashmiri: req.body.place.Kashmiri,
          "South Indian": req.body.place["South Indian"],
          Punjabi: req.body.place.Punjabi,
          Mahrastrian: req.body.place.Mahrastrian,
          Bihari: req.body.place.Bihari,
          Gujarati: req.body.place.Gujarati,
          Rajasthani: req.body.place.Rajasthani,
        },
        Order: {
          breakfast: {
            from: req.body.Order.breakfast.from,
            to: req.body.Order.breakfast.to,
          },
          lunch: {
            from: req.body.Order.lunch.from,
            to: req.body.Order.lunch.to,
          },
          hightea: {
            from: req.body.Order.hightea.from,
            to: req.body.Order.hightea.to,
          },
          dinner: {
            from: req.body.Order.dinner.from,
            to: req.body.Order.dinner.to,
          },
        },
      },

      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
