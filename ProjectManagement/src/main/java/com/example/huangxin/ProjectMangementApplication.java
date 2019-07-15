package com.example.huangxin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.huangxin.dao.impl.UserDaoImpl;
import com.example.huangxin.entity.User;

@SpringBootApplication
public class ProjectMangementApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectMangementApplication.class, args);
	}
}
   