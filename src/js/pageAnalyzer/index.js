import _assign from 'lodash/assign'
import narou from 'pageAnalyzer/narou'

export default class PageAnalyzer {
  constructor(hostname) {
    this.modules = [new narou]
    _assign(this, this.getTargetModule(hostname))
  }

  getTargetModule(hostname) {
    let targetModule = null
    this.modules.forEach(module => {
      if(hostname === module.targetHostname) {
        targetModule = module
      }
    })
    return targetModule
  }
}