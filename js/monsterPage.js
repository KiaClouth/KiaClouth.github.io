var switchBtn = document.getElementById("monsterPageSwitch")
var monsterInfoDet_father = document.getElementById("monsterInfoDet_father")
var monsterInfoTable_father = document.getElementById("monsterInfoTable_father")
var monsterInfoAdd_father = document.getElementById("monsterInfoAdd_father")
var par = 0;
var re = /[^\u4E00-\u9FA5]/; //中文字符集区间


//第二页的内容切换
function switchAorI(num) {
	var backBtn = document.getElementById("backBtn")
	var page1 = document.getElementById("page1")
	if (num === 1) {
		monsterInfoAdd_father.classList.remove("active")
		monsterInfoDet_father.classList.remove("active")
		monsterInfoTable_father.classList.add("active")
		page1.classList.remove("tab", "det", "add")
		page1.classList.add("tab")
		backBtn.classList.remove("active")
	} else if (num === 2) {
		monsterInfoAdd_father.classList.remove("active")
		monsterInfoDet_father.classList.add("active")
		monsterInfoTable_father.classList.remove("active")
		page1.classList.remove("tab", "det", "add")
		page1.classList.add("det")
		if (!backBtn.classList.contains("active")) {
			backBtn.classList.add("active")
		}
	} else if (num === 3) {
		monsterInfoAdd_father.classList.add("active")
		monsterInfoDet_father.classList.remove("active")
		monsterInfoTable_father.classList.remove("active")
		page1.classList.remove("tab", "det", "add")
		page1.classList.add("add")
		if (!backBtn.classList.contains("active")) {
			backBtn.classList.add("active")
		}
	}
	console.log("怪物页内容切换完成、背景切换完成，返回按钮状态切换完成，")
}

//表头活动状态切换
function titleState(par) {
	if (document.querySelectorAll(".monsterPage #monsterInfoTable_father #monsterInfoTable .monsterInfo:nth-child(1)>div")) {
		var title = document.querySelectorAll(
			".monsterPage #monsterInfoTable_father #monsterInfoTable .monsterInfo:nth-child(1)>div");
		for (var h = 0; h < title.length; h++) {
			title[h].classList.remove("active")
		};
		title[par].classList.add("active");
	}
}

//列表内容渲染
function renderTableInfo() {
	//延时展示
	// var k = 0
	// var sortTime = setInterval(function() {
	// 	if (k < monsterInfoTable_father.children[1].children.length) {
	// 		monsterInfoTable_father.children[1].children[k].style.zIndex = 9999 - k
	// 		monsterInfoTable_father.children[1].children[k].style.top = k * 3.5 - 3.5 + "rem"
	// 		k++
	// 	} else {
	// 		clearInterval(sortTime)
	// 	}
	// }, 10);
	// 直接展示
	for (var k = 0; k < monsterInfoTable_father.children[1].children.length; k++) {
		monsterInfoTable_father.children[1].children[k].style.top = 3.5 * k - 3.5 + "rem";
	}
}

//back按钮功能
function backPage() {
	var switchBtn = document.getElementById("monsterPageSwitch")
	switchAorI(1)
	setTimeout(function() {
		switchBtn.innerHTML = "新增"
	}, 500)
	switchBtn.classList.remove("save")
	switchBtn.classList.add("add")
}

//add/save页面切换
function addSave() {
	var switchBtn = document.getElementById("monsterPageSwitch")
	if (switchBtn.classList.contains("add")) {
		switchAorI(3)
		setTimeout(function() {
			switchBtn.innerHTML = "保存"
		}, 500)
		switchBtn.classList.remove("add")
		switchBtn.classList.add("save")
	} else if (switchBtn.classList.contains("save")) {
		//新增页面完成后返回的页面应该是数据库最后一个编号
		switchAorI(1)
		setTimeout(function() {
			switchBtn.innerHTML = "新增"
		}, 500)
		switchBtn.classList.remove("save")
		switchBtn.classList.add("add")
	}
}

//切换至详情页
function toMonster(number) {
	//详情页
	console.log("进入序号为" + number + "的怪物信息页面")
	detFromReady(number)
	renderDetInfo()
	switchAorI(2)
}

//将数组转换为html-det元素
function detFromReady(MonsterNumber) {
	var monsterDetInfo = MonsterInfo[MonsterNumber];
	var MonsterDetInfoDoc = ""
	var monster = "<div class='content' id='MonsterInfo" + MonsterNumber + "'>"
	for (var i = 0; i < MonsterInfo[MonsterNumber].children.length; i++) {
		monster = monster + "<div class='monsterInfoTitle " + MonsterInfo[MonsterNumber].children[i].tagName + "'>" +
			MonsterInfo[MonsterNumber].children[i].tagName + "</div>"
		monster = monster + "<div class='monsterInfoContent'>" + MonsterInfo[MonsterNumber].children[i].innerHTML + "</div>"
	}
	monster = monster + "</div>"
	document.getElementById("monsterInfoDet").innerHTML = monster;
	console.log("载入完成")
}

function renderDetInfo() {
	var monsterInfoDetTitle = monsterInfoDet_father.getElementsByClassName("monsterInfoTitle")
	var monsterInfoDetContent = monsterInfoDet_father.getElementsByClassName("monsterInfoContent")
	//延时展示
	// var k = 0
	// var sortTime = setInterval(function() {
	// 	if (k < monsterInfoTable_father.children[1].children.length) {
	// 		monsterInfoTable_father.children[1].children[k].style.zIndex = 9999 - k
	// 		monsterInfoTable_father.children[1].children[k].style.top = k * 3.5 - 3.5 + "rem"
	// 		k++
	// 	} else {
	// 		clearInterval(sortTime)
	// 	}
	// }, 10);
	// 直接展示
	for (var k = 0; k < monsterInfoDetTitle.length; k++) {
		if(k<7){
			monsterInfoDetTitle[k].style.top = 5 * k + "rem";
			monsterInfoDetTitle[k].style.left = 0 + "rem";
			monsterInfoDetContent[k].style.top = 5 * (k + 1) - 2.5 + "rem";
			monsterInfoDetContent[k].style.left = 2 + "rem";
		} else if(k<14){
			monsterInfoDetTitle[k].style.top = 5 * (k - 7) + "rem";
			monsterInfoDetTitle[k].style.left = 25 + "rem";
			monsterInfoDetContent[k].style.top = 5 * (k - 6) - 2.5 + "rem";
			monsterInfoDetContent[k].style.left = 27 + "rem";
		} else if(k<21){
			monsterInfoDetTitle[k].style.top = 5 * (k - 13) + "rem";
			monsterInfoDetTitle[k].style.left = 50 + "rem";
			monsterInfoDetContent[k].style.top = 5 * (k - 12) - 2.5 + "rem";
			monsterInfoDetContent[k].style.left = 52 + "rem";
		}
	}
}
