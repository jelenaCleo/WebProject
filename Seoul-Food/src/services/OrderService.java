package services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
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
import dao.UserDAO;
import dto.NewOrderDTO;
import dto.OrderRestDTO;

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
		@Path("/userOrders")
		@Produces(MediaType.APPLICATION_JSON)
		public Response userOrders() {
			User user = (User) request.getSession().getAttribute("loginUser");
			OrderDAO dao = getOrdersDAO();	
			
			return Response
					.status(Response.Status.ACCEPTED).entity("GET NEW ORDER SUCCESS")
					.entity(dao.getUserOrders(user.getUsername()))
					.build();
		}

		@PUT
		@Path("/cancel")
		@Produces(MediaType.APPLICATION_JSON)
		public Response changeStatusToCanceled(String orderID) {
			
			 User user = (User) request.getSession().getAttribute("loginUser");
			 OrderDAO dao = getOrdersDAO();
			 dao.ChangeStatusToCanceled(orderID);
			 dao.saveOrders();
			return Response
					.status(Response.Status.ACCEPTED).entity("CANCELED ORDER")
					.entity(dao.getUserOrders(user.getUsername()))
					.build();
			
		}
			
	
	//POST
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addOrder( NewOrderDTO order) {
		
		ArrayList<ShoppingCartItem>  newOrder  = order.selection;	
		
	
		for (ShoppingCartItem item : newOrder) {
			
			int key = item.getArticle().getRestaurantID();
		
			if(temp.containsKey(key)) {
				
				temp.get(key).add(item);
			}
			else
			{
			
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
		OrderDAO dao = getOrdersDAO();
		UserDAO userDao = new UserDAO();
		
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
			
				userDao.addPoints(username, calculatePrice(items));
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
				
				Collection<Order> orders = getOrdersDAO().getRestaurantOrders(restID);
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
				
				Collection<Order> orders = getOrdersDAO().getChangeStatusToWaitingForDelivery(restID,orderID);
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
				
				Collection<Order> orders = getOrdersDAO().getChangeStatusToPreparing(restID,orderID);
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
	@Path("/statusDenied/{restID}/{orderID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChangeStatusToDenied(@PathParam("restID") Integer restID, @PathParam("orderID") String orderID) {
		
		if(request.getSession().getAttribute("loginUser") != null) {
			if(((User) request.getSession().getAttribute("loginUser")).getRole().equals("MANAGER")) {
				
				Collection<Order> orders = getOrdersDAO().getChangeStatusBackToWaitingForDelivery(restID,orderID);
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
	@Path("/statusPermission/{orderID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChangeStatusWaitingForPermission(@PathParam("orderID") String orderID) {
		
		if(request.getSession().getAttribute("loginUser") != null) {
			if(((User) request.getSession().getAttribute("loginUser")).getRole().equals("DELIVERYMAN")) {
				Integer delId =((User) request.getSession().getAttribute("loginUser")).getID();
				ArrayList<OrderRestDTO> orders = getOrdersDAO().getChangeStatusToWaitingForPermission(orderID,delId);
				System.out.println("CEKA_DOSTAVU => CEKA_ODOBRENJE");
				return Response
						.status(Response.Status.ACCEPTED).entity("GET ORDER SUCCESS")
						.entity(orders)
						.build();
			}
			return Response.status(Response.Status.FORBIDDEN).entity("You do not have permission to access!").build();
		}
		System.out.println("wtf");
		return Response.status(Response.Status.NOT_FOUND).build();
	}
	
	@PUT
	@Path("/statusTransport/{orderID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChangeStatusInTransport(@PathParam("orderID") String orderID) {
		
		if(request.getSession().getAttribute("loginUser") != null) {
			if(((User) request.getSession().getAttribute("loginUser")).getRole().equals("DELIVERYMAN")) {
				
				ArrayList<OrderRestDTO> orders = getOrdersDAO().getChangeStatusToInTransport(orderID);
				System.out.println("ODOBRENA => U TRANSPORTU");
				return Response
						.status(Response.Status.ACCEPTED).entity("GET ORDER SUCCESS")
						.entity(orders)
						.build();
			}
			return Response.status(Response.Status.FORBIDDEN).entity("You do not have permission to access!").build();
		}
		System.out.println("wtf");
		return Response.status(Response.Status.NOT_FOUND).build();
	}
	@PUT
	@Path("/statusDelivered/{orderID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChangeStatusToDelivers(@PathParam("orderID") String orderID) {
		
		if(request.getSession().getAttribute("loginUser") != null) {
			if(((User) request.getSession().getAttribute("loginUser")).getRole().equals("DELIVERYMAN")) {
				
				ArrayList<OrderRestDTO> orders = getOrdersDAO().getChangeStatusToDelivered(orderID);
				System.out.println("U TRANSPORTU => U DOSTAVLJENA");
				return Response
						.status(Response.Status.ACCEPTED).entity("GET ORDER SUCCESS")
						.entity(orders)
						.build();
			}
			return Response.status(Response.Status.FORBIDDEN).entity("You do not have permission to access!").build();
		}
		System.out.println("wtf");
		return Response.status(Response.Status.NOT_FOUND).build();
	}
	
	@PUT
	@Path("/statusApproved/{restId}/{orderID}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getChangeStatusApproved(@PathParam("restId") Integer restId,@PathParam("orderID") String orderID) {
		
		if(request.getSession().getAttribute("loginUser") != null) {
			if(((User) request.getSession().getAttribute("loginUser")).getRole().equals("MANAGER")) {
				Collection<Order> orders = getOrdersDAO().getChangeStatusToApproved(restId, orderID);
				System.out.println("CEKA_ODOBRENJE => ODOBRENA");
				return Response
						.status(Response.Status.ACCEPTED).entity("GET ORDER SUCCESS")
						.entity(orders)
						.build();
			}
			return Response.status(Response.Status.FORBIDDEN).entity("You do not have permission to access!").build();
		}
		System.out.println("wtf");
		return Response.status(Response.Status.NOT_FOUND).build();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getOneOrder(@PathParam("id") String orderID) {
		if(request.getSession().getAttribute("loginUser") != null) {
			if(((User) request.getSession().getAttribute("loginUser")).getRole().equals("MANAGER")) {
				
				Order o = getOrdersDAO().getOneOrder(orderID);
				return Response
						.status(Response.Status.ACCEPTED)
						.entity(o)
						.build();
			}
			return Response.status(Response.Status.FORBIDDEN).entity("You do not have permission to access!").build();
		}
		return Response.status(Response.Status.NOT_FOUND).build();
	
		
	}
	
	@GET
	@Path("/allOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllOrders() {
		if(request.getSession().getAttribute("loginUser") != null) {
			if(((User) request.getSession().getAttribute("loginUser")).getRole().equals("DELIVERYMAN")) {
				
				ArrayList<OrderRestDTO> orders = getOrdersDAO().getAllOrders();
				for(OrderRestDTO o : orders) {
					System.out.println("/////////////////////////////////");
					System.out.println(o.order.getID());
					System.out.println(o.order.getName());
					System.out.println(o.order.getSurname());
					System.out.println(o.order.getPrice());
					//System.out.println(o.rest.getName());
				}
				return Response
						.status(Response.Status.ACCEPTED)
						.entity(orders)
						.build();
			}
			return Response.status(Response.Status.FORBIDDEN).entity("You do not have permission to access!").build();
		}
		return Response.status(Response.Status.NOT_FOUND).build();
	
		
	}
	@GET
	@Path("/oneOrder/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getOneOrderDTO(@PathParam("id") String orderID) {
		if(request.getSession().getAttribute("loginUser") != null) {
			if(((User) request.getSession().getAttribute("loginUser")).getRole().equals("DELIVERYMAN")) {
				
				OrderRestDTO o = getOrdersDAO().getOneOrderDTO(orderID);
				return Response
						.status(Response.Status.ACCEPTED)
						.entity(o)
						.build();
			}
			return Response.status(Response.Status.FORBIDDEN).entity("You do not have permission to access!").build();
		}
		return Response.status(Response.Status.NOT_FOUND).build();
	
		
	}
		
		
}
	
	

