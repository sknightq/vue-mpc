'use strict'
module.exports = {
  dev: {
    corsDomain: 'http://dev.azuratech.com',
    corsMainPort: 30000, // 平台端口
    sharePort: 30001, // 基础数据端口
    samplePort: 30011, // 采样端口
    simulatorPort: 30013, // 模拟端口
    emergencyPort: 30021, // 应急端口
    frameJS: '/Scripts/aepmod.js',
    defaultProvince: '浙江省',
    defaultCity: '宁波市',
    defaultArea: '鄞州区',
    serverUrl: 'http://localhost:30099/'
  },
  site1: {
    corsDomain: 'http://100.100.100.100', // just for example
    corsMainPort: 30000, // 平台端口
    sharePort: 30001, // 基础数据端口
    samplePort: 30011, // 采样端口
    simulatorPort: 30013, // 模拟端口
    emergencyPort: 30021, // 应急端口
    frameJS: '/Scripts/aepmod.js',
    defaultProvince: '浙江省',
    defaultCity: '宁波市',
    defaultArea: '鄞州区',
    serverUrl: 'http://localhost:30097/'
  }
}
