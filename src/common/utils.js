import CONSTANT from './CONSTANT';

export default {
	// 获取变量类型
	getConst: (type, key) => {
		if(!key) return false;
		if(!CONSTANT.hasOwnProperty(type)) {
			console.log('暂无该类型');
			return false;
		}
		const arr = CONSTANT[type];
		const filterArr = arr.filter(item => item.key === key);
		if(filterArr.length !== 1) {
			console.log('暂没有适配的key值，或者匹配值过多');
			return false;
		}
		return filterArr[0].value;
	},
	
	// 解析对象为字符串拼接
	changeObjToStr: (obj) => {
		let str = '';
		Object.keys(obj).map(item => {
			str += `${item}=${obj[item]}&`
		});
		return str.substring(0, str.length-1)
	}
}