package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.User;
import dao.CommentDAO;
import dao.OrderDAO;
import dao.RestaurantDAO;
import dao.UserDAO;
import dto.NewCommentDto;
import dto.RestCommentsDTO;
import dto.SmallUserDTO;

@Path("/comments")
public class CommentService {
	@Context 
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	
	private CommentDAO getCommentsDAO() {
		CommentDAO comments = (CommentDAO) ctx.getAttribute("comments");
		
		 if(comments == null) {
			 comments = new CommentDAO();
			 comments.readComments();
			 ctx.setAttribute("comments", comments);
		 }
		 return comments;
	}
	
	private RestaurantDAO getRestaurantsDAO() {

		RestaurantDAO restaurants = (RestaurantDAO) ctx.getAttribute("restaurants");

		if (restaurants == null) {
			restaurants = new RestaurantDAO();
			restaurants.readRes();
			ctx.setAttribute("restaurants", restaurants);
		}
		return restaurants;
	}
	private OrderDAO getOrdersDAO() {
	
		OrderDAO orders = (OrderDAO) ctx.getAttribute("orders");		
		if(orders == null) {
			orders = new OrderDAO();
			orders.readOrders();
			ctx.setAttribute("orders", orders);
		}
			return orders;
	}
	private UserDAO getUsersDAO() {
			
		UserDAO users = (UserDAO) ctx.getAttribute("users");	
		if (users == null) {
			users = new UserDAO();
			users.readUsers();
			ctx.setAttribute("users", users);
		}
			return users;
		}

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getComments() {
		
		return Response
				.status(Response.Status.ACCEPTED).entity("GET COMMENTS SUCCESS")
				.entity(getCommentsDAO().getValues())
				.build();
	}

	@GET
	@Path("/userComments")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserComments() {
		User user = (User) request.getSession().getAttribute("loginUser");
		return Response
				.status(Response.Status.ACCEPTED).entity("GET COMMENTS SUCCESS")
				.entity(getCommentsDAO().getUserComments(user.getID()))
				.build();
	}
		
	@GET
	@Path("/{restId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getRestComments(@PathParam("restId") Integer restId) {
		
		User user = (User) request.getSession().getAttribute("loginUser");
		RestCommentsDTO comments = new RestCommentsDTO();
		
		comments.restComments = getCommentsDAO().getRestComments(restId,getUsersDAO().getValues());
		comments.canLeaveComment = getOrdersDAO().canLeaveComment(user.getUsername(),restId);
		return Response
				.status(Response.Status.ACCEPTED).entity("GET COMMENTS SUCCESS")
				.entity(comments)
				.build();	
	}
	
	@POST
	@Path("/{restId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response addComment(@PathParam("restId") Integer restId, NewCommentDto newComment) {
		User user = (User) request.getSession().getAttribute("loginUser");	
		return Response
				.status(Response.Status.ACCEPTED).entity("GET COMMENTS SUCCESS")
				.entity(getCommentsDAO().addComment(user, getRestaurantsDAO().findRestaurantById(restId), newComment))
				.build();
				
	}
}
