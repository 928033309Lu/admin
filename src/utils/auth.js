import Cookies from 'js-cookie'
// import Utils from "../../static/js/utils.js"
// import Utils from '../../static/js/utils.js'
const TokenKey = 'Admin-Token'
// import JsEncrypt from 'jsencrypt'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
const PublicKey = '-----BEGIN PUBLIC KEY-----MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHofI29+3HKm1Bcdaa15fW3gzQGM9A9FiDZ6eu31gMOJRMZir3xVqCiEy2AgZ1gMhGTKRyHQOMobRAQfT3xOGaMowl8AGTPlpSAl8kMzjWDfEy6HYKmWX0/I4j6o9TUZFM7TWyIpUo21xBtd+ngIhfbAgjyTWG7puHa9MHfMlX/pAgMBAAE=-----END PUBLIC KEY-----'
const data2 = '-----BEGIN RSA PRIVATE KEY-----MIICXAIBAAKBgHofI29+3HKm1Bcdaa15fW3gzQGM9A9FiDZ6eu31gMOJRMZir3xVqCiEy2AgZ1gMhGTKRyHQOMobRAQfT3xOGaMowl8AGTPlpSAl8kMzjWDfEy6HYKmWX0/I4j6o9TUZFM7TWyIpUo21xBtd+ngIhfbAgjyTWG7puHa9MHfMlX/pAgMBAAECgYAybll72a+/yRUc1pClit45WfRPB55iEBzIIpxRWGjsVuuH4YkGl3jyAqTZ9Ye33LNvy/jEBfDtxYS5DxUMCFSdbgTJ5Mr9qVGlCgu3S/V/HzlMRnVzGrBAjDQQAxOoWCQhapMh4HBR8hr2lj+nfrsI9ZKI5H5y/r+hRZGRGm1s4QJBAOFdIoTDQQTnPIthEB2Car/nVP2M41FMI9E142tufwazNvrNr+dM231t7c1HVMx5s9LscNPbdmh0xrXIRdMg/+MCQQCKuRUKnPtjW+ijkKg67PdJsfvlX+e3O6A74uBbOxUBPKZ2g3258T321WB7ObRjwIQm6W2yQHAErsOUNObemvLDAkEAkPrqhwBZpr7f60ahKGrLI/O9cHQflSBndmK1kFqAa54Fg6mpPSLrnTCIKGR4QCcXMV0cZJ6t+RsO7skNanqzQwJBAIfUVaAAub09/vo46CBaan/EQGsFjvNA9NHugdOSdCyz4CJm+bIZXpzTrRa7F8AcfslDAt/obEaJgIMbkXshqNUCQHGhqkWWBMFhCmgIszvPH7G7fSt5AFmjCKOcFoJOeSyyImbJ3yx9Zfe8YsKPpbcxpCr/YWL9BI3Xtr7RUHedeKo=-----END RSA PRIVATE KEY-----'

export function aes(datas) {
	 var randomStr = Utils.randomWord(16)
	 const Base64 = require('js-base64').Base64
  var basedata = Base64.encode(JSON.stringify(datas))
	 var data = Utils.encrypt(basedata, randomStr)
	 var encrypt = new JSEncrypt()
  encrypt.setPublicKey(PublicKey)
  encrypt.encrypt(randomStr)
  var encrypted = encrypt.encrypt(randomStr)
  // 创建json对象
  var json = {
    'requestData': data,
    'encrypted': encrypted
  }
  return json
}

