package dto;

import java.util.Date;

import javax.json.bind.annotation.JsonbDateFormat;

public class UserDTO {
	public String username;
	public String password;
	public String gender;
	public String name;
	public String surname;
	@JsonbDateFormat(JsonbDateFormat.TIME_IN_MILLIS)
	public Date birthday;
	public String role;

}

