package com.marathidesign.project.service;

import com.marathidesign.project.dto.ProjectCreateRequest;
import com.marathidesign.project.dto.ProjectDto;
import com.marathidesign.project.dto.ProjectUpdateRequest;
import com.marathidesign.project.model.Project;
import com.marathidesign.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private static final int FREE_PLAN_MAX_PROJECTS = 5;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectDto> getUserProjects(Long userId) {
        return projectRepository.findByUserIdOrderByUpdatedAtDesc(userId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public Optional<ProjectDto> getProject(Long projectId, Long userId) {
        return projectRepository.findByIdAndUserId(projectId, userId).map(this::toDto);
    }

    @Transactional
    public ProjectDto createProject(Long userId, String planTier, ProjectCreateRequest req) {
        // Enforce Free plan quota
        if (!"PRO".equalsIgnoreCase(planTier) && !"BUSINESS".equalsIgnoreCase(planTier)) {
            long count = projectRepository.countByUserId(userId);
            if (count >= FREE_PLAN_MAX_PROJECTS) {
                throw new IllegalStateException("Free plan limit (5 designs) reached. Please upgrade to Pro for unlimited designs.");
            }
        }

        Project p = new Project(
                userId,
                req.getTitle(),
                req.getWidth(),
                req.getHeight(),
                req.getCanvasJson(),
                req.getThumbnailData()
        );
        Project saved = projectRepository.save(p);
        return toDto(saved);
    }

    @Transactional
    public Optional<ProjectDto> updateProject(Long projectId, Long userId, ProjectUpdateRequest req) {
        return projectRepository.findByIdAndUserId(projectId, userId).map(p -> {
            if (req.getTitle() != null && !req.getTitle().trim().isEmpty()) {
                p.setTitle(req.getTitle().trim());
            }
            if (req.getCanvasJson() != null) {
                p.setCanvasJson(req.getCanvasJson());
            }
            if (req.getThumbnailData() != null) {
                p.setThumbnailData(req.getThumbnailData());
            }
            p.setVersion(p.getVersion() + 1);
            return toDto(projectRepository.save(p));
        });
    }

    @Transactional
    public Optional<ProjectDto> duplicateProject(Long projectId, Long userId, String planTier) {
        if (!"PRO".equalsIgnoreCase(planTier) && !"BUSINESS".equalsIgnoreCase(planTier)) {
            long count = projectRepository.countByUserId(userId);
            if (count >= FREE_PLAN_MAX_PROJECTS) {
                throw new IllegalStateException("Free plan limit reached. Please upgrade to Pro to add more designs.");
            }
        }

        return projectRepository.findByIdAndUserId(projectId, userId).map(existing -> {
            Project copy = new Project(
                    userId,
                    existing.getTitle() + " (Copy)",
                    existing.getWidth(),
                    existing.getHeight(),
                    existing.getCanvasJson(),
                    existing.getThumbnailData()
            );
            return toDto(projectRepository.save(copy));
        });
    }

    @Transactional
    public boolean deleteProject(Long projectId, Long userId) {
        Optional<Project> opt = projectRepository.findByIdAndUserId(projectId, userId);
        if (opt.isPresent()) {
            projectRepository.delete(opt.get());
            return true;
        }
        return false;
    }

    private ProjectDto toDto(Project p) {
        return new ProjectDto(
                p.getId(),
                p.getUserId(),
                p.getTitle(),
                p.getWidth(),
                p.getHeight(),
                p.getCanvasJson(),
                p.getThumbnailData(),
                p.getVersion(),
                p.getCreatedAt(),
                p.getUpdatedAt()
        );
    }
}
