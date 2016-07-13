##Kapseldamismudel

_ülevaade sellest, mis mille sees käib_

#### Sisukord

[HTTP sõnum (HTTP message)](Mis%20mille%20sees%20k%C3%A4ib.md#http-s%C3%B5num-http-message) | [interneti sõnumivorming (Internet Message Format)](Mis%20mille%20sees%20k%C3%A4ib.md#interneti-s%C3%B5numivorming-internet-message-format) | [SOAP sõnum (SOAP messsage)](Mis%20mille%20sees%20k%C3%A4ib.md#soap-s%C3%B5num-soap-messsage) | [X-tee sõnum (X-Road message)](Mis%20mille%20sees%20k%C3%A4ib.md#x-tee-s%C3%B5num-x-road-message) | [Kapslis dokument](Mis%20mille%20sees%20k%C3%A4ib.md#kapslis-dokument) | [Elektroonilise andmevahetuse metaandmete loend](Mis%20mille%20sees%20k%C3%A4ib.md#elektroonilise-andmevahetuse-metaandmete-loend)

#### HTTP sõnum (_HTTP message_)
- võib olla:
  - __päring(sõnum)__, _request (message)_
  - __vastus(sõnum)__, _response (message)_
- edastuse osapooled:
  - __klient__ (HTTP), _client_
  - __server__ (HTTP), _server_
- [RFC 2616 HTTP/1.1](https://tools.ietf.org/html/rfc2616) jaotis 4.1
- olemas laiendamisraamistik, ebaselge, kuidas läbi löönud [RFC 2774 An HTTP Extension Framework](https://www.ietf.org/rfc/rfc2774.txt)

- HTTP tugineb e-posti e nn interneti sõnumivormingule (_Internet Message Format_)
 
#### interneti sõnumivorming (_Internet Message Format_)
- [RFC 2822 Internet Message Format](https://tools.ietf.org/html/rfc2822) (2001)
  - vanemates standardites nimetatud ka RFC 822 sõnumivorminguks 
  - __ümbrik__ (_envelope_) ja __sisu__ (_contents_) 
  - “messages are viewed as having an envelope and contents.  The envelope contains whatever information is needed to accomplish transmission and delivery.”
  - __päis__ (_header_) - koosneb __päiseväljadest__ (_header fields_) ja __keha__ (_body_)
  - “A message consists of header fields (collectively called "the header of the message") followed, optionally, by a body.”
  - ümbriku ja päise erinevuse kohta vt [siit](http://stackoverflow.com/questions/1750194/why-does-email-need-an-envelope-and-what-does-the-envelope-mean)
- kasutatakse e-posti transpordiprotokollis [RFC 2821 Simple Mail Transfer Protocol (SMTP)](https://tools.ietf.org/html/rfc2821#section-2.3) aga ka mujal 

#### laiendatud, mitmeosaline sõnumivorming (MIME)
- [RFC 2045 Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies](https://www.ietf.org/rfc/rfc2045.txt) ja seonduvad
  - vt [ametlikku internetistandardite nimistut](https://www.rfc-editor.org/standards) 
- määratleb mehhanismid mittetekstilise ja mitmeosalise (_multi-part_) teabe edastamiseks RFC 822 sõnumites
- nn MIME päiseväljad:
  - MIME päisevälju kasutatakse nii RFC 822 sõnumi päises kui ka mitmeosalise konstruktsiooni kehas (_body part_) 
  - `MIME-Version` päiseväli - kinnitab, et sõnum on koostatud kooskõlas RFC 2045 standardiga.
  - `Content-Type` päiseväli - kirjeldab kehas sisalduvat teavet
    - selle välja väärtust nimetatakse meedia tüübiks (_media type_)
      - "private values (starting with "X-") may be defined bilaterally between two cooperating agents without
        outside registration or standardization. Such values cannot be registered or standardized."
      - meediatüüpide registreerimine RFC 2048
  - `Content-Transfer-Encoding` päiseväli
  - `Content-ID` ja `Content-Description` päiseväljad
- __entity__ = __MIME-päiseväljad__ (_MIME-defined header fields_) + __sisu__ (_contents_)
- __body part__ - mitmeosalises olemis (_entity_) olev olem
- rekursiivne struktuur
- laiendamisvõimalus: päiseväljad, nõudeks, et peab algama `Content`
- vt [näide](https://msdn.microsoft.com/en-us/library/ms526560(v=exchg.10).aspx)
- mitmest ressursist koosnevad dokumendid (_multi-resource documents_)
  - [RFC 2387 The MIME Multipart/Related Content-type](https://tools.ietf.org/html/rfc2387)
  - juurressurss (_root resource_), alamressursid (_subsidiary resources_)
- viitamine teistele osadele, eriti juurosast (_root body part_): [RFC 2557 MIME Encapsulation of Aggregate Documents, such as HTML (MHTML)](http://www.ietf.org/rfc/rfc2557.txt)
  - `Content-Location` päiseväli

#### SOAP sõnum (_SOAP messsage_)
- SOAP sõnum on XML dokument, mis koosneb:
  - __SOAP ümbrik__ (_SOAP envelope_) (nõutav)
  - __SOAP päis__ (_SOAP header_) (valikuline)
  - __SOAP keha__ (_SOAP body_) (nõutav)
- SOAP ümbrik - "the top element of the XML document representing the message"
- SOAP päis - "a generic mechanism for adding features to a SOAP message in a decentralized manner without prior agreement between the communicating parties."
  - sisaldab __päiseelemente__ (_header entries_) 
- SOAP keha - "a container for mandatory information intended for the ultimate recipient of the message"
  - võib sisaldada erinevaid __kehaelemente__ (_body entries_)
  - kehas võib sisalduda __SOAP veablokk__ (_SOAP fault_)
  - "Typical uses of the Body element include marshalling RPC calls and error reporting."
- Laiendamise kohta vt protokolli jaotis 4.2 SOAp Header:
  - "SOAP provides a flexible mechanism for extending a message in a decentralized and modular way without prior knowledge between the communicating parties."
  - `mustUnderstand` atribuut
- Veablokk
  - "used to carry error and/or status information within a SOAP message"
  - __faultcode__ "to provide an algorithmic mechanism for identifying the fault"
  - __faultstring__ "to provide a human readable explanation of the fault"
  - __detail__ "for carrying application specific error information related to the Body element"
    - "The absence of the detail element in the Fault element indicates that the fault is not related to processing of the Body element. This can be used to distinguish whether the Body element was processed or not in case of a fault situation."
    - "The default SOAP faultcode values are defined in an extensible manner that allows for new SOAP faultcode values to be defined". Vt standardi jaotis 4.4.1 SOAP Fault Codes.

- Simple Object Access Protocol (SOAP) 1.1,
  - http://www.w3.org/TR/2000/NOTE-SOAP-20000508/
  - https://www.w3.org/TR/soap/
  - http://www.tutorialspoint.com/soap/soap_quick_guide.htm
  - [SOAP Version 1.2 Usage Scenarios](https://www.w3.org/TR/xmlp-scenarios/)
- protokollina sisaldab kolme asja:
  - ümbrik - kui raamistik sõnumite sisu ja töötlemise määratlemiseks
  - kodeerimisreeglid
  - protseduuride kaugväljakutsete (RPC) kokkulepe (_convention_)
- kasutatav kombineeritult teiste protokollidega, eelkõige HTTP-ga 
  - standardne alus- e ülekandeprotokoll on HTTP

- SOAP sõnumil võivad olla __manused__ (_attachments_)
  - manused edastatakse MIME mitmeosalise sõnumi (_multipart_) mehhanismi abil
  - _SOAP sõnumipakk_ (_SOAP message package_) koosneb SOAP sõnumist ja võimalikest manustest; manused ei pea olema XML vormingus
  - SOAP sõnumipakk koostatakse `Multipart/Related` meediatüübi abil 
  - [SOAP Messages with Attachments](https://www.w3.org/TR/SOAP-attachments)
  - vt ka [https://www.w3.org/TR/xmlp-scenarios/#S19](https://www.w3.org/TR/xmlp-scenarios/#S19)

#### X-tee sõnum (_X-Road message_)
- määratletud kahe protokolliga:
  - [X-tee sõnumiprotokoll](http://x-road.eu/docs/x-road_message_protocol_v4.0.pdf) (X-Road Message Protocol)
  - [X-tee sõnumitranspordi protokoll](http://x-road.eu/docs/x-road_message_transport_protocol.pdf) (X-Road Message Transport Protocol)
- SOAP 1.1 protokolli profiil
- edastuse osapooled:
  - __X-tee teenuse klient__, _service client_
  - __X-tee teenuse osutaja__, _service provider_
- kaht liiki:
  - __päring(sõnum)__, _request (message)_
  - __vastus(sõnum)__, _response (message)_
  - kuna X-tee on SOAP profiil ja SOAP transpordikihiks on HTTP, siis on üksüheselt seotud HTTP päringu ja vastusega
- struktuur:
  - __päis__ (_header_)
    - X-Road message headers = additional SOAP headers used by the X-Road
      - nt `id`, X-tee sõnumi unikaalne identifikaator. 
        - "id - string - M(andatory) - Unique identifier for this message. The recommended form of message ID is UUID. --X-Road Message Protocol v4.0"
  - __keha__ (_body_)
    - "MUST use Document/Literal-Wrapped SOAP encoding convention" 
  - __manus__ (_attachment_)
    - MIME multipart standardil 

#### Kapslis dokument
- "DVK dokument"
- "DVK konteiner" e "kapsel"
- DVK ja DHS vahel ühe teenusekasutusega (päring-vastus interaktsiooniga) edastatav dokument
- XML vormingus
- dokument võib koosneda mitmest failist
- DVK spetsifikatsioonis nimetatakse dokumendi faile kohati samuti dokumentideks
- edastatakse X-tee SOAP ümbrikus (_X-Road SOAP envelope_)
  - sisaldab gzip-ga kokkupakitud, seejärel base64 kodeeritud "DVK dokumenti"
- asetseb "DVK konteineris"
- kirjeldatud [DVK spetsifikatsioonis](https://github.com/e-gov/DVK/tree/master/doc)
  - jaotis "Üldskeem [..]" lk 7-20
- seotud (lõdvalt) "Elektroonilise andmevahetuse metaandmete loendiga"
- kasutusel on kaks versiooni:
  - versioon 2
    - XML skeem: [http://www.riik.ee/schemas/dhl/dhl.2010.r1.xsd](http://www.riik.ee/schemas/dhl/dhl.2010.r1.xsd)
    - öeldakse, et <failid> formaadis
    - sisaldab:
      - üks või rohkem faili, zip-tud ja Base64 kodeeritud
      - lisaks failide metaandmed
  - versioon 1 (seotud Elektroonilise andmevahetuse metaandmete loendiga v1
    - XML skeem [http://www.riik.ee/schemas/dhl/dhl.xsd](http://www.riik.ee/schemas/dhl/dhl.xsd)
    - DigiDoc 1.3 vormingus
      - [teave DigiDoc vormingute kohta](http://www.id.ee/?id=36161)
  
#### Elektroonilise andmevahetuse metaandmete loend
 - nn semantiline standard, ei anna konkreetse masinloetava esituse süntaksit
 - vt DVK konteiner e "kapsel"
 - kaks versiooni:
   - 2.1
     - [ametlik publikatsioon RIHAs](https://riha.eesti.ee/riha/main/xml/elektroonilise_andmevahetuse_metaandmete_loend/1)
   - 1.0 - [ametlik publikatsioon RIHAs](https://riha.eesti.ee/riha/main/xml/elektroonilise_andmevahetuse_metaandmete_loend)
     - mõned pole veel 2.1-le üle läinud (nt Riigi Teataja)
   - DVK transleerib vanast uude




  
