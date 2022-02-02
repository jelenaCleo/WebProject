package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Comment;
import beans.Restaurant;
import beans.User;
import dto.CommentDTO;
import dto.NewCommentDto;
import dto.SmallUserDTO;


public class CommentDAO {

	private LinkedHashMap<String, Comment> comments;
	private String path;

	public CommentDAO() {
		File dir = new File(System.getProperty("catalina.base") + File.separator + "appData");

		if (!dir.exists()) {
			dir.mkdir();
		}
		this.path = System.getProperty("catalina.base") + File.separator + "appData" + File.separator + "comments.json";
		System.out.println("-------------------Comment FOLDER -------------------" + this.path);
		this.comments = new LinkedHashMap<String, Comment>();
		readComments();
		
	}
	
	public void readComments() {

		ObjectMapper om = new ObjectMapper();
		File file = new File(this.path);
		List<Comment> commentsList = new ArrayList<Comment>();

		try {
			commentsList = om.readValue(file, new TypeReference<List<Comment>>() {
			});

		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		for (Comment c : commentsList) {
			comments.put(c.getId(), c);
		}
	}

	public void saveComments() {
		List<Comment> commentsList = new ArrayList<Comment>();
		for (Comment o : getValues()) {
			commentsList.add(o);
		}

		ObjectMapper om = new ObjectMapper();

		try {
			om.writeValue(new FileOutputStream(this.path), commentsList);
			System.out.println("WRITING IN comments.json");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public Collection<Comment> getValues() {
		return comments.values();
	}

	public Comment findCommentById(String id) {

		for (Comment c : getValues()) {
			if (c.getId() == id) {
				return c;
			}
		}
		return null;
	}
	
	public String getSaltString(int len) {
		String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		StringBuilder salt = new StringBuilder();
		Random rnd = new Random();
		while (salt.length() < len) { // length of the random string.
			int index = (int) (rnd.nextFloat() * SALTCHARS.length());
			salt.append(SALTCHARS.charAt(index));
		}
		String saltStr = salt.toString();
		return saltStr;

	}

	public ArrayList<Comment> getUserComments(Integer userId) {
		readComments();
		ArrayList<Comment> userComments = new ArrayList<Comment>();
		for( Comment c : getValues()) {
			if(c.getUserId().equals(userId)) {
				userComments.add(c);
			}
		}
		return userComments;
	}


	public ArrayList<CommentDTO> getRestComments(Integer restId, Collection<User> users) {
		ArrayList<CommentDTO> restComments = new ArrayList<CommentDTO>();
		readComments();
		for( Comment c : getValues()) {
			if(c.getRestaurantId().equals(restId) && c.isApproved() == true) {
				
				restComments.add(new CommentDTO(getCommentUser(c.getUserId(), users),c.getContent(),c.getGrade()));
			}
		}
		return restComments;
	}

	private SmallUserDTO getCommentUser(Integer userId, Collection<User> users) {
		for(User u : users) {
			if(u.getID().equals(userId)) {
				return new SmallUserDTO(u.getUsername(), u.getName(), u.getSurname());
			}
		}
		return null;
	}

	public Integer addComment(User user, Restaurant restaurant, NewCommentDto newComment) {
		String id = getSaltString(10);
		Comment comment = new Comment(id, user.getID(), restaurant.getID(), newComment.content, newComment.grade);	
		comments.put(comment.getId(), comment);
		saveComments();
		return restaurant.getID() ;
		
	}

}
