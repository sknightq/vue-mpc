/**
 * Don't use this file !!!
 * Create some request for platform's request. After registing in * platform, platform will request this dev server to get menu.
 * 公司定制化东西，不要用这个！！！
 * 创建了几个用于平台的请求。
 * 当devServer注册到平台后，平台会向devServer 请求相关菜单配置
 */
const cors = require('cors')
const requests = [
  {
    url: '/api/mod/about',
    file: '../src/static/scripts/about.json',
    type: 'application/json;charset=utf-8'
  },
  {
    url: '/api/mod/mainmenu',
    file: '../src/static/scripts/mainMenu.json',
    type: 'application/json;charset=utf-8'
  },
  {
    url: '/api/mod/submenu',
    file: '../src/static/scripts/subMenu.json',
    type: 'application/json;charset=utf-8'
  }
]

const corsJson = {
  origin: 'http://somedomain:30000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'P3P'],
  credentials: true,
  optionsSuccessStatus: 204
}
module.exports = app => {
  for (let i = 0; i < requests.length; i++) {
    const url = requests[i].url
    // const type = paltformRequests[i].type
    const file = require(requests[i].file)
    app.use(url, cors(corsJson), function(req, res) {
      res.json(file)
    })
  }
}
