export default class Narou {
  constructor() {
    this.targetHostname = 'ncode.syosetu.com'
    this.targetElemtns = {
      title: $('.novel_subtitle'),
      foreword: $('#novel_p p'),
      body: $('#novel_honbun p'),
      afterword: $('#novel_a p')
    }
  }
}