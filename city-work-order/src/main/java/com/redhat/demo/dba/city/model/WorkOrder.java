package com.redhat.demo.dba.city.model;

import javax.persistence.Entity;
import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import javax.persistence.Enumerated;
import com.redhat.demo.dba.city.model.WOType;
import com.redhat.demo.dba.city.model.WOStatus;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class WorkOrder implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", updatable = false, nullable = false)
	private Long id;
	@Version
	@Column(name = "version")
	private int version;

	@Enumerated
	private WOType problemType;

	@Column
	private String description;

	@Column(nullable = false)
	private String location;

	@Column
	private String assignedTo;

	@Enumerated
	private WOStatus status;

	@Column
	private String notes;

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
		if (!(obj instanceof WorkOrder)) {
			return false;
		}
		WorkOrder other = (WorkOrder) obj;
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

	public WOType getProblemType() {
		return problemType;
	}

	public void setProblemType(WOType problemType) {
		this.problemType = problemType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String Description) {
		this.description = Description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}

	public WOStatus getStatus() {
		return status;
	}

	public void setStatus(WOStatus status) {
		this.status = status;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String Notes) {
		this.notes = Notes;
	}

	@Override
	public String toString() {
		String result = getClass().getSimpleName() + " ";
		if (description != null && !description.trim().isEmpty())
			result += "description: " + description;
		if (location != null && !location.trim().isEmpty())
			result += ", location: " + location;
		if (assignedTo != null && !assignedTo.trim().isEmpty())
			result += ", assignedTo: " + assignedTo;
		if (notes != null && !notes.trim().isEmpty())
			result += ", Notes: " + notes;
		return result;
	}
}