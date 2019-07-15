var userInfo = {
    user_name: null,

    viewTasks: function(){
        $("#userName").text(sessionStorage.getItem("userName"));
        $.ajax({
            url: urllist.userInfo.getTaskByUserName,
            type: 'POST',
            dataType: 'json',
            data: {
                userName: sessionStorage.getItem("userName")
            },
            async: false,
            success: function(data){
                console.log(data);
                $("#tasks ul").html("");
                for(var i=0;i<data.length;i++){
                    if(data[i].taskStatus=="1" ||data[i].taskStatus==1|| data[i].taskStatus=="已完成"){
                        $("#tasks ul").append('<li class="todo"><div class="todo-wrap"><div class="simple-checkbox checked" style="height: 18px; width: 18px;"><div class="checkbox-container" style="border: 1.8px solid;"><div class="checkbox-tick" style="border-right: 1.52px solid; border-bottom: 1.52px solid;"></div></div></div><span class="todo-content">' +
                            '<span class="content-linkable"><a href="taskDetails.html?taskId='+data[i].taskId+'" style="color: #000000">' +
                            data[i].taskName +
                            '</a></span>' +
                            '</span><span class="operation">' +
                            '<a class="label"><span>' +
                            data[i].projectId +
                            '</span></a>' +
                            '<a class="label" href="updateTask.html?taskId='+data[i].taskId+'"><span class="glyphicon glyphicon-edit" >编辑</span></a>' +
                            '</span></div></li>'
                        );
                    }
                    else{
                        $("#tasks ul").append(  '<li class="todo"><div class="todo-wrap"><div class="simple-checkbox" style="height: 18px; width: 18px;"><div class="checkbox-container" style="border: 1.8px solid;"><div class="checkbox-tick" style="border-right: 1.52px solid; border-bottom: 1.52px solid;"></div></div></div><span class="todo-content">' +
                            '<span class="content-linkable"><a href="taskDetails.html?taskId='+data[i].taskId+'" style="color: #000000">' +
                            data[i].taskName +
                            '</a></span>' +
                            '</span><span class="operation">' +
                            '<a class="label"><span>' +
                            data[i].projectId +
                            '</span></a>' +
                            '<a class="label" href="updateTask.html?taskId='+data[i].taskId+'"><span class="glyphicon glyphicon-edit" >编辑</span></a>' +
                            '</span></div></li>'
                        );
                    }
                }
            }
        })
    },

}