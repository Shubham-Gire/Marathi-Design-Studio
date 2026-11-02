package com.marathidesign.template.repository;

import com.marathidesign.template.model.DesignElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DesignElementRepository extends JpaRepository<DesignElement, Long> {

    List<DesignElement> findByCategory(String category);

    @Query("SELECT e FROM DesignElement e WHERE " +
           "(:category IS NULL OR :category = '' OR e.category = :category) AND " +
           "(:search IS NULL OR :search = '' OR LOWER(e.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(e.tags) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:isPremium IS NULL OR e.isPremium = :isPremium) " +
           "ORDER BY e.createdAt DESC")
    List<DesignElement> searchElements(@Param("category") String category,
                                       @Param("search") String search,
                                       @Param("isPremium") Boolean isPremium);

    Optional<DesignElement> findBySha256Hash(String sha256Hash);

    @Query("SELECT COALESCE(SUM(e.fileSizeBytes), 0) FROM DesignElement e")
    Long getTotalStorageBytes();

    @Query("SELECT e FROM DesignElement e ORDER BY e.fileSizeBytes DESC")
    List<DesignElement> findTopLargestAssets();

    @Query("SELECT DISTINCT e.category FROM DesignElement e")
    List<String> findDistinctCategories();

    List<DesignElement> findByReferenceCountLessThanEqual(int count);
}
