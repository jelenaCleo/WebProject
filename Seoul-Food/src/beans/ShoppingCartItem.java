package beans;

public class ShoppingCartItem {

	private Article article;
	private int count;
	
	
	public ShoppingCartItem() {
		// TODO Auto-generated constructor stub
	}
	
	public ShoppingCartItem(Article a, int count) {
		this.article = a;
		this.count = count;
	}
	
	
	
	public Article getArticle() {
		return article;
	}


	public void setArticle(Article article) {
		this.article = article;
	}


	public int getCount() {
		return count;
	}


	public void setCount(int count) {
		this.count = count;
	}
	



}
