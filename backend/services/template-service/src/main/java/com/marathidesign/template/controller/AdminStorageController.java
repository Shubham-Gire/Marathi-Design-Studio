package com.marathidesign.template.controller;

import com.marathidesign.template.dto.StorageSummaryDto;
import com.marathidesign.template.model.DesignElement;
import com.marathidesign.template.model.Template;
import com.marathidesign.template.repository.TemplateRepository;
import com.marathidesign.template.service.DesignElementService;
import com.marathidesign.template.service.StorageAccountingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminStorageController {

    private final StorageAccountingService storageAccountingService;
    private final DesignElementService designElementService;
    private final TemplateRepository templateRepository;

    public AdminStorageController(StorageAccountingService storageAccountingService,
                                  DesignElementService designElementService,
                                  TemplateRepository templateRepository) {
        this.storageAccountingService = storageAccountingService;
        this.designElementService = designElementService;
        this.templateRepository = templateRepository;
    }

    /**
     * Get storage accounting summary for both 10 GB Template and 10 GB Element libraries.
     */
    @GetMapping("/storage/summary")
    public ResponseEntity<StorageSummaryDto> getStorageSummary() {
        return ResponseEntity.ok(storageAccountingService.getStorageSummary());
    }

    /**
     * Create or upload a new design element into the reusable element library.
     */
    @PostMapping("/elements")
    public ResponseEntity<DesignElement> createDesignElement(@RequestBody DesignElement element) {
        DesignElement created = designElementService.createElement(element);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Delete an element to reclaim space.
     */
    @DeleteMapping("/elements/{id}")
    public ResponseEntity<Map<String, Object>> deleteDesignElement(@PathVariable Long id) {
        designElementService.deleteElement(id);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Design element deleted and library storage updated"
        ));
    }

    /**
     * Delete a template to reclaim space.
     */
    @DeleteMapping("/templates/{id}")
    public ResponseEntity<Map<String, Object>> deleteTemplate(@PathVariable Long id) {
        Template template = templateRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Template not found with ID: " + id));

        long bytes = template.getFileSizeBytes() != null ? template.getFileSizeBytes() : 0L;
        templateRepository.delete(template);
        storageAccountingService.recordAssetDeletion(StorageAccountingService.TYPE_TEMPLATES, bytes);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Template deleted and library storage updated"
        ));
    }

    /**
     * Trigger safe cleanup of unreferenced files.
     */
    @PostMapping("/storage/cleanup")
    public ResponseEntity<Map<String, Object>> performCleanup() {
        long reclaimedBytes = storageAccountingService.performSafeCleanup();
        return ResponseEntity.ok(Map.of(
                "success", true,
                "reclaimedBytes", reclaimedBytes,
                "message", String.format("Safe cleanup completed. Reclaimed %d bytes (%.2f KB).",
                        reclaimedBytes, reclaimedBytes / 1024.0)
        ));
    }
}
