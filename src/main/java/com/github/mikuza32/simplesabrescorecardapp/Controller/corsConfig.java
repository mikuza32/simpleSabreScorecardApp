package com.github.mikuza32.simplesabrescorecardapp.Controller;

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
