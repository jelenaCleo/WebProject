package dto;

public class CommentDTO {

	public SmallUserDTO user;
	public String content;
	public int grade;
	
	public CommentDTO(SmallUserDTO user, String content, int grade) {
		super();
		this.user = user;
		this.content = content;
		this.grade = grade;
	}
	
	
}
