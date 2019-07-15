var projectDetails={

    startdate:null,
    projectDesp:null,
    taskDesp:null,
    projectName:null,
    projectOwner:null,
    projectDetail :null,
    projectEndTime:null,
    projectTeam:null,
    taskName:null,
    taskOwner:null,
    taskStartTime:null,
    taskEndTime:null,
    taskStatus:null,
    taskUrl:null,
    taskId:null,
    projectId:null,

    GetRequest:function(){
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },

//项目描述初始化
    initProjectDesp:function(){
        var Request = projectDetails.GetRequest();
        $(".newtask").attr("href","createTask.html?projectId="+Request['index']);
        projectDetails.projectId=Request['index'];
        $.ajax({
            url:urllist.project.getProjectByProjectId,
            type:'POST',
            dataType:'json',
            data:{
                projectId:Request['index'],
            },
            async:false,
            success:function(data){
                console.log("here");
                console.log(data);
                $("#projectName").text(data[0].projectName);
                $("#projectDespContent").text(data[0].projectDesp);
                $("#taskId").text(data[1].taskId);
                var x1='<a href="projectTeam.html">'
                var x2='</a>'
                $(".memberNumber").append(x1+data[1].projectTeam.length+x2);


                projectDetails.projectName=data[0].projectName;
                projectDetails.projectDespContent=data[0].projectDesp;
                projectDetails.projectTeam=data[0].projectTeam;
                projectDetails.taskName=data[1].taskName;
                projectDetails.taskOwner=data[1].taskOwner;
                projectDetails.taskEndTime=data[1].taskEndTime;
                projectDetails.taskStatus=data[1].taskStatus;
                projectDetails.taskId=data[1].taskId;
                projectDetails.taskStartTime=data[1].taskStartTime;
            }
        })
    },

    //为taskname添加url
    addurl:function(){
        var Request = projectDetails.GetRequest();
        $.ajax({
            url:urllist.project.getProjectByProjectId,
            type:'POST',
            dataType:'json',
            data:{
                projectId:Request['index'],
            },
            async:false,
            success:function(data){

                data=data[1];

                for (var i=0;i<data.length;i++) {
                    var t1 = '<li class="task-name-view"><a target="_blank" href="';
                    var t2 = "</a>";
                    var t3 = '<p class="taskStatus1">';
                    var t4 = '</p>';
                    var t5 = "</li>";
                    var t6 = '<p class="taskStatus2">';
                    if (data[i].taskStatus == 1) {
                        $(".taskname").append(t1 + "taskDetails.html?taskId="+data[i].taskId+'">' + data[i].taskName + t2 + "&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].taskOwner + "&nbsp;&nbsp;开始时间：" + data[i].taskStartTime + "&nbsp;&nbsp;截止时间：" + data[i].taskEndTime + "&nbsp;&nbsp;" + t3 + "已完成" + t4 + t5);

                    }
                    else {
                        $(".taskname").append(t1 + "taskDetails.html?taskId="+data[i].taskId + '">' + data[i].taskName + t2 + "&nbsp;&nbsp;&nbsp;&nbsp;" + data[i].taskOwner + "&nbsp;&nbsp;开始时间：" + data[i].taskStartTime + "&nbsp;&nbsp;截止时间：" + data[i].taskEndTime + "&nbsp;&nbsp;" + t6 + "未完成" + t4 + t5);

                    }
                }

            }
        })
    },
    //获取成员数量
    getNumber:function(){
        $("#projectTeamNumber").attr("href","projectTeam.html?projectId="+projectDetails.projectId);
        $.ajax({
            url: urllist.project.getProjectTeamByProjectId,
            type: 'POST',
            dataType: 'json',
            data: {
                projectId: projectDetails.projectId
            },
            async: false,
            success: function (data) {
                console.log(data);
                $("#memberNumber").text(data.length);
            }
        })
    },

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

        projectDetails.taskStartTime = moment().format('YYYYMMDD');
        $("#start1").val(moment().format('YYYY-MM-DD'));
        $("#dtp_input1").val(moment().format('YYYYMMDD'));

        $('.form_date2').datetimepicker({
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

        projectDetails.taskEndTime = moment().format('YYYYMMDD');
        $("#start2").val(moment().format('YYYY-MM-DD'));
        $("#dtp_input2").val(moment().format('YYYYMMDD'));
    },
    //获取选择时间
    tableSubmit:function(){
        projectDetails.taskStartTime = $("#dtp_input1").val();
        projectDetails.taskEndTime = $("#dtp_input2").val();
    },

    //任务指派对象获取
    addTaskOwner:function(){
        var Request = projectDetails.GetRequest();
        $.ajax({
            url:urllist.project.getProjectTeamByProjectId,
            type:'POST',
            dataType:'json',
            data:{
                projectId:Request["projectId"]
            },
            async:false,
            success:function(data){
                console.log(data);
                //清除上一次点击按钮加入的选项列表
                while($($("#projectTeam").children()).length>0){
                    $($("#projectTeam").children()[0]).remove();
                }
                for(var i=0;i<data.length;i++){
                    $("#projectTeam").append("<option>"+data[i]+"</option>");
                }
            }
        })
        projectDetails.taskOwner=$("#projectTeam option:selected").text()
    },
    //保存新建任务内容并向后台传输
    createTask:function(){
        projectDetails.addTaskOwner();
        var Request = projectDetails.GetRequest();
        $("#createTask").on("click", function() {
            projectDetails.taskName=$("#task_name").val();
            projectDetails.taskOwner = $("#projectTeam option:selected").text()
            //获取时间选择器选择时间
            projectDetails.tableSubmit();
            //将字符串转为为时间格式
            projectDetails.taskStartTime = projectDetails.taskStartTime.substring(0, 4) + "-" + projectDetails.taskStartTime.substring(4, 6) + "-" + projectDetails.taskStartTime.substring(6, 8);
            projectDetails.taskEndTime = projectDetails.taskEndTime.substring(0, 4) + "-" + projectDetails.taskEndTime.substring(4, 6) + "-" + projectDetails.taskEndTime.substring(6, 8);
            //任务指派和截止时间修改后，点击确定按钮后，出发事件，向后台传输数据
            $.ajax({
                url: urllist.project.createTaskByProjectId,
                type: 'POST',
                dataType: 'json',
                data: {
                    projectId: Request["projectId"],
                    taskName: projectDetails.taskName,
                    taskOwner: projectDetails.taskOwner,
                    taskStartTime:projectDetails.taskStartTime,
                    taskEndTime: projectDetails.taskEndTime,
                    taskStatus:0
                },
                async: false,
                success: function (data) {
                    console.log("create task success");
                    console.log(data);
                    window.location.href = "projectDetails.html?index="+Request["projectId"];
                }
            })
            window.location.href = "projectDetails.html?index="+Request["projectId"];
        })

        $("#nocreateTask").on("click", function(){
            window.location.href = "projectDetails.html?index="+Request["projectId"];
        })
    },
    //点击删除链接删除当前项目，并跳转到项目列表
    deleteProject:function() {
            $("#deleteProject").on("click", function () {
            //点击后删除当前任务
            $.ajax({
                url: urllist.project.deleteProjectByProjectId,
                type: 'POST',
                dataType: 'json',
                data: {
                    projectId:projectDetails.projectId,
                    userName:sessionStorage.getItem("userName"),
                },
                async: false,
                success: function (data) {
                    console.log(data.status);
                    window.location.href = "project.html";
                }
            })
        })
    },


}














