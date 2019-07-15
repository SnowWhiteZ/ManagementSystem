package com.example.huangxin.entity;

public class Task {
	private String _id;//任务ID
	private String taskOwner;//任务负责人ID
	private String projectId;//项目ID
	private String taskName;//任务名称
	private String taskDesp;//任务描述
	private String taskStartTime;//任务开始时间
	private String taskEndTime;//任务结束时间
	private String taskStatus;//任务的状态
	public String getTaskId() {
		return _id;
	}
	public void setTaskId(String taskId) {
		this._id = taskId;
	}
	public String getTaskOwner() {
		return taskOwner;
	}
	public void setTaskOwner(String taskOwner) {
		this.taskOwner = taskOwner;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getTaskDesp() {
		return taskDesp;
	}
	public void setTaskDesp(String taskDesp) {
		this.taskDesp = taskDesp;
	}
	public String getTaskStartTime() {
		return taskStartTime;
	}
	public void setTaskStartTime(String taskStartTime) {
		this.taskStartTime = taskStartTime;
	}
	public String getTaskEndTime() {
		return taskEndTime;
	}
	public void setTaskEndTime(String taskEndTime) {
		this.taskEndTime = taskEndTime;
	}
	public String getTaskStatus() {
		return taskStatus;
	}
	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}
}
