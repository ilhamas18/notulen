const { Uuid, Peserta } = require('../models');

class PesertaController {
  static addPeserta = async (req, res) => {
    if (req.decoded.role == 2 || req.decoded.role == 3 || req.decoded.role == 4) {
      Uuid.findOrCreate({
        where: {
          uuid: req.body.uuid
        },
        defaults: {
          uuid: req.body.uuid,
          hari: req.body.hari,
          bulan: req.body.bulan,
          tahun: req.body.tahun,
          kode_opd: req.body.kode_opd,
          nip_pegawai: req.body.nip_pegawai
        }
      })
        .then(_ => {
          const payload = {
            uuid: req.body.uuid,
            jumlah_peserta: req.body.jumlah_peserta,
            jenis_peserta: req.body.jenis_peserta,
            tanggal: req.body.tanggal
          }

          Peserta.create(payload)
            .then(response => {
              res.status(201).json({
                success: true,
                data: {
                  code: 201,
                  message: "Jumlah peserta berhasil ditambahkan",
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
                    message: "Nama notulen sudah terdaftar",
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
    } else {
      res.status(401).json({
        success: false,
        data: {
          code: 404,
          message: 'Unauthorized',
          data: null
        }
      })
    }
  }
}

module.exports = PesertaController;