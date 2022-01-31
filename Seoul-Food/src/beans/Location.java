package beans;

public class Location {

	private double longitude;
	private double latitude;
	private Address address;
	private String imgUrl;
	public Location() {
		
	}
	
	public Location(double longitude, double latitude, Address address) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
	}
	
	public Location(double longitude, double latitude, Address address,String street, String houseNumber, String zipCode) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = new Address(street,houseNumber,zipCode);
	}
	/**
	 * @author Maja 
	 * @param longitude
	 * @param latitude
	 * @param address
	 * @param street
	 * @param houseNumber
	 * @param zipCode
	 * @param imgUrl
	 */
	public Location(double longitude, double latitude, Address address,String street, String houseNumber, String zipCode,String imgUrl) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = new Address(street,houseNumber,zipCode);
		this.imgUrl = imgUrl;
	}
	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	
	
}
