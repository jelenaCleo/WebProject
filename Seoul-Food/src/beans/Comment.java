package beans;

public class Comment {

	private String Id;
	private User user;
	private Restaurant restaurant;
	private String content;
	private int grade;
	
	public Comment() {
		
	}
	public Comment(User user, Restaurant restaurant, String content, int grade) {
		super();
		this.user = user;
		this.restaurant = restaurant;
		this.content = content;
		this.grade = grade;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Restaurant getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getGrade() {
		return grade;
	}
	public void setGrade(int grade) {
		this.grade = grade;
	}
	public String getId() {
		return Id;
	}
	public void setId(String id) {
		Id = id;
	}
	
	
}
