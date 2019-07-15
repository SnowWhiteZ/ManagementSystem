package com.example.huangxin.dao.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import com.example.huangxin.dao.UserDao;
import com.example.huangxin.entity.Project;
import com.example.huangxin.entity.User;

//用户数据库的实现
@Component
public class UserDaoImpl implements UserDao {
	
	@Autowired
	private MongoTemplate mongotemplate;
	
	//保存用户
	@Override
	public String save(User user) {
		mongotemplate.save(user,"User");
		System.out.println("存储成功");
		return user.getUserID();
	}

	//用户登录
	@Override
	public List<User> login(String userName, String password) {
		List<User> users = mongotemplate.find(new Query(Criteria.where("_id").is(userName).and("userPassword").is(password)), User.class, "User");
		System.out.println("匹配的个数为"+users.size());
		return users;
	}
	//根据用户名获取用户的身份角色
	@Override
	public String getuserrole(String userName) {
		return mongotemplate.find(new Query(Criteria.where("_id").is(userName)), User.class, "User").get(0).getUserRole();
	}

	//判断用户名是否已经被注册
	@Override
	public boolean getusername(String userName) {
		List<User> users = mongotemplate.find(new Query(Criteria.where("_id").is(userName)), User.class, "User");
		if(users.size()>0)
			return true;
		return false;
	}
	
	//根据用户名获取所有用户
	public List<User> getAllUser(){
		List<User> users = mongotemplate.findAll(User.class,"User");
		return users;
	}
}
