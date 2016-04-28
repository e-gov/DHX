 
### Document exchange protocol DHX

Estonian Information System Authority

v 0.5

#### Overview
The protocol provides a technical solution, which allows the document management systems (DMS) of the Estonian public sector, but also the information systems of the private and third sector that communicate with the public sector, to exchange documents, based on the distributed or decentralised principle.

DHX is a new document exchange protocol which uses the X-Road infrastructure.

Unlike the old document exchange centre (DEC), DHX does not require visiting “the post office” any longer for mail collection, but brings documents to the doorstep.

DHX is intended for the secure organisation of the public sector’s document exchange.

The compilation of the protocol is based on the best practice in protocol specification  [RIA-PP].

The text has a normative meaning. The other content of the GitHub repository has an informative purpose.

The protocol has been developed by the Estonian Information System Authority. Please send proposals and comments to priit.parmakson@ria.ee or create Issue in this repository. 

#### Definitions and abbreviations

_Institution_ &nbsp;&nbsp; An organisation entered into the national register of state and local government institutions (RKOARR).

_Document_ &nbsp;&nbsp; A document processed in an institution within the meaning of document management in the Estonian public sector.

_DMS_ &nbsp;&nbsp; Document management system, an information system for electronic document management within an institution, incl. for servicing document management.

_DMS service_ &nbsp;&nbsp; A relationship, whereby one organisation (company or another institution) provides an institution with the DMS technical environment. There may be several “virtual” DMSs in one technical environment. For example, the Ministry of Economic Affairs and Communications provides a DMS service to institutions under the administration of the ministry; the Information System of Estonian Schools (EKIS) provides the DMS service to several kindergartens.

_DEC_ &nbsp;&nbsp; Document Exchange Centre [DEC].

_RIA_ &nbsp;&nbsp; Estonian Information System Authority.

_Registry code_ &nbsp;&nbsp; A registry code granted to an institution in RKOARR. E.g. `70002093` `Kadrioru kindergarten`.

_Service identifier_ &nbsp;&nbsp; X-Road service identifier under the requirements of X-Road version 6 [X-Road]. Uniquely identifies the X-Road service both on the Estonian X-Road and in the international federation of X-Road instances. Consists of an X-road member identifier, a service code denomination and an optional version number. For example: `EE/GOV/70003158/DMS/sendDocument`.

#### Main characteristics

1.	DHX enables decentralised organisation of electronic document exchange without a central mail processing node.

2.	The protocol does not require individual (bilateral) agreements, configurations, building of interfaces, etc. between institutions that exchange documents. An institution following the protocol may send a document to another institution without previous communication between the two institutions.

#### Motivation

1.	Currently, DMSs exchange documents via DEC, by using the tentatively named “DEC protocol”.

2.	The “DEC protocol” is determined by the list of electronic data exchange meta data [Capsule], the specification of DEC interfaces [DEC specification ] and [DEC maintenance procedure], and, in a broader context, “Common Principles of Administrative and Records Management Procedures” [AÜK].

3.	To a smaller degree, document exchange interfaces have also been established between other information systems that process documents. These interfaces have not been standardised.

4.	The extending document circulation and the tightening network of information systems that exchange documents (modern document exchange is not limited to the so-called pure DMSs – documents are also exchanged by information systems, where document management in the traditional meaning is simply one type of data processing) call for an alternative to the document circulation occurring via a central mailbox server.

#### Aim (”TO BE” situation)
1.	DMSs exchange documents by using document exchange services, which follow the distributed document exchange protocol DHX.
2.	Each DMS offers and uses a DHX document exchange service equivalent to the one used by other institutions.
3.	All DMSs offer an equivalent service – the system is symmetrical.
4.	All document exchange between institutions takes place in the aforementioned manner. DEC has been removed from the use. Intermediaries or central nodes are not used.

#### Parties
1.	The parties on an organisational level are the following:
1) institutions that have adopted DHX document exchange;
2) DMS service providers that have adopted DHX;
3) other organisations (companies, NPOs) that have joined X-Road and wish to send documents to institutions via DHX.
2.	The parties on a system level are the following:
1) DMSs;
2) other systems interfaced with X-Road that wish to use DHX for sending documents to DMS.
Interaction
Figure 1 is a conceptual diagram of the interaction. The dashed lines represent the flow of documents.

```
+-----------+                      +-----------+
|           |<---------------------|           |
|Institution|                      |Institution|
|     1     |--------------------->|     2     |
+-----------+                      +-----------+
+-----------+ sendDocument         +-----------+
|           |--O)------------------|           |
|    DMS 1  |                      |    DMS 2  |
|           |-----------------(O---|           |
+-----------+        sendDocument  +-----------+
```

1.	At an abstract institutional level, institutions exchange documents by directly sending them to and receiving them from each other
2.	On the system level, document exchange is carried out via communication between DMSs on X-Road.
3.	Larger institutions usually have their own DMS. Yet, many institutions, especially smaller ones, use DMS as a service. In such a case, a technical DMS environment may accommodate DMSs of several institutions. The DHX protocol works in both cases, but also in rare instances, where an institution has several DMSs.

#### DMS service

1.	An institution develops their own DMS and opens an X-Road service on X-Road for all other public sector institutions – namely a DHX service, whereby other institutions send documents to that particular institution.

   Note. If an institution uses DMS as a service, then the service is developed by the DMS service provider. An institution authorizes the service provider to run the DHX service on behalf of the institution. This is conducted pursuant to the X-Road certificate management procedure.

2.	For an institution, the DHX service is the official channel for receiving documents on X-Road.

3.	For sending documents to another institution, DMS utilises the DHX service offered by the other institution.

4.	The service must be up and running at least 8 hours a day. DMS with smaller capability must establish a buffer component with higher availability; message queue solutions are well-suited for this purpose. Several of the latter can be found on the market.

5.	In addition to other DMSs, all institutions that have joined X-Road can send documents to the DHX service. In justified cases, an institution may restrict access to the DHX service for X-Road members that are not institutions.

6.	DHX is a standardised document exchange scheme, which allows a simple communication between a large number of parties. However, institutions may, in view of business requirements, create other, special interfaces which use X-Road for exchanging documents and other data between DMSs and other information systems.

#### Name rule

1.	The name of a DHX service must comply with the form defined in this section. Fixing the name form ensures service discovery and, thereby, the addressability of the institution.

2.	The code name of the DHX service within the meaning of X-Road is `sendDocument`.

3.	The full name of the service pursuant to the X-Road v6 name rules is `EE/GOV/< registry code >/DHS/sendDocument`

   where `DHS` (DMS in English) is the name fixed with this protocol ensuring service discovery and `<registrikood>` is the registry code of the institution.

   Note. `EE/GOV` is a type name for an Estonian public sector institution in X-Road v6.

   No version number is added to the technical code name of the service.

   Example: `EE/GOV/70003158/DMS/sendDocument`

#### Messages

1.	Two types of messages move within the interaction: an X-Road query message (query) sent to the service `sendDocument` and a response message (response) sent as a response.

2.	The document is forwarded with the query.

3.	A confirmation of receiving the document is sent as a response to the X-Road query.

#### Message format

1.	The document is forwarded in “a capsule”, containing metadata which must comply with the officially confirmed list of digital data exchange metadata [Capsule].

2.	The registry code of the addressee-institution is also forwarded in the capsule of the document.

3.	The transmitting DMS provides the document with an identifier (a number), which is unique at least within the DMS.

#### Assessing the DHX capability of the addressee

1.	The transmitting system may use one or more of the following methods.

2.	Assessing the DHX capability of the addressee with a transmitting attempt.

   The transmitting system attempts to send a document; if it is expressed in the response that the service does not exist, then the addressee has no DHX capability and the document will be sent via DEC.

   The method does not require the maintenance of status information regarding the capability of addressees in the transmitting system.

3.	Identification of the addressee’s DHX capability before a transmitting attempt.

   The security server of the sender periodically downloads information about the configuration of X-Road [PR-GCONF], including information about the subsystems (e.g. DMS) identified by the members of X-Road, and security servers. The sender’s security server determines, based on the aforementioned configuration data, whether the addressee has identified the DMS subsystem. If the results are negative, then DHX capability is absent. If the results are positive, then the transmitting system queries the addressee’s X-Road meta service `allowedMethods` [PR-META] for the list of services offered by the addressee. If the list contains `sendDocument`, then the addressee has DHX capability and the document will be sent. If the list does not contain the service, then the addressee has no DHX capability and the document will be sent via DEC.

4.	Identification of the DHX capability before sending, with buffering.

   Equivalent to the previous method, but the results of queries are buffered (not repeated over time, the results of the first query are relied upon instead). The method requires the maintenance of status information regarding the capability of addressees in the transmitting system.

#### Processing logic

1.	The document is deemed to be forwarded if the addressee’s DMS or the buffer component with higher availability in front of it has sent a confirmation to the sender and the sender has received it.

2.	If it is not possible to connect with the addressee or if there is no confirmation of receipt, the system will try to send it again after a while (similarly to the DVC protocol). In order to reduce the amount of empty queries, it is recommendable to use the well-known exponential back-off algorithm [EXP].

3.	Upon receipt of a document, DMS has to verify whether the document has been sent twice and avoid repeated processing (characteristic of business logic) of the same document, e.g. entering an invoice into an accounting system twice. A unique identifier of the document allows identifying duplicates.

4.	A technical DMS system, which is servicing several institutions has to ensure the delivery of a document which has arrived via the DHX service to the “virtual” DMS of the correct addressee.

5.	Instead of a confirmation, a corresponding message is sent to the sender regarding incorrectly addressed documents.

#### Enforcement

1.	The effect resulting from the use of the protocol is the greatest if all institutions adopt the protocol. Upon developing the protocol, the assumption is that the vast majority of institutions will start using DHX.

2.	Even though there are institutions that do not use DHX, it does not disrupt the use of DHX.

3.	The protocol does not require the simultaneous switching of all institutions to the DHX protocol (see section “Transition”)

4.	Imposing an obligation to use the protocol does not fall within the scope of this protocol.

#### Extension options

1.	The essential elements of the DHX protocol are as follows: 1) a name rule, which allows simple service discovery; 2) a standardised message format (metadata submitted with the document, the so-called capsule); 3) processing logic, which enables guaranteed delivery in practice; 4) the use of X-Road.

2.	The use of the DHX protocol in the Estonian private sector as well as in international document exchange is the object of further standardisation.

#### Transition

1.	Transition to the DHX protocol takes place in a predetermined period of time. The transition period will start for all institutions simultaneously. RIA will announce of the beginning of the period.

2.	In the transition period, institutions will develop in their DMSs the capability to send and receive documents under the DHX protocol. In technical terms, “DHX capability” refers to the provision of X-Road service under the DHX protocol and the capability to connect to an equivalent service of other institutions.

3.	The capability under the DHX protocol to send and receive documents will be simultaneously developed and adopted in DMS. However, development in various DMSs will be completed at different times.

4.	In the transition period, as soon as the DMS of an institution has developed the DHX-capacity (when the development is finished), the institution must start, at the earliest opportunity, using the DHX service for sending documents.

5.	If it turns out that the addressee has not created a DHX service for receiving documents (i.e. the service cannot be found on X-Road), then the document is sent via DEC by using the DEC service `sendDocument` and marking the document of the addressee in the capsule of meta data.

6.	Once the first document is successfully sent under the DHX protocol to another institution, only DHX (not DEC) has to be used henceforth for sending documents to that institution.

7.	An institution which has launched the DHX service must keep using it.

#### Functioning of DEC during the transition period

1.	DEC will be kept in operation throughout the whole transition period. DEC will be implemented with necessary functionality, so it would be operational during the transition period.

2.	DEC provides the service `sendDocument`, which the institution that has created the DHX capability can use to forward the document to an institution that has not yet established the DHX capability. The forwarding is performed by DEC.

3.	In case a document which has been addressed to an institution that has established the DHX capability is received by DEC, DEC will attempt to immediately forward it.

4.	DEC will be switched off when all institutions have been proven to established the DHX protocol capability (when the institution has received and sent at least one document). This will be established by sending corresponding DHX check queries from the DMS of RIA.

#### References

[AÜK] Government Regulation “Common Principles of Administrative and Records Management Procedures”, https://www.riigiteataja.ee/akt/130122011062?leiaKehtiv.

[DEC] Document Exchange Centre [DEC]. Information System Authority. https://www.ria.ee/dokumendivahetus.

[DEC maintenance procedure] Document Exchange Centre Maintenance Procedure. Information System Authority. https://www.ria.ee/public/dvk_kord.pdf.

[DEC specification] Document Exchange Centre (DEC). Interface specification 1.6.0. https://svn.eesti.ee/projektid/dvk/doc/dvk_spetsifikatsioon_1.6.0.odt.

[DH metadata] Records Management Metadata. List 3.0. The Ministry of Economic Affairs and Communication https://www.mkm.ee/sites/default/files/dokumendihalduse_metaandmed.pdf.

[EXP] Exponential backoff. https://en.wikipedia.org/wiki/Exponential_backoff.

[Capsule] List of digital data exchange metadata 2.1. Information System Authority. https://riha.eesti.ee/riha/main/xml/elektroonilise_andmevahetuse_metaandmete_loend/1.

[PR-GCONF] X-Road Protocol for Downloading Configuration

[PR-META] X-Road Service Metadata Protocol.

[RIA-PP] Protocol Specification Best Practice. Information System Authority. 2015

[X-Road] Data Exchange Layer X-Road, https://www.ria.ee/x-tee/.

