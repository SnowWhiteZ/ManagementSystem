var time={

    startdate:null,
    //时间选择器初始化
    initTimetool:function(){
        $('.form_date1').datetimepicker({
            //language:  'fr',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0,
            pickerPosition: "bottom-left"
        });

        time.startdate = moment().format('YYYYMMDD');
        $("#start").val(moment().format('YYYY-MM-DD'));
        $("#dtp_input1").val(moment().format('YYYYMMDD'));
        },
    //获取选择时间
    tableSubmit:function(){
        time.startdate = $("#dtp_input1").val();
    },
}

$(document).ready(function(){
    // 初始化表格时间选择框
    time.initTimetool();
})