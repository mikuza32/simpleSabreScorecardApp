package com.github.mikuza32.simplesabrescorecardapp.Config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SABRConfig implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOriginPatterns("http://localhost:3000").allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS").allowedHeaders("Authorization", "Content-Type").allowCredentials(true);
    }
}
// CORS (Cross-Origin resource sharing) is configured above to allow requests from the frontend and communicate (localhost:3000)
// this allows the various methods needed as well as every service is allowed to communicate after the frontend fetch
// the allowed methods allows the server to handle the OPTIONS request sent by the browser in this CORS mapping
// addCorsMappings is refactored so that the method is implemented from the WebMvcConfigurer interface


