package com.example.huangxin.entity;

import java.util.List;

public class Project {
	private String _id; //项目的id
	private String projectName;//项目名称
	private String projectDesp;//项目描述
	private String projectStartTime;//项目开始时间
	private String projectEndtime;//项目deadline
	private String projectOwner;//项目创建人
	private String projectState;//项目的状态
	private List<String> projectTeam;//项目成员
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getProjectDesp() {
		return projectDesp;
	}
	public void setProjectDesp(String projectDesp) {
		this.projectDesp = projectDesp;
	}
	public String getProjectStartTime() {
		return projectStartTime;
	}
	public void setProjectStartTime(String projectStartTime) {
		this.projectStartTime = projectStartTime;
	}
	public String getProjectEndtime() {
		return projectEndtime;
	}
	public void setProjectEndtime(String projectEndtime) {
		this.projectEndtime = projectEndtime;
	}
	public String getProjectOwner() {
		return projectOwner;
	}
	public void setProjectOwner(String projectOwner) {
		this.projectOwner = projectOwner;
	}
	public String getProjectState() {
		return projectState;
	}
	public void setProjectState(String projectState) {
		this.projectState = projectState;
	}
	public List<String> getProjectTeam() {
		return projectTeam;
	}
	public void setProjectTeam(List<String> projectTeam) {
		this.projectTeam = projectTeam;
	}
}
