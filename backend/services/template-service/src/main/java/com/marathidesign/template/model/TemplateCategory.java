package com.marathidesign.template.model;

import jakarta.persistence.*;

@Entity
@Table(name = "template_categories")
public class TemplateCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String slug;

    @Column(nullable = false, name = "name_mr")
    private String nameMr;

    @Column(name = "icon_name", length = 50)
    private String iconName;

    @Column(nullable = false, name = "display_order")
    private Integer displayOrder = 0;

    public TemplateCategory() {}

    public TemplateCategory(String slug, String nameMr, String iconName, Integer displayOrder) {
        this.slug = slug;
        this.nameMr = nameMr;
        this.iconName = iconName;
        this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getNameMr() { return nameMr; }
    public void setNameMr(String nameMr) { this.nameMr = nameMr; }

    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
