package com.example.auth0_backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.core.AuthenticationException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.core.*;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
public class SecurityConfig {

  @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
  private String issuer;

  @Value("${app.auth0.audience}")
  private String audience;

  @Value("${cors.allowed-origins:http://localhost:3000}")
  private String allowedOrigins;

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))
      .authorizeHttpRequests(auth -> auth
        .requestMatchers(HttpMethod.GET, "/api/public").permitAll()
        .requestMatchers("/api/protected").authenticated()
        .anyRequest().permitAll()
      )
      .oauth2ResourceServer(oauth2 -> oauth2
        .authenticationEntryPoint(loggingAuthEntryPoint())
        .jwt(Customizer.withDefaults())
      );

    return http.build();
  }

  @Bean
  AuthenticationEntryPoint loggingAuthEntryPoint() {
    return (HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) -> {
      System.err.println("[AUTH-ERROR] URI=" + request.getRequestURI() + " msg=" + authException.getMessage());
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: " + authException.getMessage());
    };
  }

  @Bean
  NimbusJwtDecoder jwtDecoder() {
    // Build decoder from issuer
    NimbusJwtDecoder decoder = JwtDecoders.fromOidcIssuerLocation(issuer);

    // Default validators
    OAuth2TokenValidator<Jwt> defaultValidator = JwtValidators.createDefaultWithIssuer(issuer);

    // Enforce audience validation (token must contain configured audience)
    OAuth2TokenValidator<Jwt> audienceValidator = token -> {
      if (token.getAudience() != null && token.getAudience().contains(audience)) {
        return OAuth2TokenValidatorResult.success();
      }
      return OAuth2TokenValidatorResult.failure(new OAuth2Error(
        "invalid_token", "Required audience is missing or does not match.", null));
    };

    decoder.setJwtValidator(new DelegatingOAuth2TokenValidator<>(defaultValidator, audienceValidator));
    return decoder;
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of(allowedOrigins));
    config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
    config.setAllowedHeaders(List.of("Authorization","Content-Type"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }
}
