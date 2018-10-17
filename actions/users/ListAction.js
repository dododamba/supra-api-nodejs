const joi = require('joi')
const BaseAction = require('../BaseAction')
const UserDAO = require('../../dao/UserDAO')

/**
 * @description return users list
 */
class ListAction extends BaseAction {
  static get accessTag () {
    return 'users:list'
  }

  static get validationRules () {
    return {
      query: joi.object().keys({
        ...this.baseValidationRules.query,
        filter: joi.object().keys({
          username: joi.string().min(3)
        })
      })
    }
  }

  static async run (req, res) {
    const { query } = req
    const data = await UserDAO.BaseGetList({ ...query })
    res.header('X-Total-Count', data.total)
    res.json(this.resJson({ data: data.results }))
  }
}

module.exports = ListAction
