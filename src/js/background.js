// for dev
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if(tab.url != 'chrome://extensions/') {
//     chrome.tabs.query({url: 'chrome://extensions/'}, (tabsInfo) => {
//       chrome.tabs.reload(tabsInfo[0].id)
//     })
//   }
// })

import OptionsManager from 'OptionsManager'
import DictionariesManager from 'DictionariesManager'
import _find from 'lodash/find'
import kuromoji from 'kuromoji'

let kuromojiObj;
let getKuromojiObj = function() {
	return kuromojiObj;
};
kuromoji.builder({
	dicPath : 'chrome-extension:///dict/'
}).build(function(error, tokenizer) {
	if (error != null) {
		console.log(error);
	}
	kuromojiObj = tokenizer;
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let om = new OptionsManager()
  let dm = new DictionariesManager()

  switch(request.method) {
    case 'getOptions':
      sendResponse(om.getInitOptions())
      break

    case 'saveDictionary':
      sendResponse({
        user: _find(dm.dictionaries, {id: 'user'}),
        ignoreRubies: _find(dm.dictionaries, {id: 'userIgnoreRubies'}),
        novel: dm.saveDictionary(request.dictionary)
      })
      break
    case 'runKuromoji':
      if (om.getInitOptions().enableKuromoji != "on" || kuromojiObj === void 0) {
        sendResponse(request.linesInfo)
      } else {
        let linesInfo = request.linesInfo
        linesInfo.forEach((lineInfo) => {
          let tokens = kuromojiObj.tokenize(lineInfo.text)
          let converted = tokens.reduce((acc, token) => {
            if (token.pronunciation !== void 0) {
              // 通常は発音を採用
              return acc + token.pronunciation
            } else {
              // 発音がなかったらもとの文字列のまま
              return acc + token.surface_form
            }
          }, '')

          lineInfo.text = converted
        })

        sendResponse(linesInfo)
      }
      break
    default:
      sendResponse(false)
  }
});
