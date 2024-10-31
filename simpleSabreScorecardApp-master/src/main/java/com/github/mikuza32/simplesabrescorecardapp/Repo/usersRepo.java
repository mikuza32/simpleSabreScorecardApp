package com.github.mikuza32.simplesabrescorecardapp.Repo;
import com.github.mikuza32.simplesabrescorecardapp.Entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface usersRepo extends JpaRepository<Users, Long> {
    // finds the Users entity by the unique username, so that the repo can provide basic CRUD operations
    Optional<Users> findByUsername(String username);
}
