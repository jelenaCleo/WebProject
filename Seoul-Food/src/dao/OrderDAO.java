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

public class OrderDAO {

	private LinkedHashMap<String, Order> orders;
	private String path;
	
	public OrderDAO() {
		File dir = new File(System.getProperty("catalina.base") + File.separator + "appData");

		if (!dir.exists()) {
			dir.mkdir();
		}

		this.path = System.getProperty("catalina.base") + File.separator + "appData" + File.separator
				+ "orders.json";
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


	public ArrayList<Order> getRestaurantOrders(Integer restID) {
		// ovo kad se popravi mapa 
		//ArrayList<Order> restOrders = orders.get(restID);
		ArrayList<Order> restOrders = new ArrayList<>();
		restOrders.add(orders.get(restID));
		return  restOrders;
	}


	public ArrayList<Order> getChangeStatusToWaitingForDelivery(Integer restID, String orderID) {
		ChangeStatusToWaitingForDelivery(restID, orderID);
				// ovo kad se popravi mapa 
				//ArrayList<Order> restOrders = orders.get(restID);
				ArrayList<Order> restOrders = new ArrayList<>(); //ovo zakomentarisatiposle
				restOrders.add(orders.get(restID));              //ovo zakomentarisatiposle
				return  restOrders;
	}
	public ArrayList<Order> getChangeStatusToPreparing(Integer restID, String orderID) {
		ChangeStatusToPreparing(restID, orderID);
				// ovo kad se popravi mapa 
				//ArrayList<Order> restOrders = orders.get(restID);
				ArrayList<Order> restOrders = new ArrayList<>(); //ovo zakomentarisatiposle
				restOrders.add(orders.get(restID));				//ovo zakomentarisatiposle
				return  restOrders;
	}
	
	public void ChangeStatusToWaitingForDelivery(Integer restID, String orderID) {
		//ArrayList<Order> restaurantsOrders = orders.get(restID);
		//for(Order o : restaurantsOrders) {
			//if(o.getID().equals(orderID)) {
				//o.setStatus(Status.CEKA_DOSTAVU);
				//break;
			//}
		//}
		orders.get(restID).setStatus(Status.CEKA_DOSTAVU);
	}
	public void ChangeStatusToPreparing(Integer restID, String orderID) {
		//ArrayList<Order> restaurantsOrders = orders.get(restID);
		//for(Order o : restaurantsOrders) {
			//if(o.getID().equals(orderID)) {
			//	o.setStatus(Status.U_PRIPREMI);
			//break;
			//}
		//}
		orders.get(restID).setStatus(Status.U_PRIPREMI);
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
	
	
	
	
}
