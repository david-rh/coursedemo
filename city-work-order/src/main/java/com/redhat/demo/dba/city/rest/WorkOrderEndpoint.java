package com.redhat.demo.dba.city.rest;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.OptimisticLockException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import com.redhat.demo.dba.city.model.WorkOrder;

import io.swagger.annotations.Api;

/**
 * 
 */
@Stateless
@Api
@Path("/workorders")
public class WorkOrderEndpoint {
	@PersistenceContext(unitName = "city-work-order-persistence-unit")
	private EntityManager em;

	@POST
	@Consumes("application/json")
	public Response create(WorkOrder entity) {
		em.persist(entity);
		return Response.created(
				UriBuilder.fromResource(WorkOrderEndpoint.class)
						.path(String.valueOf(entity.getId())).build()).build();
	}

	@DELETE
	@Path("/{id:[0-9][0-9]*}")
	public Response deleteById(@PathParam("id") Long id) {
		WorkOrder entity = em.find(WorkOrder.class, id);
		if (entity == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		em.remove(entity);
		return Response.noContent().build();
	}

	@GET
	@Path("/{id:[0-9][0-9]*}")
	@Produces("application/json")
	public Response findById(@PathParam("id") Long id) {
		TypedQuery<WorkOrder> findByIdQuery = em
				.createQuery(
						"SELECT DISTINCT w FROM WorkOrder w WHERE w.id = :entityId ORDER BY w.id",
						WorkOrder.class);
		findByIdQuery.setParameter("entityId", id);
		WorkOrder entity;
		try {
			entity = findByIdQuery.getSingleResult();
		} catch (NoResultException nre) {
			entity = null;
		}
		if (entity == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		return Response.ok(entity).build();
	}

	@GET
	@Produces("application/json")
	public List<WorkOrder> listAll(@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		TypedQuery<WorkOrder> findAllQuery = em.createQuery(
				"SELECT DISTINCT w FROM WorkOrder w ORDER BY w.id",
				WorkOrder.class);
		if (startPosition != null) {
			findAllQuery.setFirstResult(startPosition);
		}
		if (maxResult != null) {
			findAllQuery.setMaxResults(maxResult);
		}
		final List<WorkOrder> results = findAllQuery.getResultList();
		return results;
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(@PathParam("id") Long id, WorkOrder entity) {
		if (entity == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		if (id == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		if (!id.equals(entity.getId())) {
			return Response.status(Status.CONFLICT).entity(entity).build();
		}
		if (em.find(WorkOrder.class, id) == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		try {
			entity = em.merge(entity);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
	
	@PUT
	@Path("/status")
	@Consumes("application/json")
	public Response updateStatus(WorkOrder entity) {
		if (entity == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		Long id = entity.getId();
		WorkOrder wo;
		if ((wo = em.find(WorkOrder.class, id)) == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		try {
			wo.setNotes(wo.getNotes()+"\n"+entity.getNotes());
			wo.setAssignedTo(entity.getAssignedTo());
			wo.setStatus(entity.getStatus());
			
			wo = em.merge(wo);
		} catch (OptimisticLockException e) {
			return Response.status(Response.Status.CONFLICT)
					.entity(e.getEntity()).build();
		}

		return Response.noContent().build();
	}
}
