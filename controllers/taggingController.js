const { Tagging } = require('../models');

class TaggingController {
  static getAllTagging = async (req, res) => {
    try {
      const response = await Tagging.findAll()
      console.log(response);
      res.status(200).json({
        success: true,
        data: {
          code: 200,
          message: 'Success',
          data: response
        }
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: 'Internal server error',
          data: err
        }
      })
    }
  }

  static addTagging = async (req, res) => {
    try {
      const payload = {
        nama_tagging: req.body.nama_tagging
      }
     
      const response = await Tagging.create(payload);

      res.status(201).json({
        success: true,
        data: {
          code: 201,
          message: 'Data tagging berhasil ditambahkan',
          data: response
        }
      })
    } catch (err) {
      if (err.name === 'SequelizeDatabaseError') {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: 'Periksa kembali data Anda!',
            data: err.message
          }
        })
      } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: 'Nama notulen sudah terdaftar'
          }
        })
      } else {
        res.status(500).json({
          success: false,
          data: {
            code: 500,
            message: 'Internal server error',
            data: err
          }
        })
      }
    }
  }
}

module.exports = TaggingController