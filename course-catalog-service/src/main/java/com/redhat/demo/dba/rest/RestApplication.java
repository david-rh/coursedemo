package com.redhat.demo.dba.rest;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import io.swagger.jaxrs.config.BeanConfig;

@ApplicationPath("/api")
public class RestApplication extends Application {
	
	public RestApplication() {
		BeanConfig beanConfig = new BeanConfig();
		beanConfig.setTitle("Course Catalog");
		beanConfig.setVersion("0.2");
		beanConfig.setSchemes( new String[] {"http"});
		beanConfig.setHost("localhost:8080");
		beanConfig.setBasePath("course-catalog-service/api");
		beanConfig.setResourcePackage("com.redhat.demo.dba");
		beanConfig.setScan(true);
		beanConfig.setPrettyPrint(true);
		
	}
	
}