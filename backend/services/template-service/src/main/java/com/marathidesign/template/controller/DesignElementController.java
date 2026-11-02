package com.marathidesign.template.controller;

import com.marathidesign.template.model.DesignElement;
import com.marathidesign.template.service.DesignElementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/elements")
public class DesignElementController {

    private final DesignElementService designElementService;

    public DesignElementController(DesignElementService designElementService) {
        this.designElementService = designElementService;
    }

    @GetMapping
    public ResponseEntity<List<DesignElement>> getElements(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean isPremium) {
        List<DesignElement> elements = designElementService.getElements(category, search, isPremium);
        return ResponseEntity.ok(elements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DesignElement> getElementById(@PathVariable Long id) {
        return designElementService.getElementById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(designElementService.getCategories());
    }
}
