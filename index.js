/* eslint-disable */
/**
 * depend options's path  change backgroud image url path
 * @type {*|{type, describe, group, requiresArg}|{this}}
 */
var postcss = require("postcss")
module.exports = postcss.plugin("postcss-assets-server-path", function (options) {
  options = options || {}
  return function (style, result) {
    style.walkDecls(/^(background-image|background)$/, function (decl) {
      var str = decl.value
      var regExp = /url\('(.*)'\)/g
      var paths = regExp.exec(str)
      if (paths && paths.length > 0) {
        var path = paths[1]
        var files = path.split('/')
        var filename = files[files.length - 1]
        var newPath = options.path + filename
        decl.value = str.replace(regExp, 'url(\'' + newPath + '\') ')
      }
    })
  }
})
