package beans;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.json.bind.annotation.JsonbDateFormat;

import com.sun.org.apache.xml.internal.utils.MutableAttrListImpl;

public class User  {

	private Integer ID;
	private Integer logicalDeleted; // 1 - deleted, 0 - not deleted
	private Integer blocked; // 1 - blocked, 0 - not blocked
	private String username;
	private String password;
	private String name;
	private String surname;
	private String gender;
	@JsonbDateFormat(JsonbDateFormat.TIME_IN_MILLIS)
	private Date birthday;
	private String role;

	private List<Integer> allOrders;		//kupac
	// Korpa								//kupac
	private Integer restarauntID;		// JELENA IZMENILA ovo treba biti samo jedan restoran bas tog managera ako je user manager
	private List<String> ordersToDeliver;	//dostavljac
	private Double points;					//kupac
	private Integer buyerClass; // GOLD, SILVER, BRONZE //kupac

	public User() {
		super();
	}
	public User(Integer iD, Integer logicalDeleted, Integer blocked, String username, String password, String name,
			String surname, String gender, Date birthday, String role, List<Integer> allOrders,
			Integer restaurantID, List<String> ordersToDeliver, Double points, Integer buyerClass) {
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
		this.restarauntID = restaurantID;
		this.ordersToDeliver = ordersToDeliver;
		this.points = points;
		this.buyerClass = buyerClass;
	}

	public User(Integer iD, Integer logicalDeleted, Integer blocked, String username, String password, String name,
			String surname, String gender, String birthday, String role, List<Integer> allOrders,
			Integer restaurantID, List<String> ordersToDeliver, Double points, Integer buyerClass) {
		super();
		ID = iD;
		this.logicalDeleted = logicalDeleted;
		this.blocked = blocked;
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		
		try {
			this.birthday = new SimpleDateFormat("dd-MM-yyyy").parse(birthday);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		this.role = role;
		this.allOrders = allOrders;
		this.restarauntID = restaurantID;
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

	

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public void setBirthday(String birthday2) {
		try {
			this.birthday = new SimpleDateFormat("dd-MM-yyyy").parse(birthday2);
			System.out.println("parsiran datum" + this.birthday);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
	}
	
	public void setBirthdayMiliseconds(String miliseconds) {
		Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(Long.parseLong(miliseconds));
		this.birthday = calendar.getTime();
		System.out.println("Moj parsirani datum iz milisekundi u datum : " + this.birthday);
	}
	
	public void setBirthdayDate(Date date) {
		this.birthday = date;
	}
	public Integer getRestarauntID() {
		return restarauntID;
	}
	public void setRestarauntID(Integer restarauntID) {
		this.restarauntID = restarauntID;
	}
	public List<String> getOrdersToDeliver() {
		return ordersToDeliver;
	}
	public void setOrdersToDeliver(List<String> ordersToDeliver) {
		this.ordersToDeliver = ordersToDeliver;
	}
	
	

}
