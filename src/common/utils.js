import CONSTANT from './CONSTANT';

export default {
	getConst: (type, key) => {
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
	}
}