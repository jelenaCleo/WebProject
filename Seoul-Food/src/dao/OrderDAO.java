package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Order;
import beans.Order.Status;

public class OrderDAO {

	private LinkedHashMap<String, Order> orders;
	private String path;

	public OrderDAO() {
		File dir = new File(System.getProperty("catalina.base") + File.separator + "appData");

		if (!dir.exists()) {
			dir.mkdir();
		}

		this.path = System.getProperty("catalina.base") + File.separator + "appData" + File.separator + "orders.json";
		System.out.println("-------------------ORDERS FOLDER -------------------" + this.path);

		this.orders = new LinkedHashMap<String, Order>();
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
			orders.put(o.getID(), o);

		}
	}

	public void saveOrders() {
		List<Order> ordersList = new ArrayList<Order>();
		for (Order o : getValues()) {
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

		for (Order o : getValues()) {
			if (o.getID() == iD) {
				return o;
			}
		}
		return null;
	}

//TODO : EDIT THIS SHIT
	public void addOrder(Order newOrder) {

		orders.put(newOrder.getID(), newOrder);
		saveOrders();
	}

	public String getSaltString(int len) {
		String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		StringBuilder salt = new StringBuilder();
		Random rnd = new Random();
		while (salt.length() < len) { // length of the random string.
			int index = (int) (rnd.nextFloat() * SALTCHARS.length());
			salt.append(SALTCHARS.charAt(index));
		}
		String saltStr = salt.toString();
		return saltStr;

	}
	//JS
	public Collection<Order> getRestaurantOrders(Integer restID) {
		Collection<Order> restOrders = new ArrayList<>();

		for (Order o : getValues()) {
			if (o.getRestID().equals(restID)) {
				restOrders.add(o);
			}
		}

		return restOrders;
	}

	public Collection<Order> getChangeStatusToWaitingForDelivery(Integer restID, String orderID) {
		ChangeStatusToWaitingForDelivery(restID, orderID);
		Collection<Order> restOrders = getRestaurantOrders(restID);
		return restOrders;
	}

	public Collection<Order> getChangeStatusToPreparing(Integer restID, String orderID) {
		ChangeStatusToPreparing(restID, orderID);
		Collection<Order> restOrders = getRestaurantOrders(restID);
		return restOrders;
	}

	public void ChangeStatusToWaitingForDelivery(Integer restID, String orderID) {
		orders.get(orderID).setStatus(Status.CEKA_DOSTAVU);
		saveOrders();
	}

	public void ChangeStatusToPreparing(Integer restID, String orderID) {

		orders.get(orderID).setStatus(Status.U_PRIPREMI);
		saveOrders();
	}

	public Order getOneOrder(String orderID) {
		return orders.get(orderID);
	}

}
