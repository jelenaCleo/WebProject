package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Restaurant;
import beans.User;
import dto.RestaurantDTO;

public class RestaurantDAO {

	private LinkedHashMap<Integer, Restaurant> restaurants;
	private String path;

	public RestaurantDAO() {

		File dir = new File(System.getProperty("catalina.base") + File.separator + "appData");

		if (!dir.exists()) {
			dir.mkdir();
		}

		this.path = System.getProperty("catalina.base") + File.separator + "appData" + File.separator
				+ "restaurants.json";
		System.out.println("-------------------RESTAURANTS FOLDER -------------------" + this.path);

		this.restaurants = new LinkedHashMap<Integer, Restaurant>();
	}

	// Reading from file and writing to file

	public void readRes() {

		ObjectMapper om = new ObjectMapper();

		File file = new File(this.path);

		List<Restaurant> resList = new ArrayList<Restaurant>();

		try {

			resList = om.readValue(file, new TypeReference<List<Restaurant>>() {
			});

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		for (Restaurant r : resList) {

			System.out.println("---Restaurants list: ----");
			System.out.println(r.getName() + "\\n");

			restaurants.put(r.getID(), r);

		}
	}

	public void saveRestaurantsJSON() {
		List<Restaurant> resList = new ArrayList<Restaurant>();

		for (Restaurant r : getValues()) {
			resList.add(r);
		}

		ObjectMapper om = new ObjectMapper();

		try {
			om.writeValue(new FileOutputStream(this.path), resList);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	//CRUD Methods
	
	//create
	
	public void addRestaurant(RestaurantDTO res) {
		Restaurant newRes = new Restaurant(getValues().size()+1,res.name,res.restaurantType, res.restaurantItemIDs,
				res.working, res.location,res.imgURL);
		
		if(!restaurants.containsValue(newRes)) {
			
			restaurants.put(newRes.getID(), newRes);
		}
	
		saveRestaurantsJSON();
		
	}
	public void editRestaurant(Integer ID, RestaurantDTO res) {
		
		for(Restaurant r : getValues()) {
			
			if(r.getID().equals(ID)) {
				
				r.setName(res.name);
				r.setRestaurantType(res.restaurantType);
				r.setRestaurantItemIDs(res.restaurantItemIDs);
				r.setWorking(res.working);
				r.setLocation(res.location);
				r.setImgURL(res.imgURL);
				
				
			}
		}
	}
	
	
	//Helping Methods
	public Restaurant findRestaurantById(Integer ID) {
		
		if(restaurants.containsKey(ID)) {
			return restaurants.get(ID);
		}
		return null;
		
	}
	
	
	

	public Collection<Restaurant> getValues() {
		return restaurants.values();
	}

	public Restaurant findRestaurantByName(String name) {
		for(Restaurant r : getValues()) {
					
				
			if(r.getName().equals(name)) {
				return r;
			
					}
		}
		return null;
	}

}
