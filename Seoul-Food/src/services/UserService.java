package services;

import dto.ChangePasswordDTO;
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
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;

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
			return Response.status(Response.Status.ACCEPTED).entity("Korisničko ime je zauzeto!Nije moguće registrovati korisnika!").build();
		}

		
		Integer userID = usersDAO.addUser(user);
		System.out.println("REGISTRACIIIJAAA " + user.username);
		if(userID>0) {
			System.out.println("idemo 1");
			if(user.role.equals("BUYER")) {
				System.out.println("idemo 2");
				return Response.status(Response.Status.ACCEPTED).entity("/Seoul-Food/index.html").build(); 	
			}else {
				System.out.println("idemo 3");
				return Response.status(Response.Status.ACCEPTED).entity(userID.toString()).build(); 	
			}
		}
		System.out.println("idemo 4");
		return Response.status(Response.Status.ACCEPTED).entity("Korisnik već postoji!").build();
		
	}
	
	private UserDAO getUsers() {
		
		//UserDAO users = (UserDAO) ctx.getAttribute("users");
		UserDAO users = new UserDAO();
		//if (users == null) {
			//users = new UserDAO();
			users.readUsers();
			ctx.setAttribute("users", users);

		//}

		return users;
	}
	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(LoginUserDTO user) {
		System.out.println("aaaaaaaaaaaaaaaa");
		UserDAO allUsersDAO = getUsers();

		User userForLogin = allUsersDAO.getUserByUsername(user.username);
		System.out.println(user.username);

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
		User usere = (User)request.getSession().getAttribute("loginUser");
		System.out.println(usere.getUsername() + " " + usere.getName());

		// We know this, because in users we have 3 types of instances[Administrator,
		// Guest, Host]
		if (userForLogin.getRole().equals("ADMIN")) {
			System.out.println("REGISTRACIIIJAAA ADMIN " + user.username);
			return Response.status(Response.Status.ACCEPTED).entity("/Seoul-Food/adminHome.html").build();

			//return Response.status(Response.Status.OK).build();
			
		} else if (userForLogin.getRole().equals("MANAGER")) {
			
			System.out.println("REGISTRACIIIJAAA MANAGER " + user.username);
			return Response.status(Response.Status.ACCEPTED).entity("/Seoul-Food/managerHome.html").build();
			
		} else if (userForLogin.getRole().equals("DELIVERYMAN")) {
			
			System.out.println("REGISTRACIIIJAAA DELIVERYMAN" + user.username);
			return Response.status(Response.Status.ACCEPTED).entity("/Seoul-Food/deliveryHome.html").build();
			
		} else if (userForLogin.getRole().equals("BUYER")) {
			
			System.out.println("REGISTRACIIIJAAA BUYER" + user.username);
			return Response.status(Response.Status.ACCEPTED).entity("/Seoul-Food/costumerHome.html").build();
			
		}

		return Response.status(Response.Status.ACCEPTED).entity("/Seoul-Food/index.html").build(); 
		

	}
	
	@GET
	@Path("/logout")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response logoutUser() {
		System.out.println("prvi");
		if(isUser()) {
		
			HttpSession session = request.getSession();
			User user = (User)request.getSession().getAttribute("loginUser");
			System.out.println(user.getUsername() + " " + user.getName());
			System.out.println("drugii");
			System.out.println(session.getAttribute("loginUser"));
			System.out.println("treci");
			if(session != null && session.getAttribute("loginUser") != null) {
				session.invalidate();
				
				return Response
						.status(Response.Status.ACCEPTED).entity("/Seoul-Food/index.html")
						.build();
			}
			return Response
					.status(Response.Status.ACCEPTED).entity("LOGOUT UNSUCCESSFUL")
					.build();
		}
		return Response.status(Response.Status.FORBIDDEN).entity("You do not have permission to access!").build();
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
	public Response blockUser(User selectedUser){
		if(isUserAdmin()) {
			UserDAO allUsersDAO = getUsers();
			allUsersDAO.blockUserByUsername(selectedUser.getUsername());
			return Response
					.status(Response.Status.ACCEPTED).entity("USER BLOCKED")
					.entity(getUsers().getValues())
					.build();
		}
	
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
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
	
	@POST
	@Path("/unblockUser")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response unblockUser(User selectedUser){
		if(isUserAdmin()) {
			UserDAO allUsersDAO = getUsers();
			allUsersDAO.unblockUserByUsername(selectedUser.getUsername());
			return Response
					.status(Response.Status.ACCEPTED).entity("USER UNBLOCKED")
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
	/*
	@GET
	@Path("/myProfile")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMyProfile() {
		System.out.println("hana");
		if( request.getSession().getAttribute("loginUser") != null) {
			System.out.println("dul");
			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
					.entity(request.getSession().getAttribute("loginUser"))
					.build();
		}
		System.out.println("set");
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
	*/
	@GET
	@Path("/myProfile")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMyProfile() {
		System.out.println("hana1");
		User user = getUsers().findUserByUsername(((User)request.getSession().getAttribute("loginUser")).getUsername());
		System.out.println(user.getBirthday());
		//umesto da vratim objekat iz sesije nadjem taj objekat u bazi
		if( request.getSession().getAttribute("loginUser") != null) {
			System.out.println("dul2");
			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
					.entity(user)
					.build();
		}
		System.out.println("set3");
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
	
	@POST
	@Path("/changePassword")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response changePassword(ChangePasswordDTO selectedUser){
		if(isUserLogedIn(selectedUser.username)) {
			System.out.println("ulogovan je bas taj korisnik");
			UserDAO allUsersDAO = getUsers();
			User user = allUsersDAO.changePassword(selectedUser);
			//da li staviti izmenjenog usera u sesiju
			if(user != null) {
				return Response
						.status(Response.Status.ACCEPTED).entity("PASSWORD CHANGED SUCCESSFULY").build();
			}
			System.out.println("sifra nije izmjenjena");
			return Response.status(403).type("text/plain")
					.entity("Password incorrect!").build();
		}
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
	
	@POST
	@Path("/editUser")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response editUser(UserDTO selectedUser){
		System.out.println("usao u edit user zahtev");
		System.out.println("izmenjen user:birthday: " + selectedUser.birthday);
		String username = ((User) request.getSession().getAttribute("loginUser")).getUsername();
		//AKO USPEM PRKO PARAMETRA DA POSALJEM USERNAME OVO PROVERU BI TREBALA RADIT 
		//if(isUserLogedIn(selectedUser.username)) {
			System.out.println("ulogovan je bas taj korisnik");
			UserDAO allUsersDAO = getUsers();
			//allUsersDAO.unblockUserById(param.user.getID());
			String changed = allUsersDAO.editUser(selectedUser,username); //da li staviti izmenjenog usera u sesiju
			request.getSession().setAttribute("loginUser", allUsersDAO.findUserByUsername(selectedUser.username));
			//System.out.println(user.getPassword());
			if(changed.equals("true")) {
				return Response
						.status(Response.Status.ACCEPTED).entity("USER EDITED SUCCESSFULY").build();
			}
			System.out.println("user nije izmjenjen");
			return Response.status(403).type("text/plain")
					.entity(changed).build();
		
		//return Response.status(403).type("text/plain")
		//		.entity("You do not have permission to access!").build();
	}

	private boolean isUserLogedIn(String username) {
		User user = (User) request.getSession().getAttribute("loginUser");
		if(user.getUsername().equals(username)) {
			return true;
		}
		return false;
	}
	
	
	@POST
	@Path("/deleteUser")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteUser(User selectedUser){
		if(isUserAdmin()) {
			UserDAO allUsersDAO = getUsers();
			allUsersDAO.logicallyDeleteUserByUsername(selectedUser.getUsername());
			return Response
					.status(Response.Status.ACCEPTED).entity("USER DELETED")
					.entity(getUsers().getValues())
					.build();
		}
	
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
	
	@POST
	@Path("/undeleteUser")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response restoreUser(User selectedUser){
		if(isUserAdmin()) {
			UserDAO allUsersDAO = getUsers();
			allUsersDAO.logicallyRestoreUserByUsername(selectedUser.getUsername());
			return Response
					.status(Response.Status.ACCEPTED).entity("USER UNBLOCKED")
					.entity(getUsers().getValues())
					.build();
		}
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
	
	@GET
	@Path("/freeManagers")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getFreeManagers() {
		UserDAO allUsersDAO = getUsers();
		User user = allUsersDAO.findUserByUsername(((User)request.getSession().getAttribute("loginUser")).getUsername());
		
		//umesto da vratim objekat iz sesije nadjem taj objekat u bazi
		if( request.getSession().getAttribute("loginUser") != null) {
			if(user.getRole().equals("ADMIN")) {
				System.out.println(allUsersDAO.getFreeManagers().size());
				return Response
						.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
						.entity(allUsersDAO.getFreeManagers())
						.build();
			}
		}
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
	
	@GET
	@Path("/myManager/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getManager(@PathParam("id") Integer manID) {
		User user = getUsers().findUserById(manID);
		System.out.println(user.getBirthday()+"rodj menadzera");
		if(isUser()) {
			return Response
					.status(Response.Status.ACCEPTED)
					.entity(user)
					.build();
		}
		System.out.println("set3");
		return Response.status(403).type("text/plain")
				.entity("You do not have permission to access!").build();
	}
	
}
