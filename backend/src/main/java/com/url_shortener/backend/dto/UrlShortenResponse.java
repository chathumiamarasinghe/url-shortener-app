package com.url_shortener.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UrlShortenResponse {

    private String originalUrl;
    private String shortUrl;
    private LocalDateTime expiresAt;
} 