package beans;

import java.util.ArrayList;

public class ShoppingCart {

	private ArrayList<ShoppingCartItem> items;
	
	public ShoppingCart() {
		items = new ArrayList<ShoppingCartItem>();
	}
	
	//add
	
	public boolean addArticle(Article a , int count) {
		
		if( uniqueName(a.getName(),count)) {
		
			items.add(new ShoppingCartItem(a,count));
			return true;
		}
		return false;
	}
	
	private boolean uniqueName(String name, int count) {
		for (ShoppingCartItem i : items) {
			if( i.getArticle().getName().equals(name) ) {
				
				//i.setCount(i.getCount() + count);
				return false;
				
			}			
		}
		return true;
	}

	public ArrayList<ShoppingCartItem> getItems() {
		return items;
	}
	
	public double getTotal() {
		double retVal = 0;
		for(ShoppingCartItem item : items) {
			
			retVal+= item.getTotal();
		}
		return retVal;
	}
}
