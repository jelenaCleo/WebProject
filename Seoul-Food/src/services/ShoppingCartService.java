package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.ShoppingCart;
import beans.ShoppingCartItem;
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
		ShoppingCart sc = getShoppingCart();
		
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
				.entity(sc.getItems())
				.build();
		
	}
	
	//ADD
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String addArticle(AddToCartDTO dto) {
		
		ShoppingCart sc = getShoppingCart();
		if(sc.addArticle(dto)) {
			
		
			
			
			return "Added article to cart";
		}
		return "Already exists in cart";
		
		
	}

	@DELETE
	@Path("/delete")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteArticle(String name){
		
		  /*  ShoppingCartItem sci= getShoppingCart().getShoppingCartItem(name);
			getShoppingCart().getItems().remove(sci);
		
			return Response
					.status(Response.Status.ACCEPTED).entity("USER DELETED")
					.entity(getShoppingCart().getItems())
					.build();
		*/
		return null;
	}

	private ShoppingCart getShoppingCart() {
		ShoppingCart sc = (ShoppingCart) request.getSession().getAttribute("shoppingCart");
		if (sc == null) {
			sc = new ShoppingCart();
			request.getSession().setAttribute("shoppingCart", sc);
		} 
		return sc;
	}
	
	
	
}
