FROM phpmyadmin/phpmyadmin:latest
RUN mkdir -p /usr/custom-scripts/
COPY phpmyadmin.conf.sh /usr/custom-scripts
RUN chmod +x /usr/custom-scripts/phpmyadmin.conf.sh
