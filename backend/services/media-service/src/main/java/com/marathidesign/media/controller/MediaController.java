package com.marathidesign.media.controller;

import com.marathidesign.media.model.MediaAsset;
import com.marathidesign.media.service.MediaService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/media")
public class MediaController {

    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    private Long extractUserId(String userIdHeader) {
        if (userIdHeader == null || userIdHeader.trim().isEmpty()) {
            return null;
        }
        try {
            return Long.parseLong(userIdHeader.trim());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    @GetMapping
    public ResponseEntity<?> listUserMedia(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader) {
        Long userId = extractUserId(userIdHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized user"));
        }
        List<MediaAsset> assets = mediaService.getUserMedia(userId);
        return ResponseEntity.ok(assets);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader,
            @RequestHeader(value = "X-Plan-Tier", defaultValue = "FREE") String planTier,
            @RequestParam("file") MultipartFile file) {
        Long userId = extractUserId(userIdHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized user"));
        }
        try {
            MediaAsset asset = mediaService.storeFile(userId, planTier, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "id", asset.getId(),
                    "originalFilename", asset.getOriginalFilename(),
                    "mimeType", asset.getMimeType(),
                    "fileSizeBytes", asset.getFileSizeBytes(),
                    "url", "/api/v1/media/file/" + asset.getId()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An error occurred while uploading the file."));
        }
    }

    @GetMapping("/file/{id}")
    public ResponseEntity<Resource> getFile(@PathVariable Long id) {
        var opt = mediaService.getAsset(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        MediaAsset asset = opt.get();
        Resource resource = mediaService.loadAsResource(asset.getStoragePath());
        if (resource == null) {
            return ResponseEntity.notFound().build();
        }

        MediaType mediaType;
        try {
            mediaType = MediaType.parseMediaType(asset.getMimeType());
        } catch (Exception e) {
            mediaType = MediaType.APPLICATION_OCTET_STREAM;
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + asset.getOriginalFilename() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader) {
        Long userId = extractUserId(userIdHeader);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized user"));
        }
        boolean deleted = mediaService.deleteAsset(id, userId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
