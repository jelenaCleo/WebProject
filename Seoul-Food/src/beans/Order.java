package beans;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;



public class Order {
	enum Status {
		  OBRADA,
		  U_PRIPREMI,
		  CEKA_DOSTAVU,
		  U_TRANSPORTU,
		  DOSTAVLJENA,
		  OTKAZANA
		}
	
	private String ID;
	private ArrayList<Article> articles;
	private Integer restID;
	private Date oderDate;
	private double price;
	private String username;
	private String firstName;
	private String lastName;
	private Status status;
	
	public Order() {
		// TODO Auto-generated constructor stub
	}
	public Order(String ID,ArrayList<Article> articles,Integer restID, String oderDate,String price,String username,String firstName,String lastName) {
		
		this.status = Status.OBRADA;
		this.ID = ID;
		this.articles = articles;
		this.restID = restID;
		//parsiraj string u date i string u double 
		try {
			this.oderDate = new SimpleDateFormat("dd-MM-yyyy").parse(oderDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		this.price = Double.parseDouble(price);
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
	
	}
	
	
	public String getID() {
		return ID;
	}
	public void setID(String iD) {
		ID = iD;
	}
	public ArrayList<Article> getArticles() {
		return articles;
	}
	public void setArticles(ArrayList<Article> articles) {
		this.articles = articles;
	}
	public Integer getRestID() {
		return restID;
	}
	public void setRestID(Integer restID) {
		this.restID = restID;
	}
	public Date getOderDate() {
		return oderDate;
	}
	public void setOderDate(Date oderDate) {
		this.oderDate = oderDate;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}

	
}
