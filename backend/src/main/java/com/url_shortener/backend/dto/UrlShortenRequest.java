package com.url_shortener.backend.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class UrlShortenRequest {
    @NotBlank(message = "Original URL is required")
    private String originalUrl;
    
    private LocalDateTime expiresAt;
} 