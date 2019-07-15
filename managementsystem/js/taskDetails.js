var taskDetails={

    startdate:null,
    taskDesp:null,
    taskName:null,
    taskOwner:null,
    taskEndTime:null,
    taskStatus:null,
	taskId:null,
	task:null,

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

    //进行单点登录判断
    logOrNot:function(){
    	if(sessionStorage.getItem("UserName")!=null){
    		console.log(sessionStorage.getItem("UserName"));
    	}
    	else{
    		window.location.href="sign_in.html"
    	}
    },


    //初始化任务描述
    initTaskDesp:function(){
    	var Request=taskDetails.GetRequest();
    	console.log("here");
    	console.log(Request["taskId"]==null);
    	if(Request["taskId"]!=null){
            sessionStorage.setItem("taskId",Request["taskId"]);
		}
    	$.ajax({
	        url:urllist.task.getTaskByTaskId,
	        type:'POST',
	        dataType:'json',
	        data:{
	        	taskId:sessionStorage.getItem("taskId"),
	        },
	        async:false,
	        success:function(data){
	        	taskDetails.task=data;
	        	console.log(data);
	        	$("#taskName").text(data.taskName)
	        	$("#taskChange0").text(data.taskOwner);
	        	$("#taskChange1").text(data.taskEndTime);
	        	$("#taskDespContent").text(data.taskDesp);
	        	if(data.taskStatus==1 || data.taskStatus=="已完成"){
	        		$("#taskStatusBtn").addClass("btn btn-success");
	        		$("#taskStatusBtn").text("已完成");
	        	}
	        	if(data.taskStatus==0 ||data.taskStatus=="未完成"){
	        		$("#taskStatusBtn").addClass("btn btn-danger");
	        		$("#taskStatusBtn").text("未完成");
	        	}
	        	taskDetails.taskDesp=data.taskDesp;
	        	taskDetails.taskName=data.taskName;
	        	taskDetails.taskOwner=data.taskOwner;
	        	taskDetails.taskEndTime=data.taskEndTime;
	        	taskDetails.taskStatus=data.taskStatus;
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

        taskDetails.taskEndTime = moment().format('YYYY-MM-DD');
        $("#start").val(moment().format('YYYY-MM-DD'));
        $("#dtp_input1").val(moment().format('YYYYMMDD'));

        // taskDetails.taskEndTime = taskDetails.task.taskEndTime;
        // $("#start").val(taskDetails.task.taskEndTime);
        // $("#dtp_input1").val(taskDetails.task.taskEndTime);
        },
    //获取选择时间
    tableSubmit:function(){
        taskDetails.taskEndTime = $("#dtp_input1").val();
    },

    //任务更改框弹出弹入按钮时间函数
    changeTaskOwerAndEndTime:function(){
    	//点击任务拥有人，弹出任务更改框
    	$("#taskChange0").on("click", function(){
			$("#taskChange").css("display","inline");
			$("#Editor").css("opacity",0);
			$("#EditorButton").css("opacity",0);
			$("#taskDesp").css("opacity",0);
			//根据任务id项目参与人员
			$.ajax({
	        url:urllist.task.getProjectMemberByTaskId,
	        type:'POST',
	        dataType:'json',
	        data:{
	        	taskId:sessionStorage.getItem("taskId")
	        },
	        async:false,
	        success:function(data){
	        	console.log("projectTeam");
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
		})
		//点击任务截止时间，弹出任务更改框
		$("#taskChange1").on("click", function(){
			$("#taskChange").css("display","inline");
			$("#Editor").css("opacity",0);
			$("#EditorButton").css("opacity",0);
			$("#taskDesp").css("opacity",0);
			//清除上一次点击按钮加入的选项列表
			while($($("#projectTeam").children()).length>0){
	        	$($("#projectTeam").children()[0]).remove();
	        }
			//根据任务id项目参与人员
			$.ajax({
	        url:urllist.task.getProjectMemberByTaskId,
	        type:'POST',
	        dataType:'json',
	        data:{
	        	taskId:sessionStorage.getItem("taskId")
	        },
	        async:false,
	        success:function(data){
	        	console.log(data.projectTeam);
	        	for(var i=0;i<data.length;i++){
	        		$(".form-control").append("<option>"+data[i]+"</option>");
	        	}
	        }
	    	})
		});
		//点击任务更改框保存按钮出发事件
		$("#taskChange2").on("click", function(){
			$("#taskChange").hide();
			$("#Editor").css("opacity",1);
			$("#EditorButton").css("opacity",1);
			$("#taskDesp").css("opacity",1);
			//获取下拉列表的值
			taskDetails.taskOwner=$("#projectTeam option:selected").text()
			//获取时间选择器选择时间
			taskDetails.tableSubmit();
			//将字符串转为为时间格式
			taskDetails.taskEndTime=taskDetails.taskEndTime.substring(0,4)+"-"+taskDetails.taskEndTime.substring(4,6)+"-"+taskDetails.taskEndTime.substring(6,8);
			//任务指派和截止时间修改后，点击确定按钮后，出发事件，向后台传输数据
			$.ajax({
		        url:urllist.task.updateTaskByTaskId,
		        type:'POST',
		        dataType:'json',
		        data:{
		        	taskId:sessionStorage.getItem("taskId"),
		        	taskOwner:taskDetails.taskOwner,
		        	taskEndTime:taskDetails.taskEndTime,
					taskStartTime:taskDetails.task.taskStartTime,
					taskDesp:taskDetails.task.taskDesp,
					taskStatus:taskDetails.task.taskStatus,

		        },
		        async:false,
		        success:function(data){
		        	window.location.href = "taskDetails.html";
		        	console.log(data.status);
		        }
	    	})
		})
		//点击任务更改框取消按钮触发事件
		$("#taskChange3").on("click", function(){
			$("#taskChange").hide();
			$("#Editor").css("opacity",1);
			$("#EditorButton").css("opacity",1);
			$("#taskDesp").css("opacity",1);
		})

		//点击删除链接删除当前任务，并跳转到项目展示页面
		$("#deleteTask").on("click",function(){
			//点击后删除当前任务
			$.ajax({
	        url:urllist.task.deleteTaskByTaskId,
	        type:'POST',
	        dataType:'json',
	        data:{
	        	taskId:sessionStorage.getItem("taskId")
	        },
	        async:false,
	        success:function(data){
	        	console.log(data.status);
	        	window.location.href = "projectDetails.html?index="+taskDetails.task.projectId;
	        }
	    	})
		})


		// 点击任务状态按钮,修改任务状态
		$("#taskStatusBtn").on("click",function(){
			//点击任务状态按钮后，任务状态切换，并将结果返回后台数据库
			if(taskDetails.taskStatus==0 || taskDetails.taskStatus=="未完成"){
				$("#taskStatusBtn").removeClass("btn btn-danger");
        		$("#taskStatusBtn").addClass("btn btn-success");
        		$("#taskStatusBtn").text("已完成");
        		taskDetails.taskStatus=1;
        	}
        	else if(taskDetails.taskStatus==1 || taskDetails.taskStatus=="已完成"){
        		$("#taskStatusBtn").removeClass("btn btn-success");
        		$("#taskStatusBtn").addClass("btn btn-danger");
        		$("#taskStatusBtn").text("未完成");
        		taskDetails.taskStatus=0;
        	}
        	//将任务状态返回后台数据库更改任务状态
    		$.ajax({
		        url:urllist.task.updateTaskByTaskId,
		        type:'POST',
		        dataType:'json',
		        data:{
                    taskId:sessionStorage.getItem("taskId"),
                    taskOwner:taskDetails.task.taskOwner,
                    taskEndTime:taskDetails.task.taskEndTime,
                    taskStartTime:taskDetails.task.taskStartTime,
                    taskDesp:taskDetails.task.taskDesp,
		        	taskStatus:taskDetails.taskStatus,
		        },
		        async:false,
		        success:function(data){
		        	console.log(data);
		        	taskDetails.task.taskStatus=taskDetails.taskStatus;
		        }
	    	})
		})
    },

    //初始化文本编辑器
    initEditor :function(){
    	$("#EditorContent").text(taskDetails.taskDesp);
    	$("#taskName").text(taskDetails.taskName);
	    $("#taskChange0").text(taskDetails.taskOwner);
	    $("#taskChange1").text(taskDetails.taskEndTime);
	    $("#taskDespContent").text(taskDetails.taskDesp);
    	var E = window.wangEditor;
	    var editor = new E('#Editor');
	    // editor.customConfig.uploadImgShowBase64 = true
	    // editor.create();

	    var $EditorContent = $('#EditorContentText')
        editor.customConfig.onchange = function (html) {
            // 监控变化，同步更新到 textarea
            $EditorContent.val(html)
        }
        editor.create()
        //初始化 textarea 的值
        $EditorContent.val(editor.txt.html())

        //点击保存按钮，获取文本编辑器中的内容，并进行数据传送给后台
        $("#taskChange4").on("click", function(){
			taskDetails.taskDesp=editor.txt.text();
			//修改任务描述后，向后台传输任务修改函数
			$.ajax({
	        url:urllist.task.updateTaskByTaskId,
	        type:'POST',
	        dataType:'json',
	        data:{
                taskId:sessionStorage.getItem("taskId"),
                taskOwner:taskDetails.task.taskOwner,
                taskEndTime:taskDetails.task.taskEndTime,
                taskStartTime:taskDetails.task.taskStartTime,
                taskDesp:taskDetails.taskDesp,
                taskStatus:taskDetails.task.taskStatus,
	        },
	        async:false,
	        success:function(data){
	        	console.log(data.status);
	        	window.location.href = "taskDetails.html";
	        }
	    	})
		})
		//点击取消按钮，页面跳转到任务展示页面
		$("#taskChange5").on("click", function(){
			window.location.href = "taskDetails.html";
		})
    },
}