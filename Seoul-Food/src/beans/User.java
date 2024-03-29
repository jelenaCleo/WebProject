package beans;

import java.util.Date;
import java.util.List;

public class User {

	private Integer ID;
	private Integer logicalDeleted; // 1 - deleted, 0 - not deleted
	private Integer blocked; // 1 - blocked, 0 - not blocked
	private String username;
	private String password;
	private String name;
	private String surname;
	private String gender;
	private Date birthday;
	private String role;

	private List<Integer> allOrders;
	// Korpa
	private List<Integer> restaurants;
	private List<Integer> ordersToDeliver;
	private Double points;
	private Integer buyerClass; // GOLD, SILVER, BRONZE

	public User() {
		super();
	}

	public User(Integer iD, Integer logicalDeleted, Integer blocked, String username, String password, String name,
			String surname, String gender, Date birthday, String role, List<Integer> allOrders,
			List<Integer> restaurants, List<Integer> ordersToDeliver, Double points, Integer buyerClass) {
		super();
		ID = iD;
		this.logicalDeleted = logicalDeleted;
		this.blocked = blocked;
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.birthday = birthday;
		this.role = role;
		this.allOrders = allOrders;
		this.restaurants = restaurants;
		this.ordersToDeliver = ordersToDeliver;
		this.points = points;
		this.buyerClass = buyerClass;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<Integer> getAllOrders() {
		return allOrders;
	}

	public void setAllOrders(List<Integer> allOrders) {
		this.allOrders = allOrders;
	}

	public List<Integer> getRestaurants() {
		return restaurants;
	}

	public void setRestaurants(List<Integer> restaurants) {
		this.restaurants = restaurants;
	}

	public List<Integer> getOrdersToDeliver() {
		return ordersToDeliver;
	}

	public void setOrdersToDeliver(List<Integer> ordersToDeliver) {
		this.ordersToDeliver = ordersToDeliver;
	}

	public Double getPoints() {
		return points;
	}

	public void setPoints(Double points) {
		this.points = points;
	}

	public Integer getBuyerClass() {
		return buyerClass;
	}

	public void setBuyerClass(Integer buyerClass) {
		this.buyerClass = buyerClass;
	}

	public Integer getID() {
		return ID;
	}

	public void setID(Integer iD) {
		ID = iD;
	}

	public Integer getLogicalDeleted() {
		return logicalDeleted;
	}

	public void setLogicalDeleted(Integer logicalDeleted) {
		this.logicalDeleted = logicalDeleted;
	}

	public Integer getBlocked() {
		return blocked;
	}

	public void setBlocked(Integer blocked) {
		this.blocked = blocked;
	}

	public String getUserName() {
		return username;
	}

	public void setUserName(String userName) {
		this.username = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
