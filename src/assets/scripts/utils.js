export default {
  objectToparams: function(obj) {
    var params = ''
    Object.keys(obj).forEach(function(value, index) {
      if (index === 0) {
        params = '?' + value + '=' + obj[value]
      } else {
        params = params + '&' + value + '=' + obj[value]
      }
    })
    return params
  }
}
