package beans;

import java.awt.Image;
import java.util.List;

public class Restaurant {

	private String name;
	private String restaurantType;
	private List<Integer> restaurantItemIDs;
	private boolean isWorking; //status(radi(true) ili ne radi(false))
	private Location location;
	private Image logo;
	
	public Restaurant() {
		
	}
	
	public Restaurant(String name, String restaurantType, List<Integer> restaurantItemIDs, boolean isWorking,
			Location location, Image logo) {
		super();
		this.name = name;
		this.restaurantType = restaurantType;
		this.restaurantItemIDs = restaurantItemIDs;
		this.isWorking = isWorking;
		this.location = location;
		this.logo = logo;
	}
	
	public Restaurant(String name, String restaurantType, List<Integer> restaurantItemIDs, boolean isWorking,
			Location location) {
		super();
		this.name = name;
		this.restaurantType = restaurantType;
		this.restaurantItemIDs = restaurantItemIDs;
		this.isWorking = isWorking;
		this.location = location;
		this.logo = null;
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

	public boolean isWorking() {
		return isWorking;
	}

	public void setWorking(boolean isWorking) {
		this.isWorking = isWorking;
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
	
	
	
}
