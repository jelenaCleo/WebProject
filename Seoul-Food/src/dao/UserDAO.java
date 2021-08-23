package dao;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
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

		File file = new File(this.path);
		
		List<User> userlist = new ArrayList<User>();
		
		try {
			userlist = om.readValue(file, new TypeReference<List<User>>() {
			});
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		for (User u : userlist) {
			System.out.println("username: "+ u.getUsername() + "\\n");
			users.put(u.getUsername(),u);
			
		}
		
		
		
		
		
	}
	
}
