const { Notulen, Pegawai, Perangkat_Daerah } = require('../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const aws = require('aws-sdk')

class NotulenController {
  static getAllNotulen = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Notulen.findAll({
          order: [['createdAt', 'DESC']],
        })

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Success',
            data: response
          }
        })
      } else if (req.decoded.role == 4) {
        const response = await Notulen.findAll({
          where: {
            id_pegawai: req.decoded.id
          },
          order: [['createdAt', 'DESC']],
        })

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

  static getAuthNotulen = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Notulen.findAll({
          order: [['createdAt', 'DESC']],
        })

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Success',
            data: response
          }
        })
      } else if (req.decoded.role == 2 || req.decoded.role == 3) {
        const response = await Notulen.findAll({
          where: {
            kode_opd: req.params.kode_opd
          },
          order: [['createdAt', 'DESC']],
        })
        console.log(response);
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Success',
            data: response
          }
        })
      } else if (req.decoded.role == 4) {
        const response = await Notulen.findAll({
          where: {
            id_pegawai: req.decoded.id
          },
          order: [['createdAt', 'DESC']],
        })

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
          data: err.message
        }
      })
    }
  }

  static getOneNotulen = async (req, res) => {
    try {
      const response = await Notulen.findOne({
        where: { id: +req.params.id },
        include: [
          {
            model: Pegawai,
            attributes: {
              attributes: ['nama', 'nip', 'pangkat'],
            },
            // include: {
            //   model: Perangkat_Daerah,
            //   attributes: {
            //     exclude: [['createdAt', 'updatedAt']]
            //   }
            // }
          }
        ]
      })

      if (response === null) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: 'ID Laporan tidak ditemukan!',
            data: response
          }
        })
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

  static uploadFile = async (req, res, next) => {
    try {
      res.status(201).json({
        success: true,
        data: {
          code: 201,
          message: 'Sukses upload file',
          data: 'Success ' + req.file.location + ' location!'
        }
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: 'Internal server error',
          data: err.message
        }
      })
    }
  }

  static downloadFile = async (req, res) => {
    const s3 = new aws.S3();
    try {
      const filename = req.params.filename
      let x = await s3.getObject({ Bucket: "basarnas-bucket", Key: filename }).promise();
      res.send(x.Body)
    } catch (err) {
      console.log(err.message, '<<<< yuhu');
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: 'Internal server error',
          data: err.message
        }
      })
    }
  }

  static deleteFile = async (req, res) => {
    const s3 = new aws.S3();
    try {
      const filename = req.params.filename
      await s3.deleteObject({ Bucket: "basarnas-bucket", Key: filename }).promise();
      res.send("File Deleted Successfully")
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: 'Internal server error',
          data: err.message
        }
      })
    }
  }

  static addNotulen = async (req, res) => {
    try {
      const payload = {
        tagging: req.body.tagging,
        tanggal: req.body.tanggal,
        waktu: req.body.waktu,
        pendahuluan: req.body.pendahuluan,
        pimpinan_rapat: req.body.pimpinan_rapat,
        peserta_rapat: req.body.peserta_rapat,
        isi_rapat: req.body.isi_rapat,
        tindak_lanjut: req.body.tindak_lanjut,
        lokasi: req.body.lokasi,
        acara: req.body.acara,
        pelapor: req.body.pelapor,
        atasan: req.body.atasan,
        status: req.body.status,
        bulan: req.body.bulan,
        link_img_surat_undangan: req.body.link_img_surat_undangan,
        link_img_daftar_hadir: req.body.link_img_daftar_hadir,
        link_img_spj: req.body.link_img_spj,
        link_img_foto: req.body.link_img_foto,
        link_img_pendukung: req.body.link_img_pendukung,
        kode_opd: req.body.kode_opd,
        id_pegawai: req.body.id_pegawai
      }
      
      const response = await Notulen.create(payload);
     
      res.status(201).json({
        success: true,
        data: {
          code: 201,
          message: 'Data notulen berhasil ditambahkan',
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
            data: null
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

  static addTagging = async (req, res) => {
    try {
      const payload = {
        tagging: req.body.tagging
      }

      const response = await Notulen.update(payload, {
        where: { id: +req.params.id }
      })

      if (response[0] == 0) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: 'ID notulen tidak ditemukan!'
          }
        })
      } else {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Berhasil update data pegawai',
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

  static editNotulen = async (req, res) => {
    try {
      const payload = {
        tagging: req.body.tagging,
        tanggal: req.body.tanggal,
        waktu: req.body.waktu,
        pendahuluan: req.body.pendahuluan,
        pimpinan_rapat: req.body.pimpinan_rapat,
        peserta_rapat: req.body.peserta_rapat,
        isi_rapat: req.body.isi_rapat,
        tindak_lanjut: req.body.tindak_lanjut,
        lokasi: req.body.lokasi,
        acara: req.body.acara,
        pelapor: req.body.pelapor,
        atasan: req.body.atasan,
        status: req.body.status,
        bulan: req.body.bulan,
        link_img_surat_undangan: req.body.link_img_surat_undangan,
        link_img_daftar_hadir: req.body.link_img_daftar_hadir,
        link_img_spj: req.body.link_img_spj,
        link_img_foto: req.body.link_img_foto,
        link_img_pendukung: req.body.link_img_pendukung,
      }

      // const response = await 
    } catch (error) {

    }
  }

  static updateStatus = async (req, res) => {
    try {
      const payload = {
        status: req.body.status
      }

      const response = await Notulen.update(payload, {
        where: { id: +req.params.id }
      })

      if (response[0] == 0) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: 'ID Komponen tidak ditemukan!'
          }
        })
      } else {
        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: 'Berhasil update data pegawai',
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
}

module.exports = NotulenController;