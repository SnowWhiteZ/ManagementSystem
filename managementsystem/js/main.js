$(document).ready(function(){

	//用户登录老白
	index.login();

	//小张
	zjc.getAllProjectName(); 
	zjc.initNewProject();
	zjc.createNewProject();
	zjc.listMember();
	zjc.updateProjectTeam();

	// 冯
	userInfo.viewTasks();
    projectTeam.viewMembers();

	// 寇
	projectDetails.initProjectDesp();
    projectDetails.addurl();
    projectDetails.initTimetool();
    projectDetails.tableSubmit();
    projectDetails.addTaskOwner();
    projectDetails.createTask();
    projectDetails.getNumber();
    projectDetails.deleteProject();


    // 判断用户是否登录
    // if(sessionStorage.getItem("UserName")!=null){
    //     console.log(sessionStorage.getItem("UserName"));
    //     alert(sessionStorage.getItem("UserName"));
    // }
    // else{
    //     window.location.href="sign_in.html"
    // }

	// 初始化表格时间选择框
	taskDetails.initTimetool();

	//设置显示任务指派人指派时间改变的框
	taskDetails.changeTaskOwerAndEndTime();

	//初始化获取任务详情
	taskDetails.initTaskDesp();

	//初始化文本编辑器
	taskDetails.initEditor();

})