FROM httpd:2.4

LABEL Gopal Kollengode <gopal.kollengode.t3c.io>

COPY . /usr/local/apache2/htdocs/linshare-ui-admin
RUN cat /usr/local/apache2/htdocs/linshare-ui-admin/httpd.extra.conf >> /usr/local/apache2/conf/httpd.conf
RUN cp /usr/local/apache2/htdocs/linshare-ui-admin/linshare-ui-admin.conf /usr/local/apache2/conf/extra/linshare-ui-admin.conf

EXPOSE 80