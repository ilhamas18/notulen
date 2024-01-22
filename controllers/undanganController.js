const { Uuid, Undangan, Perangkat_Daerah, Pegawai } = require('../models');
const { Op } = require("sequelize");

class UndanganController {
  static getAllUndangan = async (req, res) => {
    const currentYear = new Date().getFullYear();
    try {
      if (req.decoded.role == 1) {
        const response = await Undangan.findAll({
          where: {
            status: {
              [Op.not]: 'archive'
            },
            tahun: currentYear.toString()
          },
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ['nama_opd']
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
        const response = await Undangan.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            kode_opd: req.params.kode_opd,
            tahun: currentYear.toString()
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ['nama_opd']
            },
            {
              model: Pegawai,
              attributes: {
                exclude: [['createdAt', 'updatedAt', 'password']]
              }
            },
          ],
        })

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
            data: response,
          },
        });
      } else if (req.decoded.role == 3 || req.decoded.role == 4) {
        const response = await Undangan.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            nip_pegawai: req.decoded.nip,
            tahun: currentYear.toString()
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: ['nama_opd']
            },
            {
              model: Pegawai,
              attributes: {
                exclude: [['createdAt', 'updatedAt', 'password']]
              }
            },
          ],
        })

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
            data: response
          },
        });
      } else {
        res.status(401).json({
          success: false,
          data: {
            code: 401,
            message: "Unauthorized",
            data: err,
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

  static getAuthUndangan = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Undangan.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Pegawai,
              attributes: {
                exclude: [['createdAt', 'updatedAt', 'password']]
              }
            }
          ],
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            bulan: req.params.bulan,
            tahun: req.params.tahun,
          },
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
      } else if (req.decoded.role == 2) {
        const response = await Undangan.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            kode_opd: req.params.kode_opd,
            bulan: req.params.bulan,
            tahun: req.params.tahun,
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Pegawai,
              attributes: {
                exclude: [['createdAt', 'updatedAt', 'password']]
              }
            }
          ],
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
        const response = await Undangan.findAll({
          where: {
            status: {
              [Op.not]: 'archieve'
            },
            nip_pegawai: req.decoded.nip,
            bulan: req.params.bulan,
            tahun: req.params.tahun,
          },
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Perangkat_Daerah,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
            {
              model: Pegawai,
              attributes: {
                exclude: [['createdAt', 'updatedAt', 'password']]
              }
            }
          ],
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

  static addUndangan = (req, res) => {
    if (req.decoded.role == 2 || req.decoded.role == 3 || req.decoded.role == 4) {
      Uuid.findOrCreate({
        where: {
          uuid: req.body.uuid
        },
        defaults: {
          uuid: req.body.uuid,
          kode_opd: req.body.kode_opd,
          nip_pegawai: req.body.nip_pegawai
        }
      })
        .then(_ => {
          const payload = {
            uuid: req.body.uuid,
            nomor_surat: req.body.nomor_surat,
            sifat: req.body.sifat,
            perihal: req.body.perihal,
            ditujukan: req.body.ditujukan,
            pendahuluan: req.body.pendahuluan,
            tanggal: req.body.tanggal,
            waktu: req.body.waktu,
            tempat: req.body.tempat,
            acara: req.body.acara,
            penutup: req.body.penutup,
            status: req.body.status,
            hari: req.body.hari,
            bulan: req.body.bulan,
            tahun: req.body.tahun,
            atasan: req.body.atasan,
            kode_opd: req.body.kode_opd,
            nip_pegawai: req.body.nip_pegawai,
            nip_atasan: req.body.nip_atasan
          }

          Undangan.create(payload)
            .then(response => {
              res.status(201).json({
                success: true,
                data: {
                  code: 201,
                  message: "Data undangan berhasil ditambahkan",
                  data: response,
                },
              });
            })
            .catch(err => {
              if (err.name === "SequelizeDatabaseError") {
                res.status(400).json({
                  success: false,
                  data: {
                    code: 400,
                    message: "Periksa kembali data Anda!",
                    data: null,
                  },
                });
              } else if (err.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({
                  success: false,
                  data: {
                    code: 400,
                    message: "Nama undangan sudah terdaftar",
                  },
                });
              } else {
                res.status(500).json({
                  success: false,
                  data: {
                    code: 500,
                    message: "Internal server error",
                    data: err,
                  },
                });
              }
            })
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            data: {
              code: 500,
              message: "Internal server error",
              data: err,
            },
          });
        })
    } else {
      res.status(401).json({
        success: false,
        data: {
          code: 404,
          message: 'Unauthorize as Admin OPD',
          data: null
        }
      })
    }
  }
}

module.exports = UndanganController;