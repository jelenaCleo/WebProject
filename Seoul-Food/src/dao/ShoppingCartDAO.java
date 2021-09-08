package dao;

import java.util.ArrayList;
import java.util.Collection;

import beans.Article;
import beans.ShoppingCart;
import beans.ShoppingCartItem;
import dto.AddToCartDTO;

public class ShoppingCartDAO {

	
	ShoppingCart sc;

	// CRUD
	public ShoppingCartDAO() {

		
		sc = new ShoppingCart();

	}

	public ArrayList<ShoppingCartItem> readCart() {

		return sc.getItems();
	}
	
	public ShoppingCartItem getShoppingCartItem(String articleName, Integer restID) {
			
			
			
			
			return null;
		}

	
	

	public ArrayList<ShoppingCartItem> addToCart(AddToCartDTO dto) {

		if (sc.getUserID() == null) {
			sc.setUserID(dto.userID);
		}

		ShoppingCartItem sci = new ShoppingCartItem(dto.article, dto.count);
		addItems(sci);
		return sc.getItems();
	}

	public void addItems(ShoppingCartItem item) {
		if (unique(item)) {

			sc.getItems().add(item);

		}

	}

	private boolean unique(ShoppingCartItem item) {

		for (ShoppingCartItem i : sc.getItems()) {
			if (i.getArticle().getName().equals(item.getArticle().getName())
					&& i.getArticle().getRestaurantID() == item.getArticle().getRestaurantID()) {
				// samo dodaj kolicinu

				System.out.println("uslaaaaaaa--------------------------!!!!!!!!!");
				i.setCount(i.getCount() + item.getCount());
				return false;
			}
		}
		return true;
	}

	public ShoppingCartItem removeFromCart(Article removeArticle){
		
		for (ShoppingCartItem i :  getItems()) {
			if (i.getArticle().getName().equals(removeArticle.getName())
					&& i.getArticle().getRestaurantID() == removeArticle.getRestaurantID()) {			
				System.out.println("usla ovdje");
				
				return i;
				
							
			}
		}
		return null;
		
	}
	
	public void removeArticle(ShoppingCartItem i) {
		
		sc.getItems().remove(i);
		
	}

	public Collection<ShoppingCartItem> getItems() {
		return sc.getItems();
	}

}
