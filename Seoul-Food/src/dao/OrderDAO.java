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
import beans.Order;
import dto.NewOrderDTO;

public class OrderDAO {

	private LinkedHashMap<Integer, Order> orders;
	private String path;
	
	public OrderDAO() {
		File dir = new File(System.getProperty("catalina.base") + File.separator + "appData");

		if (!dir.exists()) {
			dir.mkdir();
		}

		this.path = System.getProperty("catalina.base") + File.separator + "appData" + File.separator
				+ "orders.json";
		System.out.println("-------------------ORDERS FOLDER -------------------" + this.path);

		this.orders = new LinkedHashMap<Integer, Order>();
	}
	

	// Reading from file and writing to file
	
	public void readOrders() {

		ObjectMapper om = new ObjectMapper();

		File file = new File(this.path);

		List<Order> ordersList = new ArrayList<Order>();

		try {

			ordersList = om.readValue(file, new TypeReference<List<Order>>() {
			});

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		for (Order o : ordersList) {

			System.out.println("---Orders: ----");
			System.out.println(o.getID() + "\\n");
			orders.put(o.getRestID(), o);
		

		}
	}
	public void saveOrders() {
		List<Order> ordersList = new ArrayList<Order>();
		for(Order o : getValues()) {
			ordersList.add(o);
		}
		
		ObjectMapper om = new ObjectMapper();
		
		try {
			om.writeValue(new FileOutputStream(this.path), ordersList);
			System.out.println("WRITING IN orders.json");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}


	public Collection<Order> getValues() {
		return orders.values();
	}


	public Order findOrderByID(String iD) {
	
		for( Order o : getValues()) {
			if ( o.getID() == iD){
				return o;
			}
		}
		return null;
	}


	public void addOrder(NewOrderDTO newOrder) {
//Order(String ID,ArrayList<Article> articles,Integer restID, String oderDate,String price,String username,String firstName,String lastName)
		Order o = new Order(newOrder.ID, newOrder.articles, newOrder.restID,
				newOrder.oderDate, newOrder.price, newOrder.username, newOrder.firstName, newOrder.lastName);
		orders.put(newOrder.restID, o);
		saveOrders();
		
	}
	
	
	
	
}
