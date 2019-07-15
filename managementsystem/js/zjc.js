var zjc={

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

    getAllProjectName:function(){
         var userName = sessionStorage.getItem("userName");
        
         $.ajax({
         url:urllist.allProjectName.projectName,
         type:"post",
         data:{userName:userName},
         dataType:"json",
         success:function(data){
             console.log(data);
                for (var i=0;i<data.length;i++){
                    var x = data[i].projectName;
                    var y = "projectDetails.html";
                    var z = data[i]._id;
                    console.log(z);
                    var a = data[i].projectOwner;
                    var s = data[i].projectStartTime;
                    var e = data[i].projectEndtime;
                    var t1='<li class="project-name-view"><a target="_blank" class="projcet-detail" href="';
                    var t2="</a>";
                    var t3="?index=";
                    var t4 = '<div style="float:right;font-weight:lighter;color:#606060">'
                    $(".projectNameList").append(t1+y+t3+z+'">'+x+t2+t4+s+'—'+e+' '+'<b>'+a+'<b>'+'</div></li>');
                };
        }
        });
    },

    initNewProject:function(){
        var userName = sessionStorage.getItem("userName");
        $.ajax({
            type:"post",
            url:urllist.allNames.getAlUser,
            data:{},
            dataType:"json",
            success:function(data){
            data.forEach(function(d){
                console.log(d);
                var y = '<label  class="btn btn-danger" style="margin:5px;border-radius:10px;"><input type="checkbox" class="btn btn-danger" name="name"value="'
                $("#projectTeam_btn").append(y+d.userID+'">'+d.userID+'</label>')
                });
            }
        });

        $("#tolink").on('click', function(){
            $("#tolink").hide();
            $("#tobutton1").show();                 
            $("#collapseOne").collapse('hide');
            $(".member-list").show();
            var x = $(":checked").serializeArray();
            for(i=0;i<x.length;i++){
                var n = x[i].value;
                $(".member-list").append('<input type="text" class="projectTeam" name="projectTeam" value="'+n+'">')
            }
        });

        $("#tobutton").on('click', function(){
            $("#tolink").show(); 
            $("#tobutton").hide();                           
            $("#collapseOne").collapse('show');  
        });

         $("#tobutton1").on('click', function(){
            $("#tolink").show(); 
            $("#tobutton1").hide();                           
            $("#collapseOne").collapse('show');
            $(".member-list").hide(); 
            $(".projectTeam").remove();
        });
    },

    createNewProject:function(){
        var userName = sessionStorage.getItem("userName");
            
        $("#btn-create-project").click(function createNewProject(){
                var projectName = $("#projectName").val();
                var projectDesp = $("#projectDesp").val();
                var x = $(".projectTeam").serializeArray();
                console.log(x);
                var projectTeam=[];
                projectTeam.push(userName);
                //获取团队成员
                for(var i=0;i<x.length;i++){
                    projectTeam.push(x[i]['value']);
                }
                console.log(projectTeam);
                console.log(time.enddate);
                console.log(time.startdate);
                projectTeam=projectTeam.join(" ");

                $.ajax({
                url:urllist.newProject.createNewProject,
                type:"post",
                data:{
                    projectName: projectName,
                    projectDesp: projectDesp,
                    projectStartTime:time.startdate,
                    projectEndTime:time.enddate,
                    projectOwner: userName,
                    projectTeam: projectTeam
                    },
                    dataType:"json",
                async:false,
                error:function(e){
                console.log(e);
                },
                success:function(){
                    console.log("success");
                    window.location.href="project.html";
                }
                }); 
        });
    },


    listMember:function(){
        var Request=zjc.GetRequest();
        zjc.projectId=Request['projectId'];

        $.ajax({
            type:"post",
            url:urllist.allNames.getProjectTeamByProjectId,
            data:{projectId:Request['projectId']},
            dataType:"json",
            success:function(t){
                console.log("team");
                console.log(t);
                var y = '<label  class="btn btn-danger active" style="margin:5px;border-radius:10px;"><input type="checkbox" class="btn btn-danger" name="name" value="'
                var z = '<label  class="btn btn-success active" disabled="disabled" style="margin:5px;border-radius:10px;"><input type="checkbox" class="btn btn-danger" name="name" value=" '
                var o = t[0];
                $(".btn-group1").append(z+o+'" checked>'+o+'</label>')
                for (var i=1;i<t.length;i++){
                    var n = t[i];
                    $(".btn-group1").append(y+n+'" checked>'+n+'</label>')
                }

                $.ajax({
                    type:"post",
                    url:urllist.allNames.getAlUser,
                    data:{}, /*这个的参数可以省略吗？*/
                    dataType:"json",
                    success:function(data){
                        console.log(data);
                        data.forEach(function(d){
                            var c = 1; /*计数器*/ 
                            for(var i = 1;i<t.length;i++){
                                var n = t[i];
                                if(d.userID!=o&&d.userID!=n){
                                    c++;
                                }
                                else{
                                    break;
                                }
                                if(c==t.length){
                                var y = '<label  class="btn btn-danger" style="margin:5px;border-radius:10px;"><input type="checkbox" class="btn btn-danger" name="name"value="'
                                $(".btn-group2").append(y+d.userID+'">'+d.userID+'</label>');}
                            }    
                        });
                    }
                });         
            }
        });
    },

    
    updateProjectTeam:function(){
        var Request=zjc.GetRequest();
        zjc.projectId=Request['projectId'];

        $("#btn-save-members").click(function(){
            var x = $(":checked").serializeArray();
            console.log("team2");
            console.log(x);
            projectTeam=[];
            for(var i=0;i<x.length;i++){
                projectTeam.push(x[i].value);
            }
            console.log(projectTeam);
            projectTeam=projectTeam.join(" ");

            $(".btn-group2 label.active").appendTo(".btn-group1");
            $(".btn-group1 label.active").appendTo(".btn-group2");
            $(".btn-group1 label").appendTo(".btn-group2");
            $(".btn-group2 label.active").appendTo(".btn-group1")

            $.ajax({
                url:urllist.allNames.updateProjectTeam,
                data:{
                        projectTeam: projectTeam,
                        projectId:zjc.projectId
                },
                type:"post",
                dataType:"json",
                success:function(data){
                    window.location.href="projectTeam.html?projectId="+zjc.projectId;
                }
             });
        });
    }

}