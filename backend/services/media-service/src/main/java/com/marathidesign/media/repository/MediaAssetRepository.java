package com.marathidesign.media.repository;

import com.marathidesign.media.model.MediaAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MediaAssetRepository extends JpaRepository<MediaAsset, Long> {
    List<MediaAsset> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<MediaAsset> findByIdAndUserId(Long id, Long userId);
    
    @Query("SELECT COALESCE(SUM(m.fileSizeBytes), 0) FROM MediaAsset m WHERE m.userId = :userId")
    Long getTotalStorageBytesByUser(@Param("userId") Long userId);
}
