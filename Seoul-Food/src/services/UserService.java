package services;

import dto.UserDTO;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import dao.UserDAO;
@Path("/users")
public class UserService {

	@Context
	ServletContext ctx;
	
	@POST
	@Path("/registration")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response registration(UserDTO user) {
		
		UserDAO usersDAO = getUsers();

		/* If we have already that user, we can't register him */
		if (usersDAO.getUserByUsername(user.username) != null) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}

		
		usersDAO.addUser(user);
		System.out.println("AAAAAAAAAAAAAAA");
		return Response.status(Response.Status.OK).build();
		//return Response.status(Response.Status.ACCEPTED).entity("/Apartments/#/login").build(); // redirect to login
																								// when is registration																							// accepted
	}
	
	private UserDAO getUsers() {
		
		UserDAO users = (UserDAO) ctx.getAttribute("users");
		
		if (users == null) {
			users = new UserDAO();
			users.readUsers();
			ctx.setAttribute("users", users);

		}

		return users;
	}
}
