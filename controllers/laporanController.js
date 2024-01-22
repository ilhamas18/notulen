const { Uuid, Perangkat_Daerah, Pegawai, Undangan, Notulen } = require('../models');
const { Op } = require("sequelize");

class LaporanController {
  static getAllLaporan = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Uuid.findAll({
          where: {
            // bulan: req.params.bulan,
            // tahun: req.params.tahun,
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ['nama_opd']
            },
            {
              model: Pegawai,
              attributes: ['nama', 'nip']
            },
            {
              model: Undangan,
              required: false,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Notulen,
              required: false,
              where: {
                status: {
                  [Op.not]: 'archive'
                }
              },
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            }
          ]
        })

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
            data: response,
          },
        });
      } else if (req.decoded.role == 2) {
        const response = await Uuid.findAll({
          where: {
            kode_opd: req.params.kode_opd,
            // bulan: req.params.bulan,
            // tahun: req.params.tahun,
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ['nama_opd']
            },
            {
              model: Pegawai,
              attributes: ['nama', 'nip']
            },
            {
              model: Undangan,
              required: false,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Notulen,
              required: false,
              where: {
                status: {
                  [Op.not]: 'archive'
                }
              },
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            }
          ]
        })

        if (response === null) {
          res.status(404).json({
            success: false,
            data: {
              code: 404,
              message: "Undangan tidak ditemukan!",
              data: response,
            },
          });
        } else {
          res.status(200).json({
            success: true,
            data: {
              code: 200,
              message: "Success",
              data: response,
            },
          });
        }
      } else if (req.decoded.role == 3 || req.decoded.role == 4) {
        const response = await Uuid.findAll({
          where: {
            nip_pegawai: req.decoded.nip,
            // bulan: req.params.bulan,
            // tahun: req.params.tahun,
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ['nama_opd']
            },
            {
              model: Pegawai,
              attributes: ['nama', 'nip']
            },
            {
              model: Undangan,
              required: false,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Notulen,
              required: false,
              where: {
                status: {
                  [Op.not]: 'archive'
                }
              },
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            }
          ]
        })

        if (response === null) {
          res.status(404).json({
            success: false,
            data: {
              code: 404,
              message: "Notulen tidak ditemukan!",
              data: response,
            },
          });
        } else {
          res.status(200).json({
            success: true,
            data: {
              code: 200,
              message: "Success",
              data: response,
            },
          });
        }
      } else {
        res.status(401).json({
          success: false,
          data: {
            code: 401,
            message: "Unauthorized",
            data: null,
          },
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: "Internal server error",
          data: err.message,
        },
      });
    }
  }
}

module.exports = LaporanController;