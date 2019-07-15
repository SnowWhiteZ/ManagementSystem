package com.example.huangxin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.huangxin.dao.impl.ProjectDaoImpl;
import com.example.huangxin.dao.impl.TaskDaoImpl;
import com.example.huangxin.entity.Task;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class TaskController {
	@Autowired
	private TaskDaoImpl taskDaoImpl;
	@Autowired
	private ProjectDaoImpl projectDaoImpl;
	
	//创建任务
	/*test:success
	 * 
	 *  projectId:5bac7b3b499a9d23f03e9025
		taskName:taskTest
		taskOwner:baijiameng
		taskStartTime:12:34
		taskEndTime:13:44
		taskStatus:未完成
	 * 
	 */
	@PostMapping(value="/createTaskByProjectId")
	@ResponseBody
	public String createTaskByProjectId(String projectId,String taskName,String taskOwner,String taskStartTime,String taskEndTime,String taskStatus) {
		String taskID = taskDaoImpl.createTaskByProjectId(projectId, taskName, taskOwner, taskStartTime, taskEndTime, taskStatus);
		return taskID;
	}
	
	
	//更新任务的状态 success
	/*
	 * taskId:5baca9bb499a9d22e45e5923
		taskStatus:已完成
	 * 
	 * 
	 * */
	@PostMapping(value="/changeTaskStatus")
	@ResponseBody
	public int changeTaskStatus(String taskId, String taskStatus) {
		if( taskDaoImpl.changeTaskStatus(taskId, taskStatus))
		{
			return 0;
		}
		else {
			return 1;
		}
	}
	//删除任务             success          taskId:5bacab37499a9d22e45e5924
	@PostMapping(value="/deleteTaskByTaskId")
	@ResponseBody
	public int deleteTaskByTaskId(String taskId) {
		if( taskDaoImpl.deleteTaskByTaskId(taskId))
		{
			return 0;
		}
		else {
			return 1;
		}
	}
	
	//获取任务的具体信息   success  taskId:5baca9bb499a9d22e45e5923
	@PostMapping(value="/getTaskByTaskId")
	@ResponseBody
	public Task getTaskByTaskId(String taskId) {
		return taskDaoImpl.getTaskByTaskId(taskId);
	}
	//根据任务ID获取项目参与人员 success c taskId:5baca9bb499a9d22e45e5923
	@PostMapping(value="/getProjectMemberByTaskId")
	@ResponseBody
	public List<String> getProjectMemberByTaskId(String taskId){
		String projectID = taskDaoImpl.getTaskByTaskId(taskId).getProjectId();
		return projectDaoImpl.getProjectByProjectId(projectID).getProjectTeam();
	}
	//根据任务ID,更新任务  success
//	taskId:5baca9bb499a9d22e45e5923
//	taskName:taskTest1
//	taskOwner:huangxin
//	taskEndTime:13:33
//	taskDesp:uodated
	@PostMapping(value="/updateTaskByTaskId")
	@ResponseBody
	public int updateTaskByTaskId(String taskId,String taskName,String taskOwner,String taskStartTime, String taskEndTime,String taskStatus, String taskDesp) {
		if( taskDaoImpl.updateTaskByTaskId(taskId, taskName, taskOwner, taskStartTime,taskEndTime, taskStatus, taskDesp))
		{
			return 0;
		}
		else {
			return 1;
		}
	}
	//根据用户的username获取用户参与的所有任务 success
	@PostMapping(value="/getTaskByUserName")
	@ResponseBody
	public List<Task> getTaskByUserName(String userName){
		List<Task> tasks= taskDaoImpl.getTaskByUserName(userName);
		for (Task task : tasks) {
			task.setProjectId(projectDaoImpl.getProjectByProjectId(task.getProjectId()).getProjectName());
		}
		return tasks;
	}
	
	
}
