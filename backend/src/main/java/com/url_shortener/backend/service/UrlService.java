package com.url_shortener.backend.service;

import com.url_shortener.backend.dto.UrlShortenRequest;
import com.url_shortener.backend.dto.UrlShortenResponse;
import com.url_shortener.backend.exception.UrlException;
import com.url_shortener.backend.model.UrlMapping;
import com.url_shortener.backend.repository.UrlMappingRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.net.URL;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
public class UrlService {
    private final UrlMappingRepository urlMappingRepository;
    
    @Value("${app.base-url}")
    private String baseUrl;

    public UrlService(UrlMappingRepository urlMappingRepository) {
        this.urlMappingRepository = urlMappingRepository;
    }

    public UrlShortenResponse shortenUrl(UrlShortenRequest request) {
        validateUrl(request.getOriginalUrl());
        
        String shortCode = generateShortCode();
        while (urlMappingRepository.existsByShortCode(shortCode)) {
            shortCode = generateShortCode();
        }

        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(request.getOriginalUrl());
        urlMapping.setShortCode(shortCode);
        urlMapping.setExpiresAt(request.getExpiresAt());
        
        urlMapping = urlMappingRepository.save(urlMapping);

        UrlShortenResponse response = new UrlShortenResponse();
        response.setOriginalUrl(urlMapping.getOriginalUrl());
        response.setShortUrl(baseUrl + "/" + urlMapping.getShortCode());
        response.setExpiresAt(urlMapping.getExpiresAt());
        
        return response;
    }

    public String getOriginalUrl(String shortCode) {
        UrlMapping urlMapping = urlMappingRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new UrlException("URL not found"));

        if (!urlMapping.isActive() || urlMapping.getExpiresAt().isBefore(java.time.LocalDateTime.now())) {
            throw new UrlException("URL has expired or is inactive");
        }

        return urlMapping.getOriginalUrl();
    }

    private void validateUrl(String url) {
        String trimmedUrl = url.trim();
        System.out.println("Validating URL: '" + trimmedUrl + "'");
        try {
            URL parsedUrl = new URL(trimmedUrl);
            String protocol = parsedUrl.getProtocol();
            if (!protocol.equals("http") && !protocol.equals("https")) {
                throw new UrlException("Only HTTP and HTTPS protocols are supported");
            }
        } catch (Exception e) {
            throw new UrlException("Invalid URL format");
        }
    }



    private String generateShortCode() {
        return Base64.getUrlEncoder().withoutPadding()
                .encodeToString(UUID.randomUUID().toString().getBytes())
                .substring(0, 8);
    }

    public List<UrlMapping> getAllUrls() {
        return urlMappingRepository.findAll();
    }

    public void deleteUrl(Long id) {
        if (!urlMappingRepository.existsById(id)) {
            throw new UrlException("URL not found");
        }
        urlMappingRepository.deleteById(id);
    }

} 