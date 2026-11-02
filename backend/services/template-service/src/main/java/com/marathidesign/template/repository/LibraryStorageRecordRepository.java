package com.marathidesign.template.repository;

import com.marathidesign.template.model.LibraryStorageRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LibraryStorageRecordRepository extends JpaRepository<LibraryStorageRecord, Long> {
    Optional<LibraryStorageRecord> findByLibraryType(String libraryType);
}
