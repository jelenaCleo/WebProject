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
		return "Hello Jersey";
	}
	
	//get
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getJustProducts() {
		
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
				.entity(getShoppingCart().getItems())
				.build();
		
	}
	
	//ADD
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String addArticle(AddToCartDTO dto) {
		
		ShoppingCart sc = getShoppingCart();
		if(sc.addArticle(dto.article, dto.count)) {
			return "Added article to cart";
		}
		return "Already exists in cart";
		
	}

	@POST
	@Path("/deleteUser")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteArticle(ShoppingCartItem a){
		
			getShoppingCart().getItems().remove(a);
		
			return Response
					.status(Response.Status.ACCEPTED).entity("USER DELETED")
					.entity(getShoppingCart().getItems())
					.build();
		
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
