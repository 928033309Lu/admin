<template>
  <div class="app-container">

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="公司id" width="180"/>
      <el-table-column prop="company_name" label="公司名称" width="180"/>
      <el-table-column prop="company_profile" label="公司简介" width="180"/>

    </el-table>

    <textarea id="servicePublicKey" v-model="data" rows="5" cols="45"/>

    <textarea id="clientPrivateKey" v-model="data2" rows="5" cols="45"/>
  </div>
</template>

<script>
/* import { AES, enc, mode, pad } from 'crypto-js'
import $ from '../../../static/js/jquery-2.1.4.min.js'

import { Encrypt } from '../../../static/js/jsencrypt.min.js'
import { JSEncrypt } from '../../../static/js/jsencrypt.min.js'
import { setPublicKey } from '../../../static/js/jsencrypt.min.js'

import aes from '../../../static/js/aes.js'
import padZeropadding from '../../../static/js/pad-zeropadding.js'
import security from '../../../static/js/security.js'*/
//import randomWord from '../../../static/js/random.js'
	
// import Utils from "../../../static/js/utils.js"
import { fetchList } from "@/api/article";
import Sortable from "sortablejs";
import { getList } from "@/api/article";
import axios from "axios";
// import randomWord from '../../../static/js/random.js'

// import Utils from '../../../static/js/utils.js'
// import { fetchList } from '@/api/article'
// import Sortable from 'sortablejs'
// import { getList } from '@/api/article'
// import axios from 'axios'
// import JsEncrypt from 'jsencrypt'

export default {
  name: 'CeshiTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      data: '-----BEGIN PUBLIC KEY-----MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHofI29+3HKm1Bcdaa15fW3gzQGM9A9FiDZ6eu31gMOJRMZir3xVqCiEy2AgZ1gMhGTKRyHQOMobRAQfT3xOGaMowl8AGTPlpSAl8kMzjWDfEy6HYKmWX0/I4j6o9TUZFM7TWyIpUo21xBtd+ngIhfbAgjyTWG7puHa9MHfMlX/pAgMBAAE=-----END PUBLIC KEY-----',
      data2: '-----BEGIN RSA PRIVATE KEY-----MIICXAIBAAKBgHofI29+3HKm1Bcdaa15fW3gzQGM9A9FiDZ6eu31gMOJRMZir3xVqCiEy2AgZ1gMhGTKRyHQOMobRAQfT3xOGaMowl8AGTPlpSAl8kMzjWDfEy6HYKmWX0/I4j6o9TUZFM7TWyIpUo21xBtd+ngIhfbAgjyTWG7puHa9MHfMlX/pAgMBAAECgYAybll72a+/yRUc1pClit45WfRPB55iEBzIIpxRWGjsVuuH4YkGl3jyAqTZ9Ye33LNvy/jEBfDtxYS5DxUMCFSdbgTJ5Mr9qVGlCgu3S/V/HzlMRnVzGrBAjDQQAxOoWCQhapMh4HBR8hr2lj+nfrsI9ZKI5H5y/r+hRZGRGm1s4QJBAOFdIoTDQQTnPIthEB2Car/nVP2M41FMI9E142tufwazNvrNr+dM231t7c1HVMx5s9LscNPbdmh0xrXIRdMg/+MCQQCKuRUKnPtjW+ijkKg67PdJsfvlX+e3O6A74uBbOxUBPKZ2g3258T321WB7ObRjwIQm6W2yQHAErsOUNObemvLDAkEAkPrqhwBZpr7f60ahKGrLI/O9cHQflSBndmK1kFqAa54Fg6mpPSLrnTCIKGR4QCcXMV0cZJ6t+RsO7skNanqzQwJBAIfUVaAAub09/vo46CBaan/EQGsFjvNA9NHugdOSdCyz4CJm+bIZXpzTrRa7F8AcfslDAt/obEaJgIMbkXshqNUCQHGhqkWWBMFhCmgIszvPH7G7fSt5AFmjCKOcFoJOeSyyImbJ3yx9Zfe8YsKPpbcxpCr/YWL9BI3Xtr7RUHedeKo=-----END RSA PRIVATE KEY-----' }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      var that = this
      // 获取16位随机数,当做aes秘钥key
      var randomStr = that.randomWord(16)
      /* // aes加密
        var data = Encrypt("1212",randomStr);
        // rsa加密
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey($("#servicePublicKey").val());
        var encrypted = encrypt.encrypt(randomStr);
        // 创建json对象
        var json = {
		  "account": "string2",
		  "password": "string3"
		};*/

      // aes加密
      /* var a=Utils.encrypt("name",randomStr);
		alert("加密的key：" + randomStr);
		console.log(a)
		var b=Utils.decrypt(a,randomStr);
		console.log(b)*/

      // rsa加密
      var encrypt = new JSEncrypt()
      encrypt.setPublicKey(that.data)
      var encrypted = encrypt.encrypt('1111111111111111111111111')

      console.log(encrypted)
      alert('加密后的key：' + encrypted)

      // rsa解密,获取到aes秘钥
      encrypt.setPrivateKey(that.data2)
      var aesKey = encrypt.decrypt(encrypted)
      // 用aes秘钥进行解密
      alert('解密的key：' + aesKey)
      /* var resultData = Utils.decrypt(a,randomStr);
        alert("解密的数据：" + resultData);*/

      axios
        .get(
          '/api/api/decoration_company_info/show-company.do?page=1&length=7&_=1542189997046'
        )
        .then(function(response) {

        })
        .catch(function(error) {

        })

      /* axios
        .post(
          "/api/api/decoration_company_info/show-company.do?page=1&length=7&_=1542189997046"
        )
        .then(function(response) {
          console.log(1);
          //   console.log(response);
          that.list = response.data.data;
          console.log(111);
          console.log(that.list);
        })
        .catch(function(error) {
          console.log(error);
        });*/
		       		/* that.$http.post("http://www.huizhuangmeiju.com/api/decoration_company_info/show-company.do?page=1",{
		       			account: "string2",
 						password: "string3"
		       		}).then(function(res) {

			that.list = res.data.data;
		})*/
      //   axios
      //     .get(
      //       "http://www.huizhuangmeiju.com/api/decoration_company_info/show-company.do?page=1&length=7&_=1542189997046",
      //       {
      //         headers: {
      //             "Access-Control-Allow-Origin":"*",

      //         }
      //       }
      //     )
      //     .then(function(res) {
      //       console.log("成功");
      //       console.log(res.data);
      //     })
      //     .catch(function(error) {
      //       console.log("失败");
      //       console.log(error);
      //     });
    },
    randomWord(num) {
	    var str = '',
	        range = num,
	        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

	    // 随机产生
	    for (var i = 0; i < range; i++) {
	        var pos = Math.round(Math.random() * (arr.length - 1))
	        str += arr[pos]
	    }
	    return str
    }
  }

}
</script>
<style scoped>
.el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
