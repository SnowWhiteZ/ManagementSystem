var url={
    url:"http://localhost:8000/",
}
var urllist={
	task:{

		getTaskByTaskId:url.url+"getTaskByTaskId",
		updateTaskByTaskId:url.url+"updateTaskByTaskId",
		getProjectMemberByTaskId:url.url+"getProjectMemberByTaskId",
		deleteTaskByTaskId:url.url+"deleteTaskByTaskId",
	},
	// 白
	index_url:url.url+"signInByNameAndPassword",

	// 小张
	allProjectName:{
		projectName:url.url+"getAllProjectName"
	},

	allNames:{
        getAlUser:url.url+"getAlUser",
        getProjectTeamByProjectId:url.url+"getProjectTeamByProjectId",
        updateProjectTeam:url.url+"updateProjectTeam"
	},

	newProject:{
        createNewProject:url.url+"createNewProject"
	},

	// 寇
	project:{
        getProjectByProjectId:url.url+"getProjectByProjectId",
        getProjectTeamByProjectId:url.url+"getProjectTeamByProjectId",
        createTaskByProjectId:url.url+"createTaskByProjectId",
        deleteProjectByProjectId:url.url+"deleteByProjectId",

    },
    // 冯
    userInfo:{
        getTaskByUserName:url.url+"getTaskByUserName",
        changeTaskStatus:url.url+"changeTaskStatus",
	},

	projectTeam:{
        getProjectTeamByProjectId:url.url+"getProjectTeamByProjectId"
	}
}