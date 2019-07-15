package com.example.huangxin.dao;

import java.util.List;

import com.example.huangxin.entity.Task;

public interface TaskDao {
	public List<Task> GetAllTaskByProjetID(String projectID);
	public String createTaskByProjectId(String projectId,String taskName,String taskOwner,String taskStartTime,String taskEndTime,String taskStatus);
	public boolean changeTaskStatus(String taskId,String taskStatus);
	public Task getTaskByTaskId(String taskId);
	public boolean deleteTaskByTaskId(String taskId);
	public boolean updateTaskByTaskId(String taskId,String taskName,String taskOwner,String taskStartTime, String taskEndTime,String taskStatus, String taskDesp);
	public List<Task> getTaskByUserName(String userName);
}
