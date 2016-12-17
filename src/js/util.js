function getDate() {
	var date = new Date();

	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function getTime() {
	var date = new Date();

	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function diffDate(a, b) { 
	a = a.split('-');
	b = b.split('-');

	var oa = new Date(a[0], parseInt(a[1]) - 1, a[2]);
	var ob = new Date(b[0], parseInt(b[1]) - 1, b[2]);

	return parseInt(Math.abs(oa - ob)/1000/60/60/24);
}

function getParam(key) {
	var qs = window.location.search;
	var result = new RegExp(`[\?|\&]${key}\=(.+)?\&?`).exec(qs);
	if(result != null)
		return result[1];
	else
		return null;
}

function transform(array) {
	return array.map(function (item) {
		return {
			content: item.name,
			code: item.code,
			isSelected: false
		};
	})
}

function mutipleSelect(constArray, codeArray) {
	constArray.forEach(function (item) {
		codeArray.forEach(function (code) {
			item.isSelected = item.isSelected || item.code == code;
		});
	});
}

function getMutipleSelect(array) {
	return array.filter(function (item) {
		return item.isSelected;
	}).map(function (item) {
		return item.code;
	});
}

export { getDate, diffDate, getTime, getParam, transform, mutipleSelect, getMutipleSelect };