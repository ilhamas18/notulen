const { Perangkat_Daerah, Pegawai } = require('../models');

class OPDController {
  static getOneOPDWithPegawai = async (req, res) => {
    try {
      const response = await Perangkat_Daerah.findOne({
        where: { kode_opd: req.params.kode_opd },
        include: [{
          model: Pegawai,
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        }]
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
}

module.exports = OPDController;