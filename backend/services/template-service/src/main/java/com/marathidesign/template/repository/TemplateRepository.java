package com.marathidesign.template.repository;

import com.marathidesign.template.model.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {
    List<Template> findByCategorySlug(String categorySlug);
    
    @Query("SELECT t FROM Template t WHERE t.isPublished = true " +
           "AND (:category IS NULL OR t.categorySlug = :category) " +
           "AND (:search IS NULL OR LOWER(t.titleMr) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(t.tags) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Template> searchTemplates(@Param("category") String category, @Param("search") String search);
}
