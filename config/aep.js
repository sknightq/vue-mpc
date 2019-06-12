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
  // {
  //   url: '/api/mod/svcadv',
  //   file: '',
  //   type: ''
  // },
  // {
  //   url: '/api/mod/maplayers',
  //   file: '',
  //   type: ''
  // }
]

const corsJson = {
  origin: 'http://dev.azuratech.com:30000',
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
