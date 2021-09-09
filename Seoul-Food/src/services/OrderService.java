package services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Order;
import beans.ShoppingCartItem;
import beans.User;
import dao.OrderDAO;
import dto.NewOrderDTO;

@Path("/orders")
public class OrderService {

	@Context 
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	private LinkedHashMap<Integer,  ArrayList<ShoppingCartItem> > temp = new LinkedHashMap<Integer, ArrayList<ShoppingCartItem>>();
	
	
	private OrderDAO getOrdersDAO() {
		
		OrderDAO orders = (OrderDAO) ctx.getAttribute("orders");
		
		if(orders == null) {
			
			orders = new OrderDAO();
			orders.readOrders();
			ctx.setAttribute("orders", orders);
		}
		return orders;
		
		
	}
	
	//GET
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getOrders() {
		
		return Response
				.status(Response.Status.ACCEPTED).entity("GET ORDER SUCCESS")
				.entity(getOrdersDAO().getValues())
				.build();
		
		
	}
	
	//GET
		@GET
		@Path("/newOrders")
		@Produces(MediaType.APPLICATION_JSON)
		public Response getNewOrders() {
			
			OrderDAO dao = getOrdersDAO();
			 
		
			
			return Response
					.status(Response.Status.ACCEPTED).entity("GET NEW ORDER SUCCESS")
					.entity(dao.createNewOrders())
					.build();
			
			
		}
	
	
	
	//POST
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addOrder( NewOrderDTO order) {
		//NewOrderDTO
		ArrayList<ShoppingCartItem>  newOrder  = order.selection;
		
		for(ShoppingCartItem i : newOrder) {
			
			System.out.println("SELECTION " + i.getArticle().getName());
		}
	
		
		
		
		
		
		for (ShoppingCartItem item : newOrder) {
			
			int key = item.getArticle().getRestaurantID();
		
			if(temp.containsKey(key)) {
				System.out.println("VEC POSTOJI:" + item.getArticle().getName());
				temp.get(key).add(item);
			}
			else
			{
			System.out.println("FIRST OF ITS KIND :" + item.getArticle().getName());
			temp.put(key, new ArrayList<ShoppingCartItem>());
			temp.get(key).add(item);
			}
		}
		
		createOrders(order.username, order.name, order.surname);

		return Response
				.status(Response.Status.ACCEPTED).entity("ADD ORDER SUCCESS")
				.entity(getOrdersDAO().getValues())
				.build();
		
		 
		
		
	}

	private void createOrders(String username, String name, String surname) {
		@SuppressWarnings("unused")
		OrderDAO dao = getOrdersDAO();
		
		for(Map.Entry<Integer, ArrayList<ShoppingCartItem>> entry : temp.entrySet()) {
			String id = dao.getSaltString(10);
			   DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy");  
			   LocalDateTime now = LocalDateTime.now();  
			   
			   ArrayList<ShoppingCartItem> items = entry.getValue();
			   

			
		
			Order o = new Order(id, items, entry.getKey(), dtf.format(now), calculatePrice(items), username, name, surname);
			dao.addOrder(o);
			   System.out.println(username);
			   System.out.println(name);
			   System.out.println(surname);

				System.out.println(calculatePrice(items));
				System.out.println(dtf.format(now)); 
				System.out.println(id);	
				System.out.println("key: " + entry.getKey() );
			
			
				temp.clear();
		
			
	}
		
		
		
	}

	private double calculatePrice(ArrayList<ShoppingCartItem> items) {
		
		double totalPrice= 0.0;
		for(ShoppingCartItem item : items) {
			totalPrice += item.getArticle().getPrice()*item.getCount();
		}
		return totalPrice;
		
	}
	
	@GET
	@Path("/restaurantOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getRestaurantOrders() {
		Integer restID = ((User) request.getSession().getAttribute("loginUser")).getRestarauntID();
		
		if(request.getSession().getAttribute("loginUser") != null) {
			if(((User) request.getSession().getAttribute("loginUser")).getRole().equals("MANAGER")) {
				
				ArrayList<Order> orders = getOrdersDAO().getRestaurantOrders(restID);
				return Response
						.status(Response.Status.ACCEPTED).entity("GET ORDER SUCCESS")
						.entity(orders)
						.build();
			}
			return Response.status(Response.Status.FORBIDDEN).entity("You do not have permission to access!").build();
		}
		return Response.status(Response.Status.NOT_FOUND).build();
	}
	
	
	@PUT
	@Path("/statusWaiting/{restID}/{orderID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChangeStatusToWaitingForDelivery(@PathParam("restID") Integer restID, @PathParam("orderID") String orderID) {
		
		if(request.getSession().getAttribute("loginUser") != null) {
			if(((User) request.getSession().getAttribute("loginUser")).getRole().equals("MANAGER")) {
				
				ArrayList<Order> orders = getOrdersDAO().getChangeStatusToWaitingForDelivery(restID,orderID);
				return Response
						.status(Response.Status.ACCEPTED).entity("GET ORDER SUCCESS")
						.entity(orders)
						.build();
			}
			return Response.status(Response.Status.FORBIDDEN).entity("You do not have permission to access!").build();
		}
		return Response.status(Response.Status.NOT_FOUND).build();
	}
		
	@PUT
	@Path("/statusPrepared/{restID}/{orderID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChangeStatusToPrepared(@PathParam("restID") Integer restID, @PathParam("orderID") String orderID) {
		
		if(request.getSession().getAttribute("loginUser") != null) {
			if(((User) request.getSession().getAttribute("loginUser")).getRole().equals("MANAGER")) {
				
				ArrayList<Order> orders = getOrdersDAO().getChangeStatusToPreparing(restID,orderID);
				return Response
						.status(Response.Status.ACCEPTED).entity("GET ORDER SUCCESS")
						.entity(orders)
						.build();
			}
			return Response.status(Response.Status.FORBIDDEN).entity("You do not have permission to access!").build();
		}
		return Response.status(Response.Status.NOT_FOUND).build();
	}
		
		
}
	
	

