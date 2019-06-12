import envConfig from '@/config/base.config'
import deploy from '@/config/deploy'
export default {
  apiBasePath:
    process.env.NODE_ENV === 'production'
      ? envConfig.build.corsDomain + ':' + deploy.emergencyPort
      : envConfig.dev.apiPath,
  fileBasePath:
    process.env.NODE_ENV === 'production'
      ? envConfig.build.corsDomain + ':' + deploy.emergencyPort
      : envConfig.dev.corsDomain + ':5000',
  dataBasePath:
    process.env.NODE_ENV === 'production'
      ? envConfig.build.corsDomain + ':' + deploy.emergencyPort
      : 'http://localhost' + ':' + envConfig.dev.emergencyPort,
  vocApiPath:
    process.env.NODE_ENV === 'production'
      ? envConfig.build.corsDomain + ':' + deploy.sharePort
      : envConfig.dev.corsDomain + ':' + envConfig.dev.sharePort,
  visualBasePath:
    process.env.NODE_ENV === 'production'
      ? envConfig.build.corsDomain + ':' + deploy.simulatorPort
      : envConfig.dev.corsDomain + ':' + envConfig.dev.simulatorPort,
  spotBasePath:
    process.env.NODE_ENV === 'production'
      ? envConfig.build.corsDomain + ':' + deploy.samplePort
      : envConfig.dev.corsDomain + ':' + envConfig.dev.samplePort,
  shareBasePath:
    process.env.NODE_ENV === 'production'
      ? envConfig.build.corsDomain + ':' + deploy.sharePort
      : envConfig.dev.corsDomain + ':' + envConfig.dev.sharePort,
  defaultDivision: {
    province: envConfig.build.province ? envConfig.build.province : '浙江省',
    city: envConfig.build.city ? envConfig.build.city : '宁波市',
    area: envConfig.build.area ? envConfig.build.area : '鄞州区'
  }
}
