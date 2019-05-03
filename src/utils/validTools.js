export default (type, value, callback, msg, isc) => {
    let reg = ''
    switch(type) {
        case 'mobile':
            reg = /^1[34578]\d{9}$/
            msg = msg || '请输入正确的手机号'
            break
        case 'idCard':
            reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
            msg = msg || '请输入正确的身份证号'
            break;
        case 'credit':
            reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g
            msg = msg || '请输入正确的信用代码'
            break;

            
    }
    if(!reg.test(value)){
        callback(new Error(msg))
        return false
    }else{
        if(!isc){
            callback()
        }
        return true
    }
}