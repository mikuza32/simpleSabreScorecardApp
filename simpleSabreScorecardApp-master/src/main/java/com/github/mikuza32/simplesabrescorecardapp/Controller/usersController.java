package com.github.mikuza32.simplesabrescorecardapp.Controller;


import com.github.mikuza32.simplesabrescorecardapp.Entities.Users;
import com.github.mikuza32.simplesabrescorecardapp.Service.usersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/account")
public class usersController {
    private final usersService service;

    @Autowired
    public usersController(usersService service) { //calls the service class so that the controller can perform service methods
        this.service = service;
    }


    // attempts to create new username and password based on the user entry that is passed as a JSON Object (2 strings)
    // if successful then the application calls the service method that handles new account creation and prints to the user on the UI
    // if unsuccessful (user already exists etc) then the user is thrown a conflict stating that the account could not be created
    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        try {
            Users users = service.createUser(username, password);
            return ResponseEntity.status(HttpStatus.CREATED).body(users);
        } catch (RuntimeException exception) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Could not create account!");
        }
    }


    // requests the already created username and password from the service/database
    // if true and exists then the user will be logged in with a unique id attached to the account and be able to use tools
    // if account doesn't exist then the user will be thrown an unauthorized http status that the login attempt was unsuccessful
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        Optional<Users> users = service.authenticateUser(username, password);

        if (users.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User logged in successfully");
            response.put("userId", users.get().getId());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Could not login!");
        }

    }

}
