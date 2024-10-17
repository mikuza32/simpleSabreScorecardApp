package com.github.mikuza32.simplesabrescorecardapp.Controller;

import com.github.mikuza32.simplesabrescorecardapp.Repo.corsConfigInterface;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class corsConfig  implements WebMvcConfigurer, corsConfigInterface {


    @Override
    public void corsMapping(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "DELETE").allowedOrigins("http://localhost:3000").allowedHeaders("*").allowCredentials(true);
    }
}
 // CORS (Cross-Origin resource sharing) is configured above to allow requests from the frontend and communicate (localhost:3000)
// this allows the various methods needed as well as every service is allowed to communicate after the frontend fetch