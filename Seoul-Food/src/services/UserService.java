package services;

import dto.LoginUserDTO;
import dto.UserDTO;
import dto.UserDTOJSON;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.sun.org.apache.xerces.internal.util.SynchronizedSymbolTable;

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
		System.out.println("REGISTRACIIIJAAA " + user.username);
		
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
			System.out.println("Ne postoji user sa unetim korisnickim imenom!");
			return Response.status(Response.Status.BAD_REQUEST).entity("Username incorrect, try again")
					.build();
		}	
		
		
		
		if (!userForLogin.getPassword().equals(user.password)) {
			System.out.println("Pogresna sifra!");
			return Response.status(Response.Status.BAD_REQUEST).entity("Password incorrect, try again")
					.build();
		}
		
		if(allUsersDAO.isBlocked(user.username)) {
			System.out.println("blokiran korisnik");
			return Response.status(Response.Status.BAD_REQUEST).entity("You account is blocked!")
					.build();
		}

		request.getSession().setAttribute("loginUser", userForLogin); // we give him a session
		
		System.out.println(request.getSession().getAttribute("loginUser"));

		// We know this, because in users we have 3 types of instances[Administrator,
		// Guest, Host]
		if (userForLogin.getRole().equals("ADMIN")) {
			//return Response.status(Response.Status.ACCEPTED).entity("/Apartments/administratorDashboard.html").build();
			System.out.println("REGISTRACIIIJAAA ADMIN " + user.username);
			return Response.status(Response.Status.OK).build();
			
		} else if (userForLogin.getRole().equals("MANAGER")) {
			//return Response.status(Response.Status.ACCEPTED).entity("/Apartments/guestDashboard.html").build();
			System.out.println("REGISTRACIIIJAAA MANAGER " + user.username);
			return Response.status(Response.Status.OK).build();
			
		} else if (userForLogin.getRole().equals("DELIVERYMAN")) {
			//return Response.status(Response.Status.ACCEPTED).entity("/Apartments/hostDashboard.html").build();
			System.out.println("REGISTRACIIIJAAA DELIVERYMAN" + user.username);
			return Response.status(Response.Status.OK).build();
			
		} else if (userForLogin.getRole().equals("BUYER")) {
			//return Response.status(Response.Status.ACCEPTED).entity("/Apartments/hostDashboard.html").build();
			System.out.println("REGISTRACIIIJAAA BUYER" + user.username);
			return Response.status(Response.Status.OK).build();
			
		}

		//return Response.status(Response.Status.ACCEPTED).entity("/Apartments/#/loginaaa").build(); // redirect to login
		return Response.noContent().build();																					// when is login
																									// accepted
		// return Response.ok().build();

	}
	
	@GET
	@Path("/logout")
	@Produces(MediaType.TEXT_HTML)
	public Response logoutUser() {
		
		if(isUser() ) {
		
			HttpSession session = request.getSession();
			if(session != null && session.getAttribute("loginUser") != null) {
				session.invalidate();
				
				System.out.println(session.getAttribute("loginUser"));
				return Response
						.status(Response.Status.ACCEPTED).entity("SUCCESS LOGOUT")
						.build();
			}
			return Response
					.status(Response.Status.ACCEPTED).entity("LOGOUT UNSUCCESSFUL")
					.build();
		}
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
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
	
	
	@POST
	@Path("/blockUser")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response blockUser(String username){
		// bilo je prosledjeno UserDTOJSON selectedUser
		if(isUserAdmin()) {
			UserDAO allUsersDAO = getUsers();
			//allUsersDAO.blockUserById(selectedUser.user.getID());
			allUsersDAO.blockUserByUsername(username);
			
			//hmn
			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS BLOCK")
					.entity(getUsers().getValues())
					.build();
		}
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
	
	private boolean isUserAdmin() {
		User user = (User) request.getSession().getAttribute("loginUser");
		
		if(user!= null) {
			if(user.getRole().equals("ADMINISTRATOR")) {
				return true;
			}
		}	
		return false;
	}
	
	@POST
	@Path("/unblockUser")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	public Response unblockUser(String username){
		
		if(isUserAdmin()) {
			System.out.println("uno");
			UserDAO allUsersDAO = getUsers();
			//allUsersDAO.unblockUserById(param.user.getID());
			allUsersDAO.blockUserByUsername(username);
			System.out.println("blokiran user :" +  username );
			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS UNBLOCK")
					.entity(getUsers().getValues())
					.build();
		}
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
	
	@GET
	@Path("/allUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getJustUsers() {
		
		if(isUserAdmin()) {
			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
					.entity(getUsers().getValues())
					.build();
		}
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
}
