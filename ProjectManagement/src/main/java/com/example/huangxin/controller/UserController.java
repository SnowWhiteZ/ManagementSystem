package com.example.huangxin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.huangxin.dao.impl.UserDaoImpl;
import com.example.huangxin.entity.User;

@RestController

public class UserController {
	
	@Autowired
	private UserDaoImpl userDaoImpl;
	
	//用户注册
	@PostMapping(value="/signUpByNameAndPasswordAndRole")
	@CrossOrigin(origins = "*", maxAge = 3600)
	public int signUpByNameAndPasswordAndRole(@RequestParam String userName,@RequestParam String userPassword,@RequestParam String userRole) {
		if(userDaoImpl.getusername(userName))
			return 2;
		User user = new User();
		user.setUserID(userName);
		user.setUserPassword(userPassword);
		user.setUserRole(userRole);
		userDaoImpl.save(user);
		String id = user.getUserID();
		if(id!=null)
		{
			return 0;//成功返回0
		}
		else
		{
			return 1;//失败返回1
		}
	}
	//用户登录
	@PostMapping(value="/signInByNameAndPassword")
	@CrossOrigin(origins = "*", maxAge = 3600)
	public int signInByNameAndPassword(@RequestParam String userName,@RequestParam String userPassword) {
		String name = userName;
		String password = userPassword;
		List<User> users = userDaoImpl.login(name, password);
		if(users.isEmpty()||users.size()>1) {
			System.out.print("用户名或密码错误");
			return 1;//失败返回1
		}else {
			System.out.print("登陆成功");
			return 0;//成功返回0
		}
	}
	
	//获取所有用户
	@PostMapping(value="/getAlUser")
	@CrossOrigin(origins = "*", maxAge = 3600)
	public List<User> getAllUser(){
		return userDaoImpl.getAllUser();
	}
}
