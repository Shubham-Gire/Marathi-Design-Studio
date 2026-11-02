package com.marathidesign.template.repository;

import com.marathidesign.template.model.TemplateCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<TemplateCategory, Long> {
    List<TemplateCategory> findAllByOrderByDisplayOrderAsc();
    Optional<TemplateCategory> findBySlug(String slug);
}
