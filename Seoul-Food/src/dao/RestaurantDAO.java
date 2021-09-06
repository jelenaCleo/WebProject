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
import dto.ArticleDTO;
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
			System.out.println("id restorana:  " + newRes.getID() + "   id menadzera: " + newRes.getManagerID());
			restaurants.put(newRes.getID(), newRes);
			UserDAO userDAO = new UserDAO();
			userDAO.addRestaurantToManager(newRes.getID(),newRes.getManagerID());
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
	public Restaurant addArticle(Integer restID, ArticleDTO newArticle) {
		System.out.println("usao u dao za dodavanje artikla");
		Article a = new Article(newArticle.name,newArticle.price,newArticle.type,restID,newArticle.quantity,newArticle.measure,newArticle.description,newArticle.image);
		for(Restaurant r : getValues()) {
			if(r.getID().equals(restID)) {
				System.out.println("nasao restiran");
				if(noDuplicateArticleName(r,a.getName())) {
				r.getRestaurantArticles().add(a);
				System.out.println("DODAO ARTIKAL");
				saveRestaurantsJSON();
				return r;
				}
			}
		}
		return null;
	}
	
	public Restaurant deleteArticle(Integer restID, ArticleDTO aDTO) {
		Article article = new Article(aDTO.name,aDTO.price,aDTO.type,restID,aDTO.quantity,aDTO.measure,aDTO.description,aDTO.image);
		for(Restaurant r : getValues()) {
			if(r.getID().equals(restID)) {
				System.out.println("nasao restiran");
				ArrayList<Article> oldArticles =(ArrayList<Article>) r.getRestaurantArticles();
				ArrayList<Article> newArticles = (ArrayList<Article>) r.getRestaurantArticles();
				for(Article a : oldArticles) {
					if(a.getName().equals(article.getName())){
						newArticles.remove(a);
						System.out.println("UKLONIO ARTIKAL");
						break;
					}
				}
				
				r.setRestaurantArticles(newArticles);
				System.out.println("zamjenjene liste");
				saveRestaurantsJSON();
				System.out.println("savuvano");
				return r;
				
			}
		}
		return null;
	}
	public Restaurant editArticle(Integer restID , ArticleDTO oldArticle) {
		for(Restaurant r : getValues()) {
			if(r.getID().equals(restID)) {
				System.out.println("nasao restiran");
				for(Article a : r.getRestaurantArticles()) {
					if(a.getName().equals(oldArticle.name)){
						a.setName(oldArticle.name);
						a.setPrice(oldArticle.price);
						a.setType(oldArticle.type);
						a.setQuantity(oldArticle.quantity);
						a.setMeasure(oldArticle.measure);
						a.setDescription(oldArticle.description);
						a.setImage(oldArticle.image);
						System.out.println("EDITOVAN ARTIKAL");
						break;
					}
				}
				saveRestaurantsJSON();
				System.out.println("sacuvano");
				return r;
				
			}
		}
		return null;
	}
	
	private boolean noDuplicateArticleName(Restaurant r, String articleName) {
		for(Article a : r.getRestaurantArticles()) {
			if(a.getName().equals(articleName)){
				System.out.println("vec nimamo artikal sa zadatim imenom");
				return false;
			}
		}
		return true;
	}

	//LOGICKKO BRISANJE
	public Restaurant deleteRestaurant(Integer id) {
		Restaurant r = findRestaurantById(id);
		r.setLogicallyDeleted(1);
		saveRestaurantsJSON();
		return r;
	}
	// LOGICKI RESTORE RESTORANA
	public Restaurant restoreRestaurant(Integer id) {
		Restaurant r = findRestaurantById(id);
		r.setLogicallyDeleted(0);
		saveRestaurantsJSON();
		return r;
	}

	public Article getArticle(Integer restID, String articleName) {
		for(Restaurant r : getValues()) {
			if(r.getID().equals(restID)) {
				System.out.println("nasao restiran");
				for(Article a : r.getRestaurantArticles()) {
					if(a.getName().equals(articleName)){
						return a;
					}
				}
			}
		}
		return null;
	}
}
