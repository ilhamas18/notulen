const { Notulen, Pegawai, Perangkat_Daerah, Sasaran, Sasaran_Notulen } = require("../models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const aws = require("aws-sdk");
const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

class NotulenController {
  static getAllNotulen = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Notulen.findAll({
          order: [["createdAt", "DESC"]],
        });

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
            data: response,
          },
        });
      } else if (req.decoded.role == 4) {
        const response = await Notulen.findAll({
          where: {
            id_pegawai: req.decoded.id,
          },
          order: [["createdAt", "DESC"]],
        });

        res.status(200).json({
          success: true,
          data: {
            code: 200,
            message: "Success",
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
  };

  static getAuthNotulen = async (req, res) => {
    try {
      if (req.decoded.role == 1) {
        const response = await Notulen.findAll({
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
            },
            {
              model: Sasaran,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
          ],
          where: {
            bulan: req.params.bulan,
            tahun: req.params.tahun,
          },
        });

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
      } else if (req.decoded.role == 2) {
        const response = await Notulen.findAll({
          where: {
            kode_opd: req.params.kode_opd,
            bulan: req.params.bulan,
            tahun: req.params.tahun,
          },
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
            },
            {
              model: Sasaran,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
          ],
          order: [["createdAt", "DESC"]],
        });
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
      } else if (req.decoded.role == 3) {
        const response = await Notulen.findAll({
          order: [["createdAt", "DESC"]],
          where: {
            kode_opd: req.params.kode_opd,
            nip_atasan: req.decoded.nip,
            bulan: req.params.bulan,
            tahun: req.params.tahun,
          },
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
            },
            {
              model: Sasaran,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
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
      } else if (req.decoded.role == 4) {
        const response = await Notulen.findAll({
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
            },
            {
              model: Sasaran,
              attributes: {
                exclude: [['createdAt', 'updatedAt']]
              }
            },
          ],
          where: {
            nip_pegawai: req.decoded.nip,
            bulan: req.params.bulan,
            tahun: req.params.tahun,
          },
          order: [["createdAt", "DESC"]],
        });

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
          success: true,
          data: {
            code: 401,
            message: "Unauthorized",
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
          data: err.message,
        },
      });
    }
  };

  static getOneNotulen = async (req, res) => {
    try {
      const response = await Notulen.findOne({
        where: { id: +req.params.id },
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
          },
          {
            model: Sasaran,
            attributes: {
              exclude: [['createdAt', 'updatedAt']]
            }
          },
        ],
      });

      if (response === null) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID Laporan tidak ditemukan!",
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
  };

  static downloadFile = async (req, res) => {
    res.download(req.query.pathname)
  };

  static deleteFile = async (req, res) => {
    await unlinkAsync(req.query.pathname);
  };

  static addNotulen = async (req, res) => {
    try {
      if (req.decoded.role == 3 || req.decoded.role == 4) {
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
          atasan: req.body.atasan,
          status: req.body.status,
          hari: req.body.hari,
          bulan: req.body.bulan,
          tahun: req.body.tahun,
          id_sasaran: req.body.id_sasaran,
          link_img_surat_undangan: req.body.link_img_surat_undangan,
          link_img_daftar_hadir: req.body.link_img_daftar_hadir,
          link_img_spj: req.body.link_img_spj,
          link_img_foto: req.body.link_img_foto,
          link_img_pendukung: req.body.link_img_pendukung,
          signature: req.body.signature,
          kode_opd: req.body.kode_opd,
          nip_pegawai: req.body.nip_pegawai,
          nip_atasan: req.body.nip_atasan,
        };
        const response = await Notulen.create(payload);

        res.status(201).json({
          success: true,
          data: {
            code: 201,
            message: "Data notulen berhasil ditambahkan",
            data: response,
          },
        });
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
    } catch (err) {
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
    }
  };

  static addTagging = async (req, res) => {
    try {
      const payload = {
        tagging: req.body.tagging,
      };

      const response = await Notulen.update(payload, {
        where: { id: +req.params.id },
      });

      if (response[0] == 0) {
        res.status(404).json({
          success: false,
          data: {
            code: 404,
            message: "ID notulen tidak ditemukan!",
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
  };

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
        hari: req.body.hari,
        bulan: req.body.bulan,
        tahun: req.body.tahun,
        link_img_surat_undangan: req.body.link_img_surat_undangan,
        link_img_daftar_hadir: req.body.link_img_daftar_hadir,
        link_img_spj: req.body.link_img_spj,
        link_img_foto: req.body.link_img_foto,
        link_img_pendukung: req.body.link_img_pendukung,
        kode_opd: req.body.kode_opd,
        nip_pegawai: req.body.nip_pegawai,
        nip_atasan: req.body.nip_atasan,
      };

      if (req.body.status !== "Disetujui") {
        const response = await Notulen.update(payload, {
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
      } else {
        res.status(400).json({
          success: false,
          data: {
            code: 400,
            message: "Tidak bisa mengedit notulen yang sudah disetujui!",
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        data: {
          code: 500,
          message: "Internal server error",
          data: err,
        },
      });
    }
  };

  static updateStatus = async (req, res) => {
    try {
      const payload = {
        status: req.body.status,
        keterangan: req.body.keterangan
      };

      const response = await Notulen.update(payload, {
        where: { id: +req.params.id },
      });

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
  };

  static syncSasaran = async (req, res) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://kak.madiunkota.go.id/api/skp/sasaran_kinerja_pegawai.json',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": 'application/x-www-form-urlencoded'
        },
        data: {
          nip: req.body.nip,
          tahun: req.body.tahun
        }
      })

      res.status(200).json({
        success: true,
        data: {
          code: 200,
          message: 'Success',
          data: response.data
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

  static addSasaran = (req, res) => {
    if (req.decoded.role == 3 || req.decoded.role == 4) {
      req.body.map(el => {
        Sasaran.findOrCreate({
          where: {
            id_sasaran: el.id_sasaran
          },
          defaults: {
            id_sasaran: el.id_sasaran,
            sasaran: el.sasaran,
            nama_pembuat: el.nama_pembuat
          }
        })
          .then(async () => {
            try {
              const payload = {
                id_sasaran: el.id_sasaran,
                id_notulen: el.id_notulen
              }
              const response = await Sasaran_Notulen.create(payload);

              res.status(200).json({
                success: true,
                data: {
                  code: 200,
                  message: 'Success',
                  data: response.data
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
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              data: {
                code: 500,
                message: 'Internal server error',
                data: err
              }
            })
          })
      })
    } else {
      res.status(401).json({
        success: false,
        data: {
          code: 401,
          message: "Unauthorize",
          data: null
        }
      })
    }
  }

  static deleteSasaran = (req, res) => {
    if (req.decoded.role == 3 || req.decoded.role == 4) {
      Sasaran_Notulen.destroy({
        where: { id_sasaran: req.body.id_sasaran }
      })
        .then(async () => {
          try {
            const response = Sasaran.destroy({
              where: { id_sasaran: req.body.id_sasaran }
            })

            res.status(200).json({
              success: true,
              data: {
                code: 200,
                message: 'Success',
                data: response.data
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
        })
        .catch(err => {
          res.status(500).json({
            success: false,
            data: {
              code: 500,
              message: 'Internal server error',
              data: err
            }
          })
        })
    }
  }
}

module.exports = NotulenController;
