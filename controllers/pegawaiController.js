const e = require('express');
const { Pegawai, Perangkat_Daerah } = require('../models');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const axios = require('axios');

class PegawaiController {
  static getAllPegawai = async (req, res) => {
    try {
      const response = await Pegawai.findAll({
        include: [{
          model: Perangkat_Daerah,
          attributes: ['nama_opd']
        }],
        attributes: {
          exclude: ['password'],
        }
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
          data: err.message
        }
      })
    }
  }

  static getProfile = async (req, res) => {
    try {
      const data = req.decoded;

      res.status(200).json({
        success: true,
        data: {
          code: 200,
          message: 'Success',
          data: data
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

  static getOnePegawai = async (req, res) => {
    try {
      const response = await Pegawai.findOne({
        where: { nip: req.params.nip },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        },
        include: [{
          model: Perangkat_Daerah,
        }]
      })

      if (response === null) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: 'ID pegawai tidak ditemukan!',
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
          data: err.message
        }
      })
    }
  }

  static syncDataPegawai = async (req, res) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    try {
      const fetchPegawai = await axios({
        method: 'post',
        url: `https://skp.madiunkota.go.id/api/data-pegawai-all/${req.body.kode_opd}/2023/${currentMonth}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": 'application/x-www-form-urlencoded'
        },
        data: {
          username: 'bappeda',
          password: 'bapp7832KH'
        }
      })

      if (fetchPegawai.data.status) {
        fetchPegawai.data.data.map(el => {
          Pegawai.findOrCreate({
            where: {
              nip: el.nip
            },
            defaults: {
              nama: el.nama,
              nip: el.nip,
              password: 'Bappeda@123',
              pangkat: el.pangkat,
              nama_pangkat: el.namapangkat,
              jabatan: el.jabatan,
              role: 1,
              kode_opd: el.unit_id,
            }
          })
            .then(_ => {
              res.status(200).json({
                success: true,
                data: {
                  code: 200,
                  message: 'Success',
                  data: 'Success add pegawai'
                }
              })
            })
            .catch(err => {
              res.status(500).json({
                success: false,
                data: {
                  code: 500,
                  message: 'Jaringan server error',
                  data: err.message
                }
              })
            })
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

  static login = async (req, res) => {
    try {
      const user = await Pegawai.findOne({
        where: { nip: req.body.nip }
      })

      if (!user) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: 'NIP tidak ditemukan'
          }
        })
      }

      const comparedPassword = comparePassword(req.body.password, user.dataValues.password);

      if (!comparedPassword) {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: 'Password yang Anda masukkan salah'
          }
        })
      }

      const access_token = generateToken({
        id: user.id,
        nama: user.nama,
        nip: user.nip,
        pangkat: user.pangkat,
        namaPangkat: user.nama_pangkat,
        posisi: user.jabatan,
        role: user.role,
      })

      res.status(200).json({
        success: true,
        data: {
          code: 200,
          message: "Success",
          data: {
            access_token
          }
        }
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: "Internet server error",
          data: err
        }
      })
    }
  }
}

module.exports = PegawaiController;