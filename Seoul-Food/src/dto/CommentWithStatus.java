package dto;

public class CommentWithStatus {

	public SmallUserDTO user;
	public String content;
	public int grade;
	public boolean status;//ako je true onda je approved
	public String id;
	
	public CommentWithStatus(SmallUserDTO user, String content, int grade,boolean status,String id) {
		super();
		this.user = user;
		this.content = content;
		this.grade = grade;
		this.status = status;
		this.id = id;
		
	}
}
