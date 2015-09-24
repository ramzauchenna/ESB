FROM  ubuntu:14.04
RUN yum install -y epel-release
RUN  yum install -y nodejs
RUN   yum install -y npm
RUN   yum install -y redis
COPY . /ESB
RUN cd /ESB; npm install; npm dedupe
RUN npm install http-server -g
EXPOSE  8000 8080
CMD ["/bin/bash", "/opt/aws/opsworks/current/site-cookbooks/container/start.sh"]









