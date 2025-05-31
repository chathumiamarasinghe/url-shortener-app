package com.url_shortener.backend.controller;

import com.url_shortener.backend.dto.UrlShortenRequest;
import com.url_shortener.backend.dto.UrlShortenResponse;
import com.url_shortener.backend.exception.UrlException;
import com.url_shortener.backend.service.UrlService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/url")
@CrossOrigin(origins = "*")
@Validated
public class UrlController {
    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping("/shorten")
    public ResponseEntity<?> shortenUrl(@Valid @RequestBody UrlShortenRequest request) {
        try {
            UrlShortenResponse response = urlService.shortenUrl(request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (UrlException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An unexpected error occurred");
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{shortCode}")
    public ResponseEntity<?> redirectToOriginalUrl(@PathVariable String shortCode) {
        try {
            String originalUrl = urlService.getOriginalUrl(shortCode);
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl(originalUrl);
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(java.net.URI.create(originalUrl))
                    .build();
        } catch (UrlException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllUrls() {
        return ResponseEntity.ok(urlService.getAllUrls());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUrl(@PathVariable Long id) {
        urlService.deleteUrl(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateShortenedUrl(@PathVariable Long id, @Valid @RequestBody UrlShortenRequest request) {
        try {
            UrlShortenResponse response = urlService.updateShortenedUrl(id, request);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (UrlException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An unexpected error occurred");
            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



} 