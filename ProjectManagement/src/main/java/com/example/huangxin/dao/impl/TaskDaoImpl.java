package com.example.huangxin.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import com.example.huangxin.dao.TaskDao;
import com.example.huangxin.entity.Project;
import com.example.huangxin.entity.Task;

//任务的数据库的实现
@Component
public class TaskDaoImpl implements TaskDao{
	
	@Autowired
	private MongoTemplate mongotemplate;
	
	//根据ProjectId 获取所有的该项目下的任务
	@Override
	public List<Task> GetAllTaskByProjetID(String projectID) {
		List<Task> tasks = mongotemplate.find(new Query(Criteria.where("projectId").is(projectID)),Task.class,"Task");
		return tasks;
	}
	//创建任务
	@Override
	public String createTaskByProjectId(String projectId, String taskName, String taskOwner, String taskStartTime,
			String taskEndTime, String taskStatus) {
		Task task = new Task();
		task.setProjectId(projectId);
		task.setTaskName(taskName);
		task.setTaskOwner(taskOwner);
		task.setTaskStartTime(taskStartTime);
		task.setTaskEndTime(taskEndTime);
		task.setTaskStatus(taskStatus);
		mongotemplate.save(task, "Task");
		return task.getTaskId();
	}
	//更改任务的状态
	@Override
	public boolean changeTaskStatus(String taskId, String taskStatus) {
		return mongotemplate.updateFirst(new Query(Criteria.where("_id").is(taskId)), new Update().set("taskStatus", taskStatus), "Task").wasAcknowledged();
	}
	//根据任务ID获取任务
	@Override
	public Task getTaskByTaskId(String taskId) {
		return mongotemplate.findOne(new Query(Criteria.where("_id").is(taskId)), Task.class, "Task");
	}
	//删除任务
	@Override
	public boolean deleteTaskByTaskId(String taskId) {
		return mongotemplate.remove(new Query(Criteria.where("_id").is(taskId)), Task.class, "Task").wasAcknowledged();
	}
	//更新任务
	@Override
	public boolean updateTaskByTaskId(String taskId,String taskName,String taskOwner,String taskStartTime, String taskEndTime, String taskStatus, String taskDesp) {
		Update update = new Update();
		if(taskName != null && !taskName.equals(""))
			update.set("taskName", taskName);
		if(taskOwner != null && !taskOwner.equals(""))
			update.set("taskOwner", taskOwner);
		if(taskStartTime != null && !taskStartTime.equals(""))
			update.set("taskStartTime", taskStartTime);
		if(taskEndTime != null && !taskEndTime.equals(""))
			update.set("taskEndTime", taskEndTime);
		if(taskStatus != null && !taskStatus.equals(""))
			update.set("taskStatus", taskStatus);
		if(taskDesp != null && !taskDesp.equals(""))
			update.set("taskDesp", taskDesp);
		return mongotemplate.upsert(new Query(Criteria.where("_id").is(taskId)), update, "Task").wasAcknowledged();
	}
	//获取一个用户的所有的任务
	@Override
	public List<Task> getTaskByUserName(String userName) {
		return mongotemplate.find(new Query(Criteria.where("taskOwner").is(userName)), Task.class, "Task");
	}

}
