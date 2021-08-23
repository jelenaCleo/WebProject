package dao;

import java.io.File;
import java.util.LinkedHashMap;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.User;

public class UserDAO {

	private LinkedHashMap<String, User> users;
	
	private String path; 
	public UserDAO() {
		File dir = new File(System.getProperty("catalina.base")+ File.separator + "appData");
		
		if(!dir.exists()) {
			dir.mkdir();
		}
		
		this.path = System.getProperty("catalina.base")+ File.separator + "appData"+ File.separator + "users.json";
		this.users = new LinkedHashMap<String, User>();
		
		
	}
	
	public void readUsers() {
		
		ObjectMapper om = new ObjectMapper();
		//xoxoxo
		
	}
	
}
