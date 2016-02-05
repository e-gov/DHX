---
layout: page
title: Andmejälgija / Personal Data Monitor
---

Personal Data Monitor, *Andmejälgija* in Estonian, is a set of 4 [microservice](https://en.wikipedia.org/wiki/Microservices)-style  applications that, when combined with each other and attached to X-Road can offer the citizen the comprehensive view of how his or her personal data has been used by the government.

Each component is designed to be simple, "dumb". That means the component performs a single, clear function and communicates with its environment via clean APIs. Component has to have only a limited view and understanding of its environment. 

The power lies in how the components are connected to each other and the elements of X-Road.

**Extractor** (*et* *Eraldusfilter*) watches Information System's outbound traffic and filters out the messages where personal data is being sent out from the Information System. A personal data usage log record is created for each such event. The log record contains metadata about personal data usage: person's ID, date, name of the X-Road service, name of the message recipient agency and the purpose of the personal data use (if available). Personal data itself, however, is neither extracted from the message nor recorded. 

Extractor is placed as a proxy between X-Road Security Server and governmental Information System.  

<img style='float:left; margin: 10px 50px 160px 50px;' src='{{ site.url }}/img/Extractor.svg'>

---
Extractor has four interfaces:

(1) <img style='display: inline-block;' src='{{ site.url }}/img/ProvidesRIGHT.svg'> provides a service of delivering X-Road message from Information System to Security Server

(2) <img style='display: inline-block;' src='{{ site.url }}/img/RequiresLEFT.svg'> requires a service that accepts the X-Road message received from Information System and to be passed on

(3) <img style='display: inline-block;' src='{{ site.url }}/img/RequiresDOWN.svg'> requires a service to where to send the log record

(4) <img style='display: inline-block;' src='{{ site.url }}/img/ConfUP.svg'> requires a configuration file with extraction rules.

Protocols: (1) and (2) conform to X-Road message protocol (which is built over SOAP/HTTP(S)); (3) conforms to Personal Data Usage Logger protocol; and (4) follows a special extraction rule format.

**Personal Data Usage Logger** (*et* *Andmesalvestaja*) stores the personal data usage log record in database. Contents of the database is made available for request by the person.  

<img style='float:left; margin: 10px 50px 160px 50px;'  src='{{ site.url }}/img/Logger.svg'>

---
Personal Data Usage Logger has four interfaces:

(1) <img style='display: inline-block;' src='{{ site.url }}/img/ProvidesUP.svg'> provides a service of storing personal data usage log records in database

(2) <img style='display: inline-block;' src='{{ site.url }}/img/ProvidesLEFT.svg'> serves log records over X-Road to the interested party - the person him- or herself 

(3) <img style='display: inline-block;' src='{{ site.url }}/img/ProvidesDOWN.svg'> serves log records to Information Systems audit personnel

(4) <img style='display: inline-block;' src='{{ site.url }}/img/ConfRIGHT.svg'> requires a configuration file that sets storage parameters.

Protocols: (1) conforms to Personal Data Usage Logger protocol; (2) conforms to X-Road message protocol (which is built over SOAP/HTTP(S)); (3) is a RESTful API.

**Personal Data Usage Viewer** (*et* *Vaataja*) offers the citizen, through UI, the comprehensive view of how his or her personal data has been used by the government.  

<img style='float:left; margin: 10px 50px 140px 50px;'  src='{{ site.url }}/img/Viewer.svg'>

---
Personal Data Usage Viewer has three interfaces:

(1) <img style='display: inline-block;' src='{{ site.url }}/img/ProvidesLEFT.svg'> provides an UI to the citizen

(2) <img style='display: inline-block;' src='{{ site.url }}/img/RequiresRIGHT.svg'> requires a service that provides personal data usage log records 

(3) <img style='display: inline-block;' src='{{ site.url }}/img/ConfUP.svg'> requires a configuration file

Protocols: (1) uses HTML/CSS/JS over HTTPS; (2) requires a X-Road web service.

**Personal Data Usage Verifier** (*et* *Kontrollija*) offers the Information System's auditor to view the personal data usage log.  

<img style='float:left; margin: 10px 50px 140px 50px;'  src='{{ site.url }}/img/Verifier.svg'>

---
Personal Data Usage Verifier has three interfaces:

(1) <img style='display: inline-block;' src='{{ site.url }}/img/RequiresLEFT.svg'> requires a service that provides personal data usage log records 

(2) <img style='display: inline-block;' src='{{ site.url }}/img/ProvidesLEFT.svg'> provides an UI to the Information System's auditor

(3) <img style='display: inline-block;' src='{{ site.url }}/img/ConfUP.svg'> requires a configuration file

Protocols: (1) requires a X-Road web service; (2) uses HTML/CSS/JS over HTTPS.





