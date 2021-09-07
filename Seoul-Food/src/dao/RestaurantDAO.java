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

import beans.Article;
import beans.Restaurant;
import dto.NewRestaurantDTO;

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
			System.out.println("WRITING IN restaurants.json");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	//CRUD Methods
	
	//create
	//Restaurant(Integer ID,String name, String restaurantType, Integer startHours, Integer endHours, String imgURL ,String street, 
	// String city, String zipCode, Integer managerID)
	public void addRestaurant(NewRestaurantDTO res) {
		Restaurant newRes = new Restaurant(getValues().size()+1, res.name, res.restaurantType, res.startHours, 
				res.endHours, res.imgURL, res.street,res.city,res.zipCode, res.managerID );
		
		if(!restaurants.containsValue(newRes)) {
			
			restaurants.put(newRes.getID(), newRes);
		}
	
		saveRestaurantsJSON();
		
	}
	//Update
	public void editRestaurant(Integer ID, NewRestaurantDTO res) {
		
		for(Restaurant r : getValues()) {
			
			if(r.getID().equals(ID)) {
				
				r.setName(res.name);
				r.setRestaurantType(res.restaurantType);
				r.setStartHours(res.startHours);
				r.setEndHours(res.endHours);
				r.setLocation(res.street,res.city,res.zipCode);			
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
		/* ADD NEW ARTICLE
		 * Article(String name, double price, Integer type, Integer restaurantID, Quantity quantity, String description,
			String image) */
	public Restaurant addArticle(Integer id, Article newArticle) {
		Restaurant r = findRestaurantById(id);
	
		r.getRestaurantArticles().add(newArticle);
		return r;
	}

}
