package com.example.huangxin.dao;

import java.util.List;
import com.example.huangxin.entity.Project;

public interface ProjectDao {
	public List<Project> GetAllProject();
	public List<Project> GetProjectAboutUser(String username);
	public String createNewProject(String projectName, String projectDesp, String projectStartTime, String projectEndTime,String projectOwner,List<String> projectTeam);
	public Project getProjectByProjectId(String projectID);
	public boolean deleteProjectByProjectId(String projectId);
	public boolean updateProjectTeam(String projectId,List<String> projectTeam) ;
}
