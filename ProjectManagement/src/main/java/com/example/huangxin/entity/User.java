package com.example.huangxin.entity;

public class User {
	private String _id;//人员ID
	private String userRole;//人员角色
	private String userPassword;//密码
	public String getUserID() {
		return _id;
	}
	public void setUserID(String userID) {
		this._id = userID;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
}
