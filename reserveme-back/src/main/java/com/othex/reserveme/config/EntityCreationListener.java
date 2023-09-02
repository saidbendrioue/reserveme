package com.othex.reserveme.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.othex.reserveme.entities.commons.AbstractAuditingEntity;

import jakarta.persistence.PrePersist;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EntityCreationListener {

    @PrePersist
    public void prePersist(AbstractAuditingEntity entity) {
        String currentUsername = getCurrentUsername();
        if (currentUsername != null) {
            entity.setCreatedBy(currentUsername);
        }
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }

        return null;
    }
}
