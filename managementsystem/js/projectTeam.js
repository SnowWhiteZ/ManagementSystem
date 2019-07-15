var projectTeam = {
    projectId: null,
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

    viewMembers: function(){
        var Request=projectTeam.GetRequest();
        projectTeam.projectId=Request["projectId"];
        $("#updateProjectTeam").attr("href","projectTeamUpdate.html?projectId="+projectTeam.projectId);
        $("#goback").attr("href","projectDetails.html?index="+projectTeam.projectId);
        $.ajax({
            url: urllist.projectTeam.getProjectTeamByProjectId,
            type: 'POST',
            dataType: 'json',
            data: {
                projectId: projectTeam.projectId
            },
            async: false,
            success: function(data){
                $("#page-project-members ul").html("");
                for(var i=0;i<data.length;i++){
                    $("#page-project-members ul").append('<li class="member"><a title="liuweile" class="member-link" data-stack=""><img src="./image/avatar' + (i%8).toString() + '.jpg" class="avatar" alt=""><span class="name">' + 
                                                    data[i] +
                                                    '</span><span class="role">' + 
                                                    data[i].userRole +
                                                    '</span></a></li>'
                                                   );
                    
                }
            }
        })
    }
}   