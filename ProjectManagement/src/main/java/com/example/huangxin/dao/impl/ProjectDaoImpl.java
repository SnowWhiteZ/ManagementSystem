package com.example.huangxin.dao.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import com.example.huangxin.dao.ProjectDao;
import com.example.huangxin.entity.Project;
import com.example.huangxin.entity.Task;
import com.sun.org.apache.bcel.internal.generic.NEW;

//项目数据库的实现
@Component
public class ProjectDaoImpl implements ProjectDao{

	@Autowired
	private MongoTemplate mongotemplate;
	
	//获取所有的项目
	@Override
	public List<Project> GetAllProject() {
		List<Project> projects = mongotemplate.findAll(Project.class,"Project");
		return projects;
	}

	//获取所有的关于自己的项目
	@Override
	public List<Project> GetProjectAboutUser(String username) {
		List<Project> projects = mongotemplate.find(new Query(Criteria.where("projectTeam").in(username)), Project.class,"Project");
		System.out.println(projects);
		return projects;
	}
	//创建一个新项目
	@Override
	public String createNewProject(String projectName, String projectDesp, String projectStartTime, String projectEndTime,String projectOwner,List<String> projectTeam) {
		Project project = new Project();
		project.setProjectName(projectName);
		project.setProjectDesp(projectDesp);
		project.setProjectEndtime(projectEndTime);
		project.setProjectStartTime(projectStartTime);
		project.setProjectOwner(projectOwner);
		project.setProjectTeam(projectTeam);
		project.setProjectState("0");
		mongotemplate.save(project, "Project");
		return project.get_id();
	}
	//根据projectID来获取project的项目
	@Override
	public Project getProjectByProjectId(String projectID) {
		Project project = mongotemplate.findOne(new Query(Criteria.where("_id").is(projectID)), Project.class, "Project");
		return project;
	}
	//删除项目
	@Override
	public boolean deleteProjectByProjectId(String projectId) {
		boolean res = mongotemplate.remove(new Query(Criteria.where("_id").is(projectId)), Project.class, "Project").wasAcknowledged();
		boolean resTask = mongotemplate.remove(new Query(Criteria.where("projectId").is(projectId)), Task.class, "Task").wasAcknowledged();
		return res&&resTask;
	}
	//更新项目成员
	@Override
	public boolean updateProjectTeam(String projectId, List<String> projectTeam) {
		return mongotemplate.updateFirst(new Query(Criteria.where("_id").is(projectId)), new Update().set("projectTeam", projectTeam), "Project").wasAcknowledged();
	}
}