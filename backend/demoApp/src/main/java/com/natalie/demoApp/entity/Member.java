package com.natalie.demoApp.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Set;

@Data//the data annotation of Lombok will generate the methods for all fields in the class
//setter getter NoArgsConstructor AllArgsConstructor
@Entity//telling JPA to map the class to a database table, and to create a corresponding schema for the table.
//table name will be member, same as the name of the entity class annotated with @Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "mbrNo")
public class Member {

    @Id//state that the mbrNo is the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)//generate new primary key value each time a new member entity persisted
    private Long mbrNo;

    private String mbrName;
    private String mbrTier;
    private String mbrSex;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        //The @JoinTable annotation specifies the details of the junction table ("member_event") and how it should be created and managed.
        name= "member_event",
        joinColumns = @JoinColumn(name = "mbrNo",referencedColumnName = "mbrNo"),
        inverseJoinColumns = @JoinColumn(name = "evtNo",referencedColumnName = "evtNo")
    )
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private Set<Event> events;
}
