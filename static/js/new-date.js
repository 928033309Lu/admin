function dateY(time){
	var date = new Date(time);
	var date_value=date.getFullYear() + '-' + formatTen(date.getMonth() + 1) + '-' + formatTen(date.getDate());
	return date_value
}

function dateH(time){
	var date = new Date(time);
	var date_value=date.getFullYear() + '-' + formatTen(date.getMonth() + 1) + '-' + formatTen(date.getDate())+ ' ' + formatTen(date.getHours())+ ':' + formatTen(date.getMinutes())+ ':' + formatTen(date.getSeconds());
	return date_value
}


function formatTen(num){
	return num > 9 ? (num + "") : ("0" + num);
}


function zhengShu(s){//是否为正整数
     var re = /^[0-9]+$/ ;
     return re.test(s)
 }  
 
 function twoXiaoshu(s){//是否为保留两位小数
     var re = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/ ;
     return re.test(s)
 }  
 
 

