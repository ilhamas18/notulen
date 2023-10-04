const { Pegawai } = require('../models');

class PegawaiController {
  static getAllPegawai = async (req, res) => {
    try {
      const response = await Pegawai.findAll({
        attributes: {
          exclude: ['password']
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
          data: err
        }
      })
    }
  }
}

module.exports = PegawaiController;