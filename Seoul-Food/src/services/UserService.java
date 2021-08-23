package services;

import dto.LoginUserDTO;
import dto.UserDTO;
import dto.UserLoginDTO;

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

import beans.User;
import dao.UserDAO;
@Path("/users")
public class UserService {

	@Context
	HttpServletRequest request;
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
	
	@POST
	@Path("/login")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(LoginUserDTO user) {
		UserDAO allUsersDAO = getUsers();

		User userForLogin = allUsersDAO.getUserByUsername(user.username);

		if (userForLogin == null) {
			System.out.println("Nema takvog usera");
			return Response.status(Response.Status.BAD_REQUEST).entity("Password or username are incorrect, try again")
					.build();
		}	
		
		
		
		if (!userForLogin.getPassword().equals(user.password)) {
			System.out.println("SIFRE NISU JEDNAKE");
			return Response.status(Response.Status.BAD_REQUEST).entity("Password or username are incorrect, try again")
					.build();
		}
		
		if(allUsersDAO.isBlocked(user.username)) {
			System.out.println("blokiran je");
			return Response.status(Response.Status.BAD_REQUEST).entity("You are blocked from this application!")
					.build();
		}

		request.getSession().setAttribute("loginUser", userForLogin); // we give him a session

		// We know this, because in users we have 3 types of instances[Administrator,
		// Guest, Host]
		if (userForLogin.getRole().equals("ADMINISTRATOR")) {
			return Response.status(Response.Status.ACCEPTED).entity("/Apartments/administratorDashboard.html").build();

		} else if (userForLogin.getRole().equals("GUEST")) {
			return Response.status(Response.Status.ACCEPTED).entity("/Apartments/guestDashboard.html").build();

		} else if (userForLogin.getRole().equals("HOST")) {
			return Response.status(Response.Status.ACCEPTED).entity("/Apartments/hostDashboard.html").build();

		}

		return Response.status(Response.Status.ACCEPTED).entity("/Apartments/#/loginaaa").build(); // redirect to login
																									// when is login
																									// accepted
		// return Response.ok().build();

	}
}
