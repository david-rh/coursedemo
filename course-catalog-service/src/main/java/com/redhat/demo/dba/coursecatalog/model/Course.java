package com.redhat.demo.dba.coursecatalog.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Version;
import java.util.Set;
import java.util.HashSet;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Course implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	@Version
	@Column(name = "version")
	private int version;

	@Column(length = 30, nullable = false)
	private String name;

	@Column(length = 10, nullable = false, unique = true)
	private String number;

	// @OneToMany(mappedBy = "number")
	// private Set<Course> preRequisite = new HashSet<Course>();

	@Column(name = "credit_hours", nullable = false)
	private Integer creditHours;

	@Column
	private String description;

	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public int getVersion() {
		return this.version;
	}

	public void setVersion(final int version) {
		this.version = version;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof Course)) {
			return false;
		}
		Course other = (Course) obj;
		if (id != null) {
			if (!id.equals(other.id)) {
				return false;
			}
		}
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	public String getCourseName() {
		return name;
	}

	public void setCourseName(String courseName) {
		this.name = courseName;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	// public Set<Course> getPreRequisite() {
	// return this.preRequisite;
	// }
	//
	// public void setPreRequisite(final Set<Course> preRequisite) {
	// this.preRequisite = preRequisite;
	// }

	public Integer getCreditHours() {
		return creditHours;
	}

	public void setCreditHours(Integer creditHours) {
		this.creditHours = creditHours;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		String result = getClass().getSimpleName() + " ";
		if (name != null && !name.trim().isEmpty())
			result += "name: " + name;
		if (number != null && !number.trim().isEmpty())
			result += ", number: " + number;
		if (creditHours != null)
			result += ", creditHours: " + creditHours;
		if (description != null && !description.trim().isEmpty())
			result += ", description: " + description;
		return result;
	}
}