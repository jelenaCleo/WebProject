package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Comment;


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

		for (Comment o : commentsList) {
			comments.put(o.getId(), o);

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
			System.out.println("WRITING IN orders.json");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public Collection<Comment> getValues() {
		return comments.values();
	}
 

	public Comment findCommentById(String id) {

		for (Comment o : getValues()) {
			if (o.getId() == id) {
				return o;
			}
		}
		return null;
	}
}
