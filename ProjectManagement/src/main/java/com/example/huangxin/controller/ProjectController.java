package com.example.huangxin.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.huangxin.dao.impl.ProjectDaoImpl;
import com.example.huangxin.dao.impl.TaskDaoImpl;
import com.example.huangxin.dao.impl.UserDaoImpl;
import com.example.huangxin.entity.Project;
import com.example.huangxin.entity.Task;

@RestController


@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectController {
	@Autowired
	private UserDaoImpl userDaoImpl;
	@Autowired
	private ProjectDaoImpl projectDaoImpl;
	@Autowired
	private TaskDaoImpl taskDaoImpl;
	
	//获取关于该用户的所有项目 test success
	
	@PostMapping(value="/getAllProjectName")
	@ResponseBody
	public List<Project> getAllProjectName(@RequestParam String userName){
		String role = userDaoImpl.getuserrole(userName);//获取用户角色
		System.out.println(role);
		List<Project> projects = new ArrayList<>();
		if(role.equals("0")) {
			//学生只可查看关于自己的项目
			projects = projectDaoImpl.GetProjectAboutUser(userName);
		}
		else if(role.equals("1")){
			//教师可以查看所有的项目
			projects = projectDaoImpl.GetAllProject();
		}else {
			projects = null;
			System.out.println("身份信息有误，请及时更改");
		}
		return projects;
	}

//test success!
/*	{
		"projectName":"test",
		"projectDesp":"just for test",
		"projectStartTime":"10:47",
		"projectEndTime":"10:47",
		"projectOwner":"baijiameng",
		"projectTeam":["baijiameng","huangxin"]
	}
	*/
	@RequestMapping(value="/createNewProject")
	@ResponseBody
	public int createNewProject(@RequestParam String projectName,String projectDesp,String projectStartTime,String projectEndTime,String projectOwner,String projectTeam) {
		String [] team=projectTeam.split(" ");
		System.out.println(team.length);
		List<String> Team=new ArrayList<String>();
		for(int i=0;i<team.length;i++) {
			Team.add(team[i]);
		}
		System.out.println(Team.size());
		String result = projectDaoImpl.createNewProject(projectName, projectDesp, projectStartTime, projectEndTime, projectOwner,Team);
		System.out.println(result);
		if (result!=null) {
	    	return 0;
	    }
	    else {
	    	return 1;
	    }
	}
	
	//test success!
	//通过项目ID来获得project的信息  id=5bac7b3b499a9d23f03e9025
	@PostMapping(value="/getProjectByProjectId")
	@ResponseBody
	public  List<Object> getProjectByProjectId(@RequestParam String projectId) {
//		projectId = "5bac7b3b499a9d23f03e9025";
		Project project = projectDaoImpl.getProjectByProjectId(projectId);//根据项目ID得到的项目的描述
		List<Task> tasks = taskDaoImpl.GetAllTaskByProjetID(projectId);
		//返回要返回的信息
		List<Object> lists = new ArrayList<>();
		lists.add(project);
		lists.add(tasks);
		return lists;
	}
	
	//test success for username which equal the parameter but not test for "role":
	//id=5bac9c8b499a9d12b0ad1a49 userName=baijiameng
	//删除项目,只有教师和项目负责人有权限删除项目
	@PostMapping(value="/deleteByProjectId")
	
	public int deleteProjectByProjectId(@RequestParam String projectId,@RequestParam String userName) {
		String role = userDaoImpl.getuserrole(userName);
		String result = projectDaoImpl.getProjectByProjectId(projectId).getProjectOwner();
		if(role.equals("1")||result.equals(userName)) {
			projectDaoImpl.deleteProjectByProjectId(projectId);
			return 0;//delete success
		}else {
			return 1;//delete failed
		}
	}
	
	//test success!
	//根据项目ID获取项目参与人员
	//testing pid=5bac7b3b499a9d23f03e9025 
	@PostMapping(value="/getProjectTeamByProjectId")
	
	public List<String> getProjectTeamByProjectId(@RequestParam String projectId){
		System.out.println(projectId);
		return projectDaoImpl.getProjectByProjectId(projectId).getProjectTeam();
	}
	
	
	//test success {
//	"projectId":5bac7b3b499a9d23f03e9025,
//	"projectTeam":["liuweile","zhangjiacheng"]
//}
	@PostMapping(value="/updateProjectTeam")
	
	public int updateProjectTeam(@RequestParam String projectId,@RequestParam String projectTeam) {
		System.out.println(projectTeam);
		System.out.println(projectTeam);
		List<String> team=new ArrayList<>();
		String []teamIn=projectTeam.split(" ");
		for(int i=0;i<teamIn.length;i++) {
			if(teamIn[i].equals("") || teamIn==null || teamIn[i].equals(" ")) {
				continue;
			}
			team.add(teamIn[i]);
		}
		if ((projectId==null) ||team.isEmpty())
		{
			return 1;
		}
		if(projectDaoImpl.updateProjectTeam(projectId, team))
		{
			return 0;
		}
		else {
			return 1;
		}

	}
}
