package beans;

import java.util.ArrayList;
import java.util.List;

public class Restaurant {

	private Integer ID;
	private String name;
	private String restaurantType;
	private List<Article> restaurantArticles;
	private boolean working; //status(radi(true) ili ne radi(false))
	
	private Location location;
	
	
	private String imgURL;
	private Integer logicallyDeleted; //dodala jelena
	private Integer managerID; //dodala jelena
	private String startHours; //maja
	private String endHours; //maja
	private Double rating;
	private Integer numberofRatings;
	


	
	public Restaurant() {
		
	}
//New Constructor 
	public Restaurant(Integer ID,String name, String restaurantType, String startHours, String endHours, String imgURL ,String street, 
			String city, String zipCode, Integer managerID)
	{
		super();
		this.ID = ID;
		this.name = name;
		this.restaurantType = restaurantType;
		this.startHours = startHours;
		this.endHours = endHours;
		
		this.imgURL = imgURL; 
		this.managerID = managerID;
		
	
		
		
		//later updates
		this.location = new Location(0, 0, new Address(street, city, zipCode));
		
		
		this.restaurantArticles = new ArrayList<Article>();
		this.logicallyDeleted = 0;
		
		this.working = true; //default true
		this.rating = 0.0;
		this.numberofRatings = 0;
		
		
				
	}
		
	
	
	
	public String getStartHours() {
		return startHours;
	}

	public void setStartHours(String startHours) {
		this.startHours = startHours;
	}

	public String getEndHours() {
		return endHours;
	}

	public void setEndHours(String endHours) {
		this.endHours = endHours;
	}
	public Integer getID() {
		return ID;
	}

	public void setID(Integer iD) {
		ID = iD;
	}

	public String getImgURL() {
		return imgURL;
	}

	public void setImgURL(String imgURL) {
		this.imgURL = imgURL;
	}



	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRestaurantType() {
		return restaurantType;
	}

	public void setRestaurantType(String restaurantType) {
		this.restaurantType = restaurantType;
	}

	public List<Article> getRestaurantArticles() {
		return restaurantArticles;
	}

	public void setRestaurantArticleIDs(List<Article> restaurantArticles) {
		this.restaurantArticles = restaurantArticles;
	}

	public boolean getWorking() {
		return working;
	}

	public void setWorking(boolean isWorking) {
		this.working = isWorking;
	}



	public Integer getLogicallyDeleted() {
		return logicallyDeleted;
	}

	public void setLogicallyDeleted(Integer logicallyDeleted) {
		this.logicallyDeleted = logicallyDeleted;
	}

	public Integer getManagerID() {
		return managerID;
	}

	public void setManagerID(Integer managerID) {
		this.managerID = managerID;
	}

	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public void setRestaurantArticles(List<Article> restaurantArticles) {
		this.restaurantArticles = restaurantArticles;
	}
	
	public Double getRating() {
		return rating;
	}
	public void setRating(Double rating) {
		this.rating = rating;
	}
	public Integer getNumberofRatings() {
		return numberofRatings;
	}
	public void setNumberofRatings(Integer numberofRatings) {
		this.numberofRatings = numberofRatings;
	}
	public void setLocation(String street, String city, String zipCode) {
		this.location = new Location(0, 0, new Address(street, city, zipCode));
		
	}
}
