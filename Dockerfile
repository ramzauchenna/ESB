FROM  centos:centos7
RUN yum install -y epel-release
RUN  yum install -y nodejs
RUN   yum install -y npm
RUN   yum install -y redis
COPY . /ESB
RUN cd /ESB; npm install; npm dedupe
RUN npm install http-server -g
EXPOSE  80
CMD ["/bin/bash", "/ESB/container/start.sh"]












