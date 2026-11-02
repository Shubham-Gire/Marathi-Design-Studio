package com.marathidesign.template.repository;

import com.marathidesign.template.model.TemplateAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TemplateAssetRepository extends JpaRepository<TemplateAsset, Long> {

    List<TemplateAsset> findByTemplateId(Long templateId);

    Optional<TemplateAsset> findBySha256Hash(String sha256Hash);

    @Query("SELECT COALESCE(SUM(a.fileSizeBytes), 0) FROM TemplateAsset a")
    Long getTotalStorageBytes();

    @Query("SELECT a FROM TemplateAsset a ORDER BY a.fileSizeBytes DESC")
    List<TemplateAsset> findTopLargestAssets();

    List<TemplateAsset> findByReferenceCountLessThanEqual(int count);
}
