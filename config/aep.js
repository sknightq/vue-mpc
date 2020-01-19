/**
 * Don't use this file !!!
 * Create some request for platform's request. After registing in * platform, platform will request this dev server to get menu.
 * 公司定制化东西，不要用这个！！！
 * 创建了几个用于平台的请求。
 * 当devServer注册到平台后，平台会向devServer 请求相关菜单配置
 */
const path = require('path')
const cors = require('cors')
const axios = require('axios')
const local = require('./index')
const requests = [
  {
    url: '/api/mod/about',
    file: '../src/static/scripts/about.json',
    type: 'application/json;charset=utf-8'
  },
  {
    url: '/api/mod/maplayers',
    file: '../src/static/scripts/maplayers.json',
    type: 'application/json;charset=utf-8'
  }
]

const corsJson = {
  origin: `${local.corsDomain}:${local.corsMainPort}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'P3P'],
  credentials: true,
  optionsSuccessStatus: 204
}

const upload = async (name, api, path) => {
  const rawdata = require(path)
  api = corsJson.origin + api
  try {
    return await axios.post(api, JSON.stringify(rawdata), {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (err) {
    console.error(`Upload Failed: ${name} with erros of (${err})`)
  }
}

const configs = [
  {
    name: '菜单信息',
    api: '/api/restricted/uploadmenu',
    path: '../src/static/scripts/_menu.json'
  },
  {
    name: '服务函数信息',
    api: '/api/restricted/uploadservicelist',
    path: '../src/static/scripts/_service.json'
  },
  {
    name: '权限信息',
    api: '/api/restricted/uploadrolepermission',
    path: '../src/static/scripts/_permission.json'
  }
]

module.exports = app => {
  for (let i = 0; i < requests.length; i++) {
    const url = requests[i].url
    // const type = paltformRequests[i].type
    const file = require(requests[i].file)
    app.use(url, cors(corsJson), (req, res) => {
      res.json(file)
    })
  }
  // 自定义执行文件，原框架里的/scripts/init.js
  app.get('/scripts/init.js', cors(corsJson), function(req, res) {
    res.sendFile(path.resolve(__dirname, '../src/static/scripts/init.js'))
  })
  // 注册/更新模块时上传菜单，服务函数，权限信息
  app.use('/api/mod/report', cors(corsJson), () => {
    const tasks = []
    for (let i = 0; i < configs.length; i++) {
      const cfg = configs[i]
      tasks.push(upload(cfg.name, cfg.api, cfg.path))
    }
    // console.log('tasks: %O', tasks)

    Promise.all(tasks)
      .then(resps => {
        // console.log(resps)
        let success = true
        for (let i = 0; i < configs.length; i++) {
          if (resps[i].status !== 200) {
            success = false
          }
        }
        if (!success) {
          console.log('api report failed')
        } else {
          console.log('api report success')
        }
      })
      .catch(err => {
        console.log(`api 'report' failed: ${err}`)
      })
  })
}
