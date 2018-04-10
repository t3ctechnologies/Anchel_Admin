# Linshare UI-Admin

[![N|Solid](http://sgs.shrigowri.com/wp-content/uploads/2017/05/cropped-orange2-2-1-1-32x32.png)Shri Gowri Solutions LLP](http://shrigowri.com)

#### How to build the image

```bash
$ docker build --rm --tag vinnycrm/linshare-ui-admin:1.0 .
```

#### How to run the container

For now SSL encryption is mandatory.

```bash
$ docker run -d \
-v $PWD/ca.pem:/usr/local/apache2/conf/server-ca.crt \
-v $PWD/localhost.pem:/usr/local/apache2/conf/server.crt \
-v $PWD/localhost.key:/usr/local/apache2/conf/server.key \
-e EXTERNAL_URL=<wanted_FQDN> \
-e TOMCAT_URL=<tomcat-ip> \
-e TOMCAT_PORT=<tomcat-port>
-p 443:443 \
linagora/linshare-ui-admin
```

Build status
----
[![Build Status](https://travis-ci.org/t3ctechnologies/Anchel_Admin.svg?branch=master)](https://travis-ci.org/t3ctechnologies/Anchel_Admin)

License
----

MIT