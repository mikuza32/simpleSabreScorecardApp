package com.github.mikuza32.simplesabrescorecardapp.Service;
import com.github.mikuza32.simplesabrescorecardapp.Entities.Users;
import com.github.mikuza32.simplesabrescorecardapp.Repo.usersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;


@Service
public class usersService {

    private final usersRepo usersRepo;


    // calls interface for CRUD operations
    @Autowired
    public usersService(usersRepo usersRepo) {
        this.usersRepo = usersRepo;
    }


    //method uses repo query to first search if someone already has a particular username, then either throws a runtimeexception or creates the new user
    public Users createUser(String username, String password) {
        if (usersRepo.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username is already in use");
        }
        // creates new user and sets the username and password
        Users user = new Users();
        user.setUsername(username);
        user.setPassword(password);
        return usersRepo.save(user);
    }

    // makes sure a users entered username and password does not match existing account created, if it matches it will return the user
    public Optional<Users> authenticateUser(String username, String password) {
        Optional<Users> user = usersRepo.findByUsername(username);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty(); // returns empty if user has a failed log in attempt
    }

}




