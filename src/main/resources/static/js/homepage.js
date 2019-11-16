$(function () {
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
    var isForward = 0;

    /**
     * 时间范围，默认为当月时间
     * @type {string}
     */
    var timeRange = $("#timeRange-select option:selected").text();

    /**
     * 交易类别，默认为全部
     * 全部，本行-本行，本行-他行
     * @type {string}
     */
    var transCategory = "全部";

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
        isForward = 1;
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
        isCircle = 0;
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
    });

    /**
     * 探索路径层数
     */
    $("#searchLevel-select").change(function(){
        searchLevel = $("#searchLevel-select option:selected").text();
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
     * 提交查询按钮
     */
    $("#submit-btn").click(function() {
        transMoney = $("#transMoney-input").val();
        transNum = $("#transNum-input").val();
        transAvg = $("#transAvg-input").val();
        companyName = $("#comName-input").val();
        if(companyName == null || companyName == ""){
            alert("请输入客户名称");
        }else{

        }
    });

});