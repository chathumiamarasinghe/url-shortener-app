package com.url_shortener.backend.exception;

public class UrlException extends RuntimeException {
    public UrlException(String message) {
        super(message);
    }
} 