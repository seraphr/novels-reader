export default class Narou {
  constructor() {
    this.targetHostname = 'ncode.syosetu.com'
    this.readElemtns = {
      title: $('.novel_subtitle'),
      foreword: $('#novel_p p'),
      body: $('#novel_honbun p'),
      afterword: $('#novel_a p')
    }
    this.highlightElements = $('.novel_subtitle, #novel_p p, #novel_honbun p, #novel_a p')
    this.novelId = $('.contents1 .margin_r20').attr('href').replace(/\//g, '')
    this.novelName = $('.contents1 .margin_r20').text()
  }
}