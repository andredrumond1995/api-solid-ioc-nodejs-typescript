echo "Listen 3307" >> /etc/apache2/ports.conf\
&& sed -i "1s/.*/<VirtualHost *:80 *:3307>/" /etc/apache2/sites-enabled/000-default.conf\
&& /etc/init.d/apache2 restart
