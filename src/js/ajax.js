var host = 'http://121.42.137.63:8080';
var username = 'gaozhiqiang';
var password = 'abcdefgh';

// function setCookie(key, value) {
// 	sessionStorage[key] = value;
// }

// function getCookie(key) {
// 	return sessionStorage[key];
// }

function getUsername () {
	return sessionStorage.username;
};

function getToken () {
	return sessionStorage.token;
};

var login = (function () {
	return function () {
		return new Promise(function (resolve) {
			resolve();
		});		
	}
	// sessionStorage.username = username;
	// sessionStorage.password = password;

	// function updateToken() {
	// 	$.ajax({
	// 		url: `${host}/token`,
	// 		data: {
	// 			username: username,
	// 			password: password
	// 		}
	// 	}).then(function (res) {
	// 		sessionStorage.token = res.data.token;
	// 	});
	// }

	// setInterval(updateToken, 7200*1000);
	// updateToken();

	// return function () {
	// 	if(sessionStorage.token)
	// 		return new Promise(function (resolve) {
	// 			resolve(sessionStorage.token);
	// 		});
	// 	else
	// 		return $.ajax({
	// 			url: `${host}/token`,
	// 			data: {
	// 				username: username,
	// 				password: password
	// 			}
	// 		}).then(function (res) {
	// 			return new Promise(function (resolve) {
	// 				resolve(res.data.token);
	// 			});
	// 		});
	// }
})();

var notice = {
	list: function () {
		return $.ajax({
			url: `${host}/weixin/notification`,
			type: 'GET',
			headers: {
				Token: getToken()
			}
		});
	}
};

var department = {
	listMain: function () {
		return $.ajax({
			url: `${host}/weixin/main_department`,
			type: 'GET',
			headers: {
				Token: getToken()
			}
		});
	},
	listSecondary: function (mainName) {
		return $.ajax({
			url: `${host}/weixin/sub_department`,
			type: 'GET',
			data: {
				name: mainName
			},
			headers: {
				Token: getToken()
			}
		});
	}
};

var clerk = {
	list: function () {
		return $.ajax({
			url: `${host}/weixin/gklist`,
			type: 'GET',
			headers: {
				Token: getToken()
			}			
		})
	}
};

var sheet = {
	list: function () {
		return $.ajax({
			url: `${host}/weixin/worksheet_schema`,
			type: 'GET',
			headers: {
				Token: getToken()
			}
		})
	}	
};

var basic = {
	listConst: function (type) {
		return $.ajax({
			url: `${host}/dictionary`,
			type: 'GET',
			data: {
				type: type
			},
			headers: {
				Token: getToken(),
			}
		});
	},
	listTitle: function () {
		return $.ajax({
			url: `${host}/dictionary?type=1`,
			type: 'GET',
			headers: {
				Token: getToken(),
			}
		});
	},
	listPosition: function () {
		return $.ajax({
			url: `${host}/dictionary?type=2`,
			type: 'GET',
			headers: {
				Token: getToken(),
			}
		});		
	}
};

var exposure = {
	getInfo: function (id) {
		return $.ajax({
			url: `${host}/weixin/expose_info`,
			type: 'GET',
			data: {
				exposeId: id
			},
			headers: {
				Token: getToken()
			}
		})
	}
}

function errorFilter(promise) {
	return promise.then(function (res) {
		var error = res.error || res.body.error;

		if(error == 'succ') {
			alert('提交成功');
			return new Promise(function (resolve) {
				resolve(res);
			});		
		}
		else
			alert('提交失败, 错误代码: ' + error);
	});
}

export { host, getUsername, getToken, login, department, basic, sheet, clerk, notice, exposure, errorFilter };