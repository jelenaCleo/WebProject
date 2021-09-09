package beans;

import java.util.ArrayList;



public class Order {
	public enum Status {
		  OBRADA,
		  U_PRIPREMI,
		  CEKA_DOSTAVU,
		  U_TRANSPORTU,
		  DOSTAVLJENA,
		  OTKAZANA,
		  CEKA_ODOBRENJE,
		  ODOBRENA
		}
	

	private String ID;
	private ArrayList<ShoppingCartItem> articles;
	private Integer restID;
	private String oderDate;
	private double price;
	private String username;
	private String name;
	private String surname;
	private Status status;
	
	public Order() {
		// TODO Auto-generated constructor stub
	}
//	public Order(String ID,ArrayList<Article> articles,Integer restID, String oderDate,String price,String username,String firstName,String lastName) {
//		
//		this.status = Status.OBRADA;
//		this.ID = ID;
//	//	this.articles = articles;
//		this.restID = restID;
//		//parsiraj string u date i string u double 
////		try {
////			this.oderDate = new SimpleDateFormat("dd-MM-yyyy").parse(oderDate);
////		} catch (ParseException e) {
////			e.printStackTrace();
////		}
//		
//		this.price = Double.parseDouble(price);
//		this.username = username;
//		this.firstName = firstName;
//		this.lastName = lastName;
//	
//	}
//	
	
	public Order(String ID, ArrayList<ShoppingCartItem> items, Integer restID, String now, double price,
			String username, String name, String surname) {

			this.ID = ID;
			this.articles = items;
			this.restID = restID;
			this.oderDate = now;
			this.price = price;
			this.username = username;
			this.name = name;
			this.surname = surname;
			
			this.status = Status.OBRADA;
			
	}
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public ArrayList<ShoppingCartItem> getArticles() {
		return articles;
	}
	public void setArticles(ArrayList<ShoppingCartItem> articles) {
		this.articles = articles;
	}
	public Integer getRestID() {
		return restID;
	}
	public void setRestID(Integer restID) {
		this.restID = restID;
	}
	
	public String getOderDate() {
		return oderDate;
	}

	public void setOderDate(String oderDate) {
		this.oderDate = oderDate;
	}

	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	
}
