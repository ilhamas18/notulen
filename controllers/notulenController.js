const { Notulen, Pegawai, Perangkat_Daerah } = require('../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

class NotulenController {
  static getAllNotulen = async (req, res) => {
    try {
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
      const response = await Notulen.findAll({
        where: {
          id_pegawai: +req.body.id_pegawai
        }
      })
      res.status(200).json({
        success: true,
        data: {
          code: 200,
          message: "Success",
          data: response
        }
      })
    } catch (err) {
      console.log(err, '<<<< err');
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
      console.log(err.message, '<<<<<<<,');
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
        id_pegawai: req.body.id_pegawai
      }
      // console.log(payload);
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
      console.log(err.message);
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
}

module.exports = NotulenController;