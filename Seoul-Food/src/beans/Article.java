package beans;


public class Article {


	private String name;
	private double price;
	private Integer type; //0 - jelo , 1- pice
	private Integer restaurantID;
	private double quantity;
	private String measure;
	private String description;
	private String image;
	
	
	public Article() {
		
	}

	
	public Article(String name, double price, Integer type, Integer restaurantID, double quantity,String measure, String description,
			String image) {
		super();
		this.name = name;
		this.price = price;
		this.type = type;
		this.restaurantID = restaurantID;
		this.quantity = quantity;
		this.measure = measure;
		this.description = description;
		this.image = image;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getRestaurantID() {
		return restaurantID;
	}
	public void setRestaurantID(Integer restaurantID) {
		this.restaurantID = restaurantID;
	}
	public double getQuantity() {
		return quantity;
	}
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	public String getMeasure() {
		return measure;
	}


	public void setMeasure(String measure) {
		this.measure = measure;
	}


	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
}
