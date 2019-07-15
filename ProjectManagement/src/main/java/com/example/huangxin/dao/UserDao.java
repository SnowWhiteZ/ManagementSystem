package com.example.huangxin.dao;
import java.util.List;

//用户操作数据库的接口
import com.example.huangxin.entity.User;

public interface UserDao {
	public String save(User member);
	public List<User> login(String userName,String password);
	public List<User> getAllUser();
	public String getuserrole(String userName);
	public boolean getusername(String userName);
}
