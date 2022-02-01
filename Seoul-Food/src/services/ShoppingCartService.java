package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Article;
import beans.ShoppingCartItem;
import beans.User;
import dao.ShoppingCartDAO;
import dto.AddToCartDTO;

@Path("/cart")
public class ShoppingCartService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;

	@GET
	@Path("/test")
	@Produces(MediaType.TEXT_PLAIN)
	public String test() {
		return "Test cart";
	}
	
	//get
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getJustItems() {
		ShoppingCartDAO dao = getShoppingCart();
		
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
				.entity(dao.getItems())
				.build();
		
	}
	
	//ADD
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response   Article(AddToCartDTO dto) {
		ShoppingCartDAO dao = getShoppingCart();		
		User user = (User) request.getSession().getAttribute("loginUser");
			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
					.entity(dao.addToCart(dto,user.getID()))
					.build();
	}
	
	@PUT
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteArticle( Article article){
		
		ShoppingCartDAO dao = getShoppingCart();	
		ShoppingCartItem i = dao.removeFromCart(article);
		dao.removeArticle(i);
			return Response
					.status(Response.Status.ACCEPTED).entity("ARTICLE DELETED")
					.entity(dao.getItems())
					.build();
		
		
	}
	@DELETE
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteAll(){
		
		ShoppingCartDAO dao = getShoppingCart();	
		dao.removeAll();
			return Response
					.status(Response.Status.ACCEPTED).entity("CART DELETED")
					.entity(dao.getItems())
					.build();
		
		
	}

	private ShoppingCartDAO getShoppingCart() {
		ShoppingCartDAO sc = (ShoppingCartDAO) request.getSession().getAttribute("shoppingCart");
		if (sc == null) {
			sc = new ShoppingCartDAO();
			request.getSession().setAttribute("shoppingCart", sc);
		} 
		return sc;
	}
	
	
	
}
