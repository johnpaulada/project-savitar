FROM debian:stretch-slim
RUN apt-get update
RUN apt-get install \
	build-essential \
	zlib1g-dev \
	libpcre3 \
	libpcre3-dev \
	libssl-dev \
	libxslt-dev \
	libgd2-xpm-dev \
	libgeoip-dev \
	libpam-dev \
	wget \
	unzip -y
RUN apt-get install nginx -y
ENV NGINX_VERSION 1.13.3
ENV NPS_VERSION 1.12.34.2-stable
ENV NPS_RELEASE_NUMBER $NPS_VERSION/beta/
ENV NPS_RELEASE_NUMBER $NPS_VERSION/stable/
COPY install_pagespeed.sh $HOME/install_pagespeed.sh
COPY install_nginx.sh $HOME/install_nginx.sh
RUN useradd -s /bin/false nginx
RUN /bin/bash install_pagespeed.sh
RUN /bin/bash install_nginx.sh
COPY nginx.conf /etc/nginx/nginx.conf
RUN nginx -t && service nginx restart
CMD ["nginx", "-g", "daemon off;"]