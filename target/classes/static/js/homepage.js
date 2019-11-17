$(function () {

    var filterParam;

    /**
     * echarts中的关系
     * @type {any[]}
     */
    var link_array= new Array;
    /**
     * echarts中的节点
     * @type {any[]}
     */
    var nodes_array= new Array;

    /**
     * 是否成圈
     * 0=不成圈（默认）
     * 1=成圈
     * @type {number}
     */
    var isCircle = 0;

    /**
     * 探索方向,默认为2，双向
     * 0=反向，1=正向，2=双向
     * 全不选也为双向
     * @type {number}
     */
    var isForward = 2;

    /**
     * 时间范围，默认为当月时间
     * @type {string}
     */
    var timeRange = $("#timeRange-select option:selected").text();

    /**
     * 交易类别，默认为全部
     * 全部=3，本行-本行=1，本行-他行=2
     * @type {string}
     */
    var transCategory = "全部";
    var transCategoryNum = 3;

    /**
     * 交易金额 transMoney，默认1000万
     * 交易笔数 transNum，默认0不筛选
     * 交易笔均 transAvg,默认0为不筛选
     * @type {number}
     */
    var transMoney = 1000;
    var transNum = 0;
    var transAvg = 0;

    /**
     * 探索路径层数，默认为1
     * 取值范围1->10
     * @type {number}
     */
    var searchLevel = 1 ;

    /**
     * 供应链，默认不勾选
     * 勾选=1，不显示水电
     * 不勾选=0，全部显示
     * @type {number}
     */
    var supplyNum = 0;

    /**
     * 探索路径选择，默认不勾选
     * 不勾选为仅对公=0；
     * 勾选为对公对私=1；
     * @type {number}
     */
    var onlyCom = 0;

    /**
     * 对公客户名称
     * @type {string}
     */
    var companyName = "";

    /**
     * 是否成圈button
     * isCircle-btn为是
     */
    $("#isCircle-btn").click(function() {
        isCircle = 1;
        if($("#notCircle-btn").hasClass("btn-info")){
            $("#notCircle-btn").removeClass("btn-info");
        }
        if(!$("#isCircle-btn").hasClass("btn-info")){
            $("#isCircle-btn").addClass("btn-info");
        }
    });

    /**
     * 是否成圈button
     * notCircle-btn为否
     */
    $("#notCircle-btn").click(function() {
        isCircle = 0;
        if($("#isCircle-btn").hasClass("btn-info")){
            $("#isCircle-btn").removeClass("btn-info");
        }
        if(!$("#notCircle-btn").hasClass("btn-info")){
            $("#notCircle-btn").addClass("btn-info");
        }
    });

    /**
     * 探索方向，正向isForward
     */
    $("#isForward-btn").click(function() {
        // isForward = 1;
        if($("#isForward-btn").hasClass("btn-info")){
            $("#isForward-btn").removeClass("btn-info");
            if($("#isBackward-btn").hasClass("btn-info")){
                isForward = 0;
            }else{
                isForward = 2;
            }
        }else{
            $("#isForward-btn").addClass("btn-info");
            if($("#isBackward-btn").hasClass("btn-info")){
                isForward = 2;
            }else{
                isForward = 1;
            }
        }
    });

    /**
     * 探索方向，反向isBackward
     */
    $("#isBackward-btn").click(function() {
        // isCircle = 0;
        if($("#isBackward-btn").hasClass("btn-info")){
            $("#isBackward-btn").removeClass("btn-info");
            if($("#isForward-btn").hasClass("btn-info")){
                isForward = 1;
            }else{
                isForward = 2;
            }
        }else{
            $("#isBackward-btn").addClass("btn-info");
            if($("#isForward-btn").hasClass("btn-info")){
                isForward = 2;
            }else{
                isForward = 0;
            }
        }
    });

    /**
     * 时间范围
     * todo:值为后台传过来生成
     */
    $("#timeRange-select").change(function(){
        timeRange = $("#timeRange-select option:selected").text();
    });

    /**
     * 交易类别,本行-本行，本行-他行，全部
     */
    $("#transCategory-select").change(function(){
        transCategory = $("#transCategory-select option:selected").text();
        if(transCategory == "本行-本行"){
            transCategoryNum = 1;
        }else if(transCategory == "本行-他行"){
            transCategoryNum = 2;
        }else{
            //全部
            transCategoryNum = 3;
        }

    });

    /**
     * 探索路径层数
     */
    $("#searchLevel-select").change(function(){
        var searchLevelStr = $("#searchLevel-select option:selected").text();
        searchLevel = parseInt(searchLevelStr.substring(0,searchLevelStr.length-1));
        console.log(searchLevel);
    });

    /**
     * 供应链
     */
    $("#supply-checkbox").change(function() {
        if(supplyNum ==0){
            supplyNum = 1;
        }else{
            supplyNum = 0;
        }
    });

    /**
     * 探索路径，对公=0,对公对私=1
     */
    $("#onlyCom-checkbox").change(function() {
        if(onlyCom ==0){
            onlyCom = 1;
        }else{
            onlyCom = 0;
        }
    });


    /**
     * 初始化echarts
     * @type {string[]}
     */
    var colors=['#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];

    var myChart = echarts.init(document.getElementById('main'));
    // myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
    var categories = [];
    categories[0]={
        name:"我行公司客户"
    };
    categories[1]={
        name: "他行公司客户"
    };
    categories[2]={
        name: "他行私人客户"
    };

    
    myChart.on('click', {dataType: 'node'}, function (param) {
        console.log("-----node-----");
        console.log(param.data);
    });

    myChart.on('dblclick', {dataType: 'node'}, function (param) {
        console.log("-----dblclick-----");
        console.log(param.data);

        transMoney = $("#transMoney-input").val();
        transNum = $("#transNum-input").val();
        if(transNum == ""){
            transNum = 0;
        }
        transAvg = $("#transAvg-input").val();

        var searchLevelStr = $("#searchLevel-select option:selected").text();
        searchLevel = parseInt(searchLevelStr.substring(0,searchLevelStr.length-1));

        filterParam ={
            isCircle: isCircle,
            isForward: isForward,
            timeRange: timeRange,
            transCategory: transCategoryNum,
            transMoney: transMoney,
            transNum: transNum,
            transAvg: transAvg,
            companyName: param.data.name,
            searchLevel: searchLevel,
            supplyNum: supplyNum,
            onlyCom: onlyCom
        };

        console.log(filterParam);
        ajaxPainting(filterParam);
    });

    myChart.on('click', {dataType: 'edge'}, function (param) {
        console.log("-----edge-----");
        console.log(param.data);
    });


    /**
     * 提交查询按钮
     */
    $("#submit-btn").click(function() {

        transMoney = $("#transMoney-input").val();
        transNum = $("#transNum-input").val();
        if(transNum == ""){
            transNum = 0;
        }
        transAvg = $("#transAvg-input").val();
        companyName = $("#comName-input").val();

        var searchLevelStr = $("#searchLevel-select option:selected").text();
        searchLevel = parseInt(searchLevelStr.substring(0,searchLevelStr.length-1));


        if(companyName == null || companyName == ""){
            // alert("请输入客户名称");
        }else{
            filterParam ={
                isCircle: isCircle,
                isForward: isForward,
                timeRange: timeRange,
                transCategory: transCategoryNum,
                transMoney: transMoney,
                transNum: transNum,
                transAvg: transAvg,
                companyName: companyName,
                searchLevel: searchLevel,
                supplyNum: supplyNum,
                onlyCom: onlyCom
            };
        };

        console.log(filterParam);

        // var filterParam ={
        //     isCircle: 0,
        //     isForward: 2,
        //     timeRange: "2019年11月",
        //     transCategory: 3,
        //     transMoney: transMoney,
        //     transNum: transNum,
        //     transAvg: transAvg,
        //     companyName: "中国机床总公司",
        //     searchLevel: 3,
        //     supplyNum: 0,
        //     onlyCom: 0
        // };

        ajaxPainting(filterParam);
    });

    function ajaxPainting(filterParam) {
        $.ajax({
            url: "/filter/cc",
            type: "post",
            traditional: true,
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(filterParam),
            success: function (data) {

                /**
                 * echarts中的关系
                 * @type {any[]}
                 */
                var link_array= new Array;
                /**
                 * echarts中的节点
                 * @type {any[]}
                 */
                var nodes_array= new Array;

                /**
                 * 用来剔除重复节点
                 * @type {any[]}
                 */
                var nodesNameArray = new Array();

                /**
                 * 用来剔除重复关系
                 * @type {any[]}
                 */
                var relationNameArray = new Array();


                //$("#main").html();


                if(data == null || data.length ==0){

                    alert("不存在符合条件的关系链路");
                }else{

                    var nodeLength = 0;
                    var relationLength = 0;

                    for(var i=0; i<data.length; i++){
                        var nodeList = data[i].nodeList;
                        var relationList = data[i].relationList;
                        for(var n=0; n<nodeList.length; n++){
                            if(nodesNameArray.indexOf(nodeList[n].cname)<0){
                                nodes_array[nodeLength] = {
                                    name: nodeList[n].cname,
                                    des: nodeList[n].cname,
                                    info:nodeList[n],
                                    symbolSize: 70,
                                    category: nodeList[n].category-1
                                };
                                nodesNameArray[nodeLength] = nodeList[n].cname;
                                nodeLength++;

                            }

                        }

                        for(var r=0; r<relationList.length; r++){
                            var combineName = relationList[r].startName + relationList[r].endName;
                            if(relationNameArray.indexOf(combineName) < 0){
                                link_array[relationLength]={
                                    source: relationList[r].startName,
                                    target: relationList[r].endName,
                                    info: relationList[r],
                                    name: relationList[r].transMoney,
                                    des: relationList[r].transMoney
                                };

                                relationNameArray[relationLength] = combineName;
                                relationLength++;

                            }

                        }
                    }
                    var option = {

                        title: {
                            text: '资金流转关系图',
                            subtext: '资金流转链',
                            top: 'top',
                            left: 'left'
                        },
                        // 提示框的配置
                        tooltip: {
                            formatter: function (x) {
                                return x.data.des;
                            }
                        },
                        // 工具箱
                        toolbox: {
                            // 显示工具箱
                            show: true,
                            feature: {
                                mark: {
                                    show: true
                                },
                                // 还原
                                restore: {
                                    show: true
                                },
                                // 保存为图片
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        legend: [{
                            // selectedMode: 'single',
                            data: categories.map(function (a) {
                                return a.name;

                            }),
                        }],
                        series: [{
                            type: 'graph', // 类型:关系图
                            layout: 'force', //图的布局，类型为力导图
                            symbolSize: 40, // 调整节点的大小
                            roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [2, 10],
                            color:colors,
                            focusNodeAdjacency: true,
                            itemStyle: {
                                normal: {
                                    borderColor: '#fff',
                                    borderWidth: 1,
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(0, 0, 0, 0.3)'
                                }
                            },

//            focusNodeAdjacency:true,

                            edgeLabel: {
                                normal: {
                                    textStyle: {
                                        fontSize: 20
                                    }
                                }
                            },
                            force: {
                                repulsion: 2500,
                                edgeLength: [10, 50]
                            },
                            draggable: true,
                            lineStyle: {
                                // normal: {
                                //     width: 2,
                                //     color: '#4b565b',
                                // }
                                color: 'source',
                                curveness: 0.3
                            },
                            emphasis: {
                                lineStyle: {
                                    width: 10
                                }
                            },
                            edgeLabel: {
                                normal: {
                                    show: true,
                                    formatter: function (x) {
                                        return x.data.name;
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {}
                                }
                            },

                            // 数据
                            data: nodes_array,
                            links: link_array,
                            categories: categories
                        }]
                    };

                    myChart.setOption(option);
                }




            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.log(XMLHttpRequest.status);
                // console.log(XMLHttpRequest.readyState);
                // console.log(textStatus);
            },
        });
    }

});

/**
 * 校验笔均不得小于0
 */
function checkAvg(){
    var checkAvg = $("#transAvg-input").val();
    if(checkAvg <0 ){
        alert("输入的数字不得小于0");
        $("#transAvg-input").val("");
    }
};

/**
 * 校验笔数不得小于0
 */
function checkNum(){
    var checkNum = $("#transNum-input").val();
    if(checkNum <0 ){
        alert("输入的数字不得小于0");
        $("#transNum-input").val("");
    }
};

/**
 * 校验交易金额不得小于1000万
 */
function checkMoney(){
    var checkMoney = $("#transMoney-input").val();
    if(checkMoney <1000 ){
        alert("输入的数字不得小于1000");
        $("#transMoney-input").val(1000);
    }
};

