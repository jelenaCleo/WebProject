package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import dao.OrderDAO;
import dao.RestaurantDAO;
import dto.NewOrderDTO;
import dto.NewRestaurantDTO;

@Path("/orders")
public class OrderService {

	@Context 
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
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
	
	//POST
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addOrder(NewOrderDTO newOrder) {
		
		OrderDAO dao = getOrdersDAO();
		if(dao.findOrderByID(newOrder.ID) != null) {
			
			System.out.println("\n\n Order sa istim ID vec postoji"
					+ "ovo ne bi trbalo da se desava i  nadam se da nece nikad");
			//eventualno mozemo ovdje izmijeniti as special case order
			
			return Response.status(Response.Status.BAD_REQUEST).build();
			
			
		}
	
		
		dao.addOrder(newOrder);
		System.out.println("POST -- New Order " + newOrder.ID  );
	
		
		return  Response.status(Response.Status.ACCEPTED).entity("/").build(); 	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
}
