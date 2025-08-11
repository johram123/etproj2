package com.example.auth0_backend.api;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class DemoController {

    @GetMapping("/public")
    public Map<String, Object> publicEndpoint() {
        return Map.of("message", "Hello from a public endpoint! You don't need to be authenticated to see this.");
    }

    @GetMapping("/protected")
    public Map<String, Object> protectedEndpoint(@AuthenticationPrincipal Jwt jwt) {
        return Map.of(
                "message", "Hello from a protected endpoint! You need to be authenticated to see this.",
                "user", jwt.getClaims()
        );
    }
}