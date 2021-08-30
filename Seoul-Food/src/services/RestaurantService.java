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

import beans.Restaurant;
import dao.RestaurantDAO;
import dto.RestaurantDTO;

@Path("/restaurants")
public class RestaurantService {

	@Context 
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getJustUsers()
	{
		
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
				.entity(getRestaurants().getValues())
				.build();
	
	}
	
	private RestaurantDAO getRestaurants() {
		
		RestaurantDAO restaurants = (RestaurantDAO) ctx.getAttribute("restaurants");
		
		if(restaurants == null) {
			restaurants = new RestaurantDAO();
			restaurants.readRes();
			ctx.setAttribute("restaurants", restaurants);
		}
		return restaurants;
		
	}
	
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addRestaurant(RestaurantDTO res) {
		
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
	public Restaurant findRestaurantbyID(@PathParam("id") Integer id){
		
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurants");
		System.out.println("---NAME SEARCH --- "+ id);
		Restaurant r = dao.findRestaurantById(id);
		
		return r;
		
	 	
	}
	//UPDATE
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant updateRestaurant(RestaurantDTO dto, @PathParam("id") Integer id){
		
		RestaurantDAO dao = getRestaurants();
		Restaurant r = dao.findRestaurantById(id);
		
		r.setName(dto.name);
		r.setImgURL(dto.imgURL);
		r.setLocation(dto.location);
		r.setRestaurantItemIDs(dto.restaurantItemIDs);
		r.setRestaurantType(dto.restaurantType);
		r.setWorking(dto.isWorking);
		
		return r;
		
		
	 	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
	
