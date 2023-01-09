// window.onload = function () {

var index = 0;
var curIndex = 0;
var startTime = new Date().getTime();

try {
  let ipcRenderer = require("electron").ipcRenderer;
  //点击穿透
  let el = document.getElementById("body");

  el.onmouseenter = function () {
    ipcRenderer.send("huanyuan", "huanyuan");
  };
  el.onmouseleave = function () {
    ipcRenderer.send("chuantou", "chuantou");
  };
} catch (error) {
  if (error instanceof ReferenceError) {
    console.log("ReferenceError! require函数不存在");
  }
}

//最小化
function min() {
  //发送最小化命令
  ipcRenderer.send("window-min", "window-min");
}

//将数组转换为html元素
function fromReady(MonsterInfo) {
  var MonsterInfoArray = [];
  var MonsterInfoDoc = "";
  for (var i = 0; i < MonsterInfo.length; i++) {
    if (i === 0) {
      var monster = "<div class='monsterInfo'>";
    } else {
      var monster =
        "<div class='monsterInfo' onclick='toMonster(" +
        MonsterInfo[i].children[0].innerHTML +
        ")'>";
    }
    for (var ii = 0; ii < MonsterInfo[i].children.length - 1; ii++) {
      if (i === 0) {
        monster =
          monster +
          "<div class='" +
          MonsterInfo[i].children[ii].tagName +
          "' onclick='sort(" +
          ii +
          ");titleState(" +
          ii +
          ")'>" +
          MonsterInfo[i].children[ii].innerHTML +
          "</div>";
      } else {
        monster =
          monster +
          "<div class='" +
          MonsterInfo[i].children[ii].tagName +
          "'>" +
          MonsterInfo[i].children[ii].innerHTML +
          "</div>";
      }
    }
    monster = monster + "</div>";
    MonsterInfoArray.push(monster);
  }
  for (var j = 0; j < MonsterInfoArray.length; j++) {
    MonsterInfoDoc = MonsterInfoDoc + MonsterInfoArray[j];
  }
  document.getElementById("monsterInfoTable").innerHTML = MonsterInfoDoc;
  console.log("载入完成");
}

//body状态设置
function setMode(mode) {
  var body = document.getElementById("body");
  if (body.className === "light") {
    body.classList.remove("light");
    body.classList.add("night");
  } else if (body.className === "night") {
    body.classList.remove("night");
    body.classList.add("light");
  }
}

//背景状态设置
function warpSet(pageNumber) {
  var warp = document.getElementById("warp");
  warp.classList.remove("page1", "page2", "page3", "page4", "big", "search");
  warp.classList.add("page" + pageNumber);
  if (pageNumber !== 0) {
    warp.classList.add("big");
    try {
      ipcRenderer.send("window-big", "window-big");
    } catch (error) {
      if (error instanceof ReferenceError) {
        console.log("ReferenceError! ipcRenderer不存在");
      }
    }
  } else {
    warp.classList.add("search");
    try {
      ipcRenderer.send("window-small", "window-small");
    } catch (error) {
      if (error instanceof ReferenceError) {
        console.log("ReferenceError! ipcRenderer不存在");
      }
    }
  }
}

//菜单切换
function menuSwitch(pageNum) {
  var toMonsterBtn = document.getElementById("to_monster_page_btn");
  var toDataBtn = document.getElementById("to_data_page_btn");
  var toSkillBtn = document.getElementById("to_skill_page_btn");
  var menuBtn = document.getElementsByClassName("menu_btn");
  for (var j = 0; j < menuBtn.length; j++) {
    menuBtn[j].classList.remove("active");
  }
  menuBtn[pageNum - 2].classList.add("active");
}

//page页面切换
function pageSwitch(pageNum) {
  var pageName = "page" + pageNum;
  var page = document.getElementById(pageName);
  var allPage = document.getElementsByClassName("page");

  for (var i = 0; i < allPage.length; i++) {
    allPage[i].classList.remove("active");
  }

  if (curIndex === 0) {
    //初次展开warp即search完成时
    document.getElementById("page1").classList.add("hidden");
  } else if (curIndex === 2) {
    //离开第二页(怪物页)时
    document.getElementById("monsterPageSwitch").classList.remove("active");
    document.getElementById("backBtn").classList.remove("right");
  } else if (curIndex !== 0 && pageNum === 1) {
    document.getElementById("page1").classList.remove("hidden");
  } else if (curIndex !== 0 && pageNum === 2) {
    if (
      !document.getElementById("monsterPageSwitch").classList.contains("add")
    ) {
      document.getElementById("monsterPageSwitch").classList.remove("save");
      document.getElementById("monsterPageSwitch").innerHTML = "新增";
      document.getElementById("monsterPageSwitch").classList.add("add");
    }
    switchAorI(1); //切换至列表页
  }

  warpSet(pageNum);
  setTimeout(function () {
    page.classList.add("active");
  }, 500);
}

//不同页面切换函数
function to(pageNum) {
  index = pageNum;
  console.log(index, curIndex);
  if (index !== curIndex) {
    menuSwitch(pageNum);
    pageSwitch(pageNum);
  }
  curIndex = index;
}

//数组排序
function sort(par, infoArray) {
  if (!infoArray) {
    infoArray = docContent;
    console.log("infoArray不存在");
    console.log(Array.isArray(infoArray));
  } else {
    console.log("infoArray存在");
    console.log(Array.isArray(infoArray));
  }
  for (var i = 0; i < infoArray.length - 1; i++) {
    for (var j = 1; j < infoArray.length - 1 - i; j++) {
      // 相邻元素两两对比，元素交换，大的元素交换到后面
      var infoOne = infoArray[j].children[par].innerHTML;
      var infoTwo = infoArray[j + 1].children[par].innerHTML;
      if (!re.test(infoOne)) {
        //中文排序
        if (infoOne.localeCompare(infoTwo, "zh") > 0) {
          var a = j;
          var b = j + 1;
          var tempA = infoArray[j];
          var tempB = infoArray[j + 1];
          infoArray.splice(a, 1, tempB);
          infoArray.splice(b, 1, tempA);
        }
      } else if (typeof infoOne === "string") {
        //字符串排序
        if (parseInt(infoOne) > parseInt(infoTwo)) {
          var a = j;
          var b = j + 1;
          var tempA = infoArray[j];
          var tempB = infoArray[j + 1];
          infoArray.splice(a, 1, tempB);
          infoArray.splice(b, 1, tempA);
        }
      }
    }
  }
  fromReady(infoArray);
  renderTableInfo();
  return infoArray;
}
