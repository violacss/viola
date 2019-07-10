const cosmiconfig = require('cosmiconfig')

export default class Core {
  config
  sassFuncs
  constructor() {
    this.config = this.getConfig()
    this.sassFuncs = []
  }

  getConfig() {
    const explorer = cosmiconfig('viola')
    return explorer.searchSync().config || {}
  }
}
