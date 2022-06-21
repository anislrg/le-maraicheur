/* eslint-disable consistent-return */
const models = require("../models");

class PictureController {
  static browse = (req, res) => {
    models.pictures
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.pictures
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = async (req, res) => {
    let picture = req.body;
    if (req.picture) {
      picture = req.picture;
    }

    const picturesIsValid = await models.pictures.validPicturesToCreate(
      picture
    );

    if (!picturesIsValid) {
      return res.status(400).send("You must provide all data to add a picture");
    }

    models.pictures
      .insert(picture)
      .then(([result]) => {
        return res.status(201).send({ ...picture, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        return res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.pictures
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  // static edit = (req, res) => {
  //   const pictures = req.body;

  //   // TODO validations (length, format...)

  //   pictures.id = parseInt(req.params.id, 10);

  //   models.pictures
  //     .update(pictures)
  //     .then(([result]) => {
  //       if (result.affectedRows === 0) {
  //         res.sendStatus(404);
  //       } else {
  //         res.sendStatus(204);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };

  // static editPicture = async (req, res) => {
  //   try {
  //     const [result] = await models.pictures.update({
  //       id: 3,
  //       file: req.picture.file,
  //       alt: req.picture.alt,
  //     });
  //     if (result.affectedRows === 0) {
  //       return res.status(404).send("Picture not found");
  //     }
  //     const [[pictureUpdated]] = await models.pictures.find(pictures.id);
  //     return res.status(201).json(pictureUpdated);
  //   } catch (err) {
  //     return res.status(500).send(err.message);
  //   }
  // };
}
module.exports = PictureController;
