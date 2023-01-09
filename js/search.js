//回车事件函数
function post(e) {
	var dataArray = MonsterInfo; //信息数组
	var input = document.getElementById("input");
	docContent = [];
	var evt = window.event || e;
	if (evt.keyCode == 13) {
		startTime2 = new Date().getTime();
		if (startTime2 - startTime >= 1500) {
			docContent = [];
			var searchContent = input.value.toLowerCase().split(' ');
			fromReady(sort(1, findSearch(searchContent, dataArray)));
			renderTableInfo();
			titleState(1);
			to(2);
			setTimeout(function() {
				input.value = ""
			}, 500)
		} else {
			docContent = [];
			var searchContent = input.value.toLowerCase().split(' ');
			input.value = "求豆麻袋X_X"
			setTimeout(function() {
				fromReady(sort(1, findSearch(searchContent, dataArray)));
				renderTableInfo();
				titleState(1);
				to(2);
			}, 1500)
			setTimeout(function() {
				input.value = ""
			}, 500)
		}
	}
}

//数据查找、重组
function findSearch(content, dataArray) {
	docContent.push(dataArray[0]);
	for (var i = 1; i < dataArray.length; i++) {
		var data = dataArray[i].innerHTML.toLowerCase();
		if (data.search(content) >= 0) {
			docContent.push(dataArray[i]);
		}
		// if (dataArray[i].children) {
		// 	var findResult = findSearch(content, dataArray[i].children);
		// 	if (findResult) {
		// 		return findResult;
		// 	}
		// }
	}
	console.log("重新排序了" + docContent.length + "个数据");
	return docContent;
}
