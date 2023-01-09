//创建XML文件对象
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        //XMLHttpRequest 对象用于在后台与服务器交换数据。
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // code for IE6, IE5
        // ActiveXObject 对象构造函数来启动应用程序
        //Xmlhttp是一种浏览器对象， 可用于模拟http的GET和POST请求。
        //配合JavaScript可以实现页面数据在无刷新下的定时数据更新。

        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //发送一个http请求 （打开xml文件）
    //用open可以指定get,post 
    /*第一个参数是请求方式，
     * 第二个参数是文件地址，
     * 第三个参数为是否为异步（默认为true(是) / false(否) ）*/
    xmlhttp.open("GET", "Data.xml", false);

    /*使用Ajax提交的参数多是些简单的字符串，
     * 可以直接使用GET方法将要提交的参数写到open方法的url参数中，
     * 此时send方法的参数为null。*/
    xmlhttp.send();
    //属性返回 XML 文档对象
    xmlDoc = xmlhttp.responseXML;
    //得到标签
    var MonsterInfo = xmlDoc.getElementsByTagName("monsterInfo");
