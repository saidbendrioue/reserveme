package com.othex.reserveme.entities;

import org.hibernate.annotations.GenericGenerator;

import com.othex.reserveme.entities.commons.AbstractAuditingEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;

@Entity
@EqualsAndHashCode(callSuper = false)
@Table(name = "nutritional_information")
public class NutritionalInformation extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(generator = "hash-id-generator")
    @GenericGenerator(name = "hash-id-generator", strategy = "com.othex.reserveme.entities.commons.HashIdGenerator")
    private String id;

    @Column(name = "protein")
    private double protein;

    @Column(name = "fat")
    private double fat;

    @Column(name = "carbohydrates")
    private double carbohydrates;

    @Override
    public String toString() {
        return "NutritionalInformation{" +
                "id='" + id + '\'' +
                ", protein=" + protein +
                ", fat=" + fat +
                ", carbohydrates=" + carbohydrates +
                '}';
    }

}
