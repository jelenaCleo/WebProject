package beans;

import java.util.ArrayList;

import dto.AddToCartDTO;

public class ShoppingCart {

	private ArrayList<ShoppingCartItem> items;
	private Integer userID;
	private double totalCost;
	
	
	
	
	public ShoppingCart() {
		this.items = new ArrayList<ShoppingCartItem>();
		this.totalCost = 0.0;
	
	}
	
	 public ShoppingCart(Integer userID) {
		 
			this.items = new ArrayList<ShoppingCartItem>();
			this.userID = userID;
			this.totalCost = 0.0;
	 }
	
	
	
	public ArrayList<ShoppingCartItem> getItems() {
		
		for( ShoppingCartItem i : items) {
			System.out.println("DAFAK:" + i.getArticle().getName() +", "+ i.getCount());
		}
		
		return items;
	}

	public void setItems(ArrayList<ShoppingCartItem> items) {
		this.items = items;
	}

	public Integer getUserID() {
		return userID;
	}

	public void setUserID(Integer userID) {
		this.userID = userID;
	}

	public double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}

	//METHODS
	public void addItems(ShoppingCartItem item) {
		if(unique(item)) {
			
			items.add(item);
			
			
		}
		
		
	}

	private boolean unique(ShoppingCartItem item) {
		
		
		for(ShoppingCartItem i : items)
		{
			if(i.getArticle().getName().equals(item.getArticle().getName()) && i.getArticle().getRestaurantID() == item.getArticle().getRestaurantID()) {
				//samo dodaj kolicinu
				
				System.out.println("uslaaaaaaa--------------------------!!!!!!!!!");
				i.setCount(i.getCount() + item.getCount());
				return false;
			}
		}
		return true;
	}

	public boolean addArticle(AddToCartDTO dto) {
		
		if(this.getUserID() == null) {
			this.setUserID(dto.userID);
		}

		ShoppingCartItem sci = new ShoppingCartItem(dto.article, dto.count);
		addItems(sci);
		
		return true;
	}

	
	
	
	

	
}
