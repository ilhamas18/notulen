const { Tagging } = require('../models');

class TaggingController {
  static getAllTagging = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Tagging.findAll()

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Success',
            data: response
          }
        })
      } else {
        const response = await Tagging.findAll({
          where: { kode_opd: req.params.kode_opd }
        })
        console.log(req.params.kode_opd, '<<< kode opd');
        if (response === null) {
          res.status(404).json({
            success: false,
            data: {
              code: 404,
              message: "ID Tagging tidak ditemukan!",
              data: response,
            },
          });
        } else {
          res.status(200).json({
            success: true,
            data: {
              code: 200,
              message: 'Success',
              data: response
            }
          })
        }
      }
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

  static getOneTagging = async (req, res) => {
    try {
      const response = await Tagging.findOne({
        where: { id: +req.params.id }
      })

      if (response === null) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID Tagging tidak ditemukan!",
            data: response,
          },
        });
      } else {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Success',
            data: response
          }
        })
      }
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
        nama_tagging: req.body.nama_tagging,
        kode_opd: req.body.kode_opd
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

  static editTagging = async (req, res) => {
    try {
      const payload = {
        nama_tagging: req.body.nama_tagging
      }

      const response = await Tagging.update(payload, {
        where: { id: +req.params.id },
      })

      if (response[0] == 0) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID Komponen tidak ditemukan!",
          },
        });
      } else {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Berhasil update data pegawai",
            data: response,
          },
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: "Internal server error",
          data: err,
        },
      });
    }
  }

  static deleteTagging = async (req, res) => {
    try {
      const response = await Tagging.destroy({
        where: { id: +req.params.id },
        returning: true
      })

      if (response == 1) {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Berhasil hapus data Program',
            data: response
          }
        })
      } else {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: 'ID Program tidak ditemukan!'
          }
        })
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: "Internal server error",
          data: err,
        },
      });
    }
  }
}

module.exports = TaggingController