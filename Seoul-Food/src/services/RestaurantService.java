package services;

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

import beans.Article;
import beans.Restaurant;
import beans.User;
import dao.RestaurantDAO;
import dto.NewRestaurantDTO;
import dto.RestaurantDTO;

@Path("/restaurants")
public class RestaurantService {

	@Context 
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	

	private RestaurantDAO getRestaurants() {
		
		RestaurantDAO restaurants = (RestaurantDAO) ctx.getAttribute("restaurants");
		
		if(restaurants == null) {
			restaurants = new RestaurantDAO();
			restaurants.readRes();
			ctx.setAttribute("restaurants", restaurants);
		}
		return restaurants;
		
	}
	
	
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getRes(){
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
				.entity(getRestaurants().getValues())
				.build();
		
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addRestaurant(NewRestaurantDTO res) {
		System.out.println("usao sam u reguest");
		
		RestaurantDAO resDAO = getRestaurants();
		
		
		/*If the res exists we cannot add it */
		
		if(resDAO.findRestaurantByName(res.name) != null ) {
			
			System.out.println("\n\nRestoran sa istim imenom vec postoji");
			return Response.status(Response.Status.BAD_REQUEST).build();
		
			
		}
		
		resDAO.addRestaurant(res);
		System.out.println("NEW RESTAURANT: " + res.name);
		
		
		return Response.status(Response.Status.ACCEPTED).entity("/").build(); 	
	}
	
	
	
	/*@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant findRestaurantbyName(@PathParam("id") String id){
		
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurants");
		System.out.println("---NAME SEARCH --- "+ id);
		Restaurant r = dao.findRestaurantByName(id);
		
		return r;
		
	 	
	}*/
	
	//GET
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response findRestaurantbyID(@PathParam("id") Integer id){
		
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurants");
		System.out.println("---NAME SEARCH --- "+ id);
		Restaurant r = dao.findRestaurantById(id);
		
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
				.entity(r)
				.build();
		
		
	 	
	}
	//UPDATE
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant updateRestaurant(RestaurantDTO dto, @PathParam("id") Integer id){
		
		RestaurantDAO dao = getRestaurants();
		Restaurant r = dao.findRestaurantById(id);
		
		/*
		 * TODO: Napravi DTO stvari koje ti trebaju 
		 * 
		 * */
		
		return r;
	}
	//Dodavanje artikala 
	
	@PUT
	@Path("/{id}/newArticle")
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant newArticle(Article newArticle, @PathParam("id") Integer id){
		
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurants");
		System.out.println("---Restaurant: "+ id + "----- adding a new Article");
	
		
		return dao.addArticle(id,newArticle);

	}
	//Komentari 

	//LOGICKO BRISANJE
	@PUT
	@Path("deleteRestaurant/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteRestaurant( @PathParam("id") Integer id){
		if(isUser()) {	
			if(isUserAdmin()) {
				RestaurantDAO dao = getRestaurants();
				Restaurant r = dao.deleteRestaurant(id);
				
				return Response.status(Response.Status.ACCEPTED).entity(r).build();
			}
			return Response.status(403).type("text/plain")
					.entity("You do not have permission to access!").build();
		}
		return Response.status(Response.Status.NOT_FOUND).build();
		
	}
	//LOGICKI RESTORE RESTORANA
	@PUT
	@Path("restoreRestaurant/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response restoreRestaurant( @PathParam("id") Integer id){
		if(isUser()) {	
			if(isUserAdmin()) {
				RestaurantDAO dao = getRestaurants();
				Restaurant r = dao.restoreRestaurant(id);
				
				return Response.status(Response.Status.ACCEPTED).entity(r).build();
			}
			return Response.status(403).type("text/plain")
					.entity("You do not have permission to access!").build();
		}
		return Response.status(Response.Status.NOT_FOUND).build();
	}
	
	private boolean isUserAdmin() {
		User user = (User) request.getSession().getAttribute("loginUser");
		System.out.println(user.getRole());
		if(user!= null) {
			if(user.getRole().equals("ADMIN")) {
				System.out.println("jeste admin");
				return true;
			}
		}	
		return false;
	}
	
	private boolean isUser() {
		User user = (User) request.getSession().getAttribute("loginUser");
		
		if(user!= null) {
			if(user.getRole().equals("ADMIN") || user.getRole().equals("MANAGER") || user.getRole().equals("DELIVERYMAN") || user.getRole().equals("BUYER")) {	
				return true;
			}
		}	
		return false;
	}
	

}
	
