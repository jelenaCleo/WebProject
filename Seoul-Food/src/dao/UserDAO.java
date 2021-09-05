package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.User;
import dto.ChangePasswordDTO;
import dto.ManagerDTO;
import dto.UserDTO;

public class UserDAO {

	private LinkedHashMap<String, User> users;

	private String path;

	public UserDAO() {
		File dir = new File(System.getProperty("catalina.base") + File.separator + "appData");

		if (!dir.exists()) {
			dir.mkdir();
		}

		this.path = System.getProperty("catalina.base") + File.separator + "appData" + File.separator + "users4.json";
		System.out.println("-------------------USERS FOLDER -------------------" + this.path);

		this.users = new LinkedHashMap<String, User>();

	}

	// READ AND WRITE
	public void readUsers() {

		ObjectMapper om = new ObjectMapper();
		DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		om.setDateFormat(df);

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
			System.out.println("birthday:" + u.getBirthday());
			users.put(u.getUsername(), u);

		}

	}

	public void saveUsersJSON() {
		List<User> allUsers = new ArrayList<User>();
		for (User u : getValues()) {
			System.out.println(u.getBirthday());
			allUsers.add(u);
		}

		ObjectMapper om = new ObjectMapper();
		DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		om.setDateFormat(df);
		try {
			om.writeValue(new FileOutputStream(this.path), allUsers);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	// CRUD
	public Integer addUser(UserDTO user) {
		User newUser = new User(getValues().size() + 1, 0, 0, user.username, user.password, user.name, user.surname,
				user.gender, user.birthday, user.role, new ArrayList<Integer>(), -1,
				new ArrayList<Integer>(), 0.0, 0);
		if (!users.containsValue(newUser)) {
			users.put(newUser.getUsername(), newUser);
			saveUsersJSON();
			return newUser.getID();
		} else {
			return -1;
		}
	}

	public String editUser(UserDTO user, String oldUsername) {

		if (user.username.equals(oldUsername)) {
			for (User u : getValues()) {
				if (u.getUsername().equals(user.username)) {
					u.setName(user.name);
					u.setSurname(user.surname);
					u.setRole(user.role);
					System.out.println("valjda datum u milisekundama " + user.birthday);
					u.setBirthdayDate(user.birthday);

					u.setGender(user.gender);
					saveUsersJSON();
					return "true";
				}
			}
		} else {
			User newUser = findUserByUsername(oldUsername);
			newUser.setUsername(user.username);
			newUser.setUserName(user.username); // nzm zasto imamo dva polja username
			newUser.setName(user.name);
			newUser.setSurname(user.surname);
			newUser.setRole(user.role);
			newUser.setBirthdayDate(user.birthday);
			newUser.setGender(user.gender);
			if (!users.containsKey(newUser.getUsername())) {
				// korisnicko ime je slobodno
				System.out.println("KORISNICKO IME JE SLOBODNO");
				for (User u : getValues()) {
					if (u.getUsername().equals(oldUsername)) {
						u.setUsername(user.username);
						u.setUserName(user.username); // nzm odakle imamo dva polja username
						System.out.println("PROMENILA SAM USRNAME");
						u.setName(user.name);
						u.setSurname(user.surname);
						u.setRole(user.role);
						u.setBirthdayDate(user.birthday);
						u.setGender(user.gender);
						break;
					}
				}
				for (String key : users.keySet()) {
					if (key.equals(oldUsername)) {
						key = user.username;
						break;
					}
				}
				saveUsersJSON();
				return "true";
			} else {
				// korisnicko ime nije slobodno
				System.out.println("KORISNICKO IME NIJE SLOBODNO");
				return "Korisnicko ime je zauzeto!";
			}

		}

		return "true";
	}

	public User findUserById(Integer ID) {
		for (User currentUser : getValues()) {
			if (currentUser.getID().equals(ID))
				return currentUser;
		}

		return null;
	}

	public User findUserByUsername(String username) {
		for (User currentUser : getValues()) {
			if (currentUser.getUsername().equals(username))
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

	// BLOCKING
	public void blockUserById(Integer id) {

		User tempUser = findUserById(id);
		if (tempUser != null) {
			tempUser.setBlocked(1);
		}

		saveUsersJSON();
	}

	public void blockUserByUsername(String username) {

		User tempUser = findUserByUsername(username);
		if (tempUser != null) {
			tempUser.setBlocked(1);
		}

		saveUsersJSON();
	}

	public void unblockUserById(Integer id) {

		User tempUser = findUserById(id);
		if (tempUser != null) {
			tempUser.setBlocked(0);
		}

		saveUsersJSON();
	}

	public void unblockUserByUsername(String username) {

		User tempUser = findUserByUsername(username);
		if (tempUser != null) {
			tempUser.setBlocked(0);
		}

		saveUsersJSON();
	}

	public boolean isBlocked(String username) {

		return (getUserByUsername(username).getBlocked() == 1) ? true : false;
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

	@SuppressWarnings("unused")
	private void addDummyUsers() {

	}

	public User changePassword(ChangePasswordDTO selectedUser) {
		// TODO Auto-generated method stub

		for (User currentUser : getValues()) {

			System.out.println("rodjendan trenutnoog usera bilo kog: " + currentUser.getBirthday());
			System.out.println("trazimo usera");
			if (currentUser.getUsername().equals(selectedUser.username)) {
				System.out.println("nasli smo usera");
				if (currentUser.getPassword().equals(selectedUser.password)) {
					System.out.println("sifre se poklapaju");
					System.out.println("datum rodjenja usera kom menjamo sifru: " + currentUser.getBirthday());
					currentUser.setPassword(selectedUser.newPassword); // OVA LINIJA
					saveUsersJSON();
					System.out.println("izmenjena sifra");
					// User user = getUserByUsername(selectedUser.username);
					System.out.println("rodjendan trenutnoog usera: " + currentUser.getBirthday());
					return currentUser;
				}

			}

		}
		return null;
	}
	
	
	public void logicallyDeleteUserByUsername(String username) {

		User tempUser = findUserByUsername(username);
		if( tempUser != null) {
			tempUser.setLogicalDeleted(1);
		}
		
		saveUsersJSON();
	}
	
	public void logicallyRestoreUserByUsername(String username) {

		User tempUser = findUserByUsername(username);
		if( tempUser != null) {
			tempUser.setLogicalDeleted(0);
		}
		
		saveUsersJSON();
	}
	
	public List<User> getFreeManagers() {
		
		List<User> managers = new ArrayList<>();
		
		
		for(User u : getValues()) {
			if(u.getRole().equals("MANAGER")) {
				if(u.getRestarauntID() == -1) {
					managers.add(u);
				}
			}
		}
		return managers;
	}

	public void addRestaurantToManager(Integer restaurantId, Integer managerID) {
		System.out.println("id restorana:  " + restaurantId + "   id menadzera: " + managerID);
		readUsers();
		for(User u : getValues()) {
			System.out.println(u.getID());
			if(u.getID().equals(managerID)) {
				
				System.out.println("NASAO TRAZENOG MENADZERA");
				u.setRestarauntID(restaurantId);
				System.out.println("ppostavljen id restorana " + u.getRestarauntID());
				saveUsersJSON();
				break;
			}
		}
		
	}
}