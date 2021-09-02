package beans;

import java.awt.Image;
import java.util.List;

public class Restaurant {

	private Integer ID;
	private String name;
	private String restaurantType;
	private List<Integer> restaurantItemIDs;
	private boolean working; //status(radi(true) ili ne radi(false))
	private Location location;
	private Image logo; //can be used l8er
	private String imgURL;
	private Integer logicallyDeleted; //dodala jelena
	private Integer managerID; //dodala jelena
	
	public Restaurant() {
		
	}
	
	public Restaurant(Integer ID,String name, String restaurantType, List<Integer> restaurantItemIDs, boolean isWorking,
			Location location, String imgURL) {
		super();
		this.ID = ID;
		this.name = name;
		this.restaurantType = restaurantType;
		this.restaurantItemIDs = restaurantItemIDs;
		this.working = isWorking;
		this.location = location;
		this.logo = null;
		this.imgURL = imgURL;
		
		
	}
	public Restaurant(Integer ID,String name, String restaurantType, List<Integer> restaurantItemIDs, boolean isWorking,
			Location location, String imgURL,Integer managerID) {
		super();
		this.ID = ID;
		this.name = name;
		this.restaurantType = restaurantType;
		this.restaurantItemIDs = restaurantItemIDs;
		this.working = isWorking;
		this.location = location;
		this.logo = null;
		this.imgURL = imgURL;
		this.logicallyDeleted = 0; //dodala jelena
		this.managerID = managerID; //dodala jelena
		
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

	public List<Integer> getRestaurantItemIDs() {
		return restaurantItemIDs;
	}

	public void setRestaurantItemIDs(List<Integer> restaurantItemIDs) {
		this.restaurantItemIDs = restaurantItemIDs;
	}

	public boolean getWorking() {
		return working;
	}

	public void setWorking(boolean isWorking) {
		this.working = isWorking;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Image getLogo() {
		return logo;
	}

	public void setLogo(Image logo) {
		this.logo = logo;
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
	
	
	
}
