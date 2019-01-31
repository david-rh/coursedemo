#!/bin/bash

injected_dir=$1
source /usr/local/s2i/install-common.sh

echo "*****Running custom install ${injected_dir}"
#install_deployments ${injected_dir}/injected-deployments.war
#install_modules ${injected_dir}/modules
configure_drivers ${injected_dir}/drivers.env
