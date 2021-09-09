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
import beans.Restaurant;
import dto.DisplayUserOrderDTO;
import dto.OrderRestDTO;

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
	//JS//JELENA/////////////////////////////////////////////////////////////////////////////
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
	public Collection<Order> getChangeStatusBackToWaitingForDelivery(Integer restID, String orderID) {
		ChangeStatusBackToWaitingForDelivery(restID, orderID);
		Collection<Order> restOrders = getRestaurantOrders(restID);
		return restOrders;
	}

	public Collection<Order> getChangeStatusToPreparing(Integer restID, String orderID) {
		ChangeStatusToPreparing(restID, orderID);
		Collection<Order> restOrders = getRestaurantOrders(restID);
		return restOrders;
	}
	public ArrayList<OrderRestDTO> getChangeStatusToWaitingForPermission( String orderID,Integer delId) {
		ChangeStatusToWaitingForPermission(orderID,delId);
		ArrayList<OrderRestDTO> restOrders = getAllOrders();
		return restOrders;
	}
	public ArrayList<OrderRestDTO> getChangeStatusToInTransport(String orderID) {
		ChangeStatusToInTransport(orderID);
		ArrayList<OrderRestDTO> restOrders = getAllOrders();
		return restOrders;
	}
	
	public ArrayList<OrderRestDTO> getChangeStatusToDelivered(String orderID) {
		ChangeStatusToDelivered(orderID);
		ArrayList<OrderRestDTO> restOrders = getAllOrders();
		return restOrders;
	}

	private void ChangeStatusToDelivered( String orderID) {
		orders.get(orderID).setStatus(Status.DOSTAVLJENA);
		saveOrders();
		
	}

	private void ChangeStatusToInTransport(String orderID) {
		orders.get(orderID).setStatus(Status.U_TRANSPORTU);
		System.out.println(orders.get(orderID).getStatus());
		saveOrders();
		
	}

	public void ChangeStatusToWaitingForDelivery(Integer restID, String orderID) {
		orders.get(orderID).setStatus(Status.CEKA_DOSTAVU);
		saveOrders();
	}
	public void ChangeStatusBackToWaitingForDelivery(Integer restID, String orderID) {
		removeOrderToDeliveryMan(orderID);
		orders.get(orderID).setStatus(Status.CEKA_DOSTAVU);
		System.out.println("////////////////////" + orders.get(orderID).getStatus());
		saveOrders();
	}

	public void ChangeStatusToPreparing(Integer restID, String orderID) {

		orders.get(orderID).setStatus(Status.U_PRIPREMI);
		saveOrders();
	}


	public ArrayList<DisplayUserOrderDTO> createNewOrders() {
	
		 Collection<Order> orders =  getValues();
		
		ArrayList<DisplayUserOrderDTO> newOrders = new ArrayList<DisplayUserOrderDTO>();
		
		
		for(Order o : orders) {
			
			DisplayUserOrderDTO dto = new DisplayUserOrderDTO();
			dto.order = o;
			Restaurant r = getRest(o.getRestID());
			if( r == null) {
				System.out.println("Nije pronadjenm restoran ----------");
				return null;
			}
			dto.resName = r.getName();
			dto.restaurantType = r.getRestaurantType();
			newOrders.add(dto);
			System.out.println( dto.order + " - " + dto.resName + " - " + dto.restaurantType);
		}
		
		return newOrders;
		
		
	}


	private Restaurant getRest(Integer restID) {
		RestaurantDAO dao = new RestaurantDAO();
		dao.readRes();
		
		return dao.findRestaurantById(restID);
	}


	public void ChangeStatusToCanceled(String orderID) {
		
		orders.get(orderID).setStatus(Status.OTKAZANA);
		
		
	}
	public void ChangeStatusToWaitingForPermission(String orderID,Integer delId) {

		orders.get(orderID).setStatus(Status.CEKA_ODOBRENJE);
		addOrderToDeliveryMan(orderID,delId);
		saveOrders();
	}

	private void addOrderToDeliveryMan(String orderID, Integer delId) {
		UserDAO userDAO = new UserDAO();
		userDAO.addOrderToDeliveryMan(orderID,delId);
		
	}
	private void removeOrderToDeliveryMan(String orderID) {
		UserDAO userDAO = new UserDAO();
		userDAO.removeOrderFromDeliveryMan(orderID);
		
	}

	public Order getOneOrder(String orderID) {
		return orders.get(orderID);
	}

	public ArrayList<OrderRestDTO> getAllOrders() {
		ArrayList<OrderRestDTO> allOrders = new ArrayList<>();
		
		for(Order o : getValues()) {
			OrderRestDTO dto = new OrderRestDTO();
			dto.order = o;
			RestaurantDAO restDao = new RestaurantDAO();
			restDao.readRes();
			dto.rest = restDao.findRestaurantById(o.getRestID());
			System.out.println(restDao.findRestaurantById(o.getRestID()).getName());
			System.out.println(dto.order.getID());
			allOrders.add(dto);
		}
		
		return allOrders;
	}

	public OrderRestDTO getOneOrderDTO(String orderID) {
		OrderRestDTO muOrderDTO = new OrderRestDTO();
		RestaurantDAO restDao = new RestaurantDAO();
		restDao.readRes();
		
		for(Order o : getValues()) {
			if(o.getID().equals(orderID)) {
				muOrderDTO.rest = restDao.findRestaurantById(o.getRestID());
				muOrderDTO.order = o;
			}
			
		}
		return muOrderDTO ;
	}

	public Collection<Order> getChangeStatusToApproved(Integer restId, String orderID) {
		ChangeStatusToApproved(restId, orderID);
		Collection<Order> restOrders = getRestaurantOrders(restId);
		return restOrders;
	}

	private void ChangeStatusToApproved(Integer restId, String orderID) {
		orders.get(orderID).setStatus(Status.ODOBRENA);
		saveOrders();
		
	}

	

	
	
	//JELENA/////////////////////////////////////////////////////////////////////////////

}
