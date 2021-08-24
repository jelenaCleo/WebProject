package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.User;
import dto.UserDTO;

public class UserDAO {

	private LinkedHashMap<String, User> users;

	private String path;

	public UserDAO() {
		File dir = new File(System.getProperty("catalina.base") + File.separator + "appData");

		if (!dir.exists()) {
			dir.mkdir();
		}

		this.path = System.getProperty("catalina.base") + File.separator + "appData" + File.separator + "users.json";
		this.users = new LinkedHashMap<String, User>();

	}

	//READ AND WRITE
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
			System.out.println("username: " + u.getUsername() + "\\n");
			users.put(u.getUsername(), u);

		}

	}
	
	public void saveUsersJSON() {
		List<User> allUsers = new ArrayList<User>();
		for(User u : getValues()) {
			allUsers.add(u);
		}
		
		ObjectMapper om = new ObjectMapper();
		try {
			om.writeValue(new FileOutputStream(this.path), allUsers);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	
	//CRUD
	public void addUser(UserDTO user) {
		User newUser = new User(getValues().size()+1,0,0,user.username,user.password,user.name,user.surname,user.gender,user.birthday,user.role,new ArrayList<Integer>(),new ArrayList<Integer>(),new ArrayList<Integer>(),0.0,0);
		if(!users.containsValue(newUser)) {
			users.put(newUser.getUsername(), newUser);
		}
		saveUsersJSON();
	}
	
	public Boolean editUser(UserDTO user) {
		for(User u : getValues()) {
			if(u.getUsername().equals(user.username)){
				u.setName(user.name);
				u.setSurname(user.surname);
				u.setPassword(user.password);
				u.setRole(user.role);
				u.setBirthday(user.birthday);
				u.setGender(user.gender);
				return true;
			}
		}
		return false;
	}

	public User findUserById(Integer ID) {
		for (User currentUser : getValues()) {
			if(currentUser.getID().equals(ID))
				return currentUser;
		}
		
		return null;
	}
	
	public User findUserByUsername(String username) {
		for (User currentUser : getValues()) {
			if(currentUser.getUsername().equals(username))
				return currentUser;
		}
		
		return null;
	}
	
	public User getUserByUsername(String username) {
		if (users.containsKey(username)) {
			return users.get(username);
		}

		return null;
	}
	//BLOCKING
	public void blockUserById(Integer id) {

		User tempUser = findUserById(id);
		if( tempUser != null) {
			tempUser.setBlocked(1);
		}
		
		saveUsersJSON();
	}
	
	public void blockUserByUsername(String username) {

		User tempUser = findUserByUsername(username);
		if( tempUser != null) {
			tempUser.setBlocked(1);
		}
		
		saveUsersJSON();
	}
	
	
	public void unblockUserById(Integer id) {

		User tempUser = findUserById(id);
		if( tempUser != null) {
			tempUser.setBlocked(0);
		}
		
		saveUsersJSON();
	}
	
	public void unblockUserById(String username) {

		User tempUser = findUserByUsername(username);
		if( tempUser != null) {
			tempUser.setBlocked(0);
		}
		
		saveUsersJSON();
	}
	
	public boolean isBlocked(String username) {
			
			return ( getUserByUsername(username).getBlocked() == 1 ) ? true : false;
		}
	
	
	/////////////////////////////////////
	public Collection<User> getValues() {
		return users.values();
	}
	
	public LinkedHashMap<String, User> getUsers() {
		return users;
	}

	public void setUsers(LinkedHashMap<String, User> users) {
		this.users = users;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	
	private void addDummyUsers() {
		
	}

}
