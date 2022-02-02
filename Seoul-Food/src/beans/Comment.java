package beans;

public class Comment {

	private String Id;
	private Integer userId;
	private Integer restaurantId;
	private String content;
	private int grade;
	private boolean isApproved;
	
	public Comment() {
		
	}

	public Comment(String id, Integer userId, Integer restaurantId, String content, int grade) {
		super();
		Id = id;
		this.userId = userId;
		this.restaurantId = restaurantId;
		this.content = content;
		this.grade = grade;
		this.isApproved = false;
	}

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(Integer restaurantId) {
		this.restaurantId = restaurantId;
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

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}


}
