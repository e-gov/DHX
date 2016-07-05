##Kapseldamismudel

_ülevaade sellest, mis mille sees käib_

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
  - __ümbrik__ (_envelope_) ja __sisu__ (_contents_) 
  - “messages are viewed as having an envelope and contents.  The envelope contains whatever information is needed to accomplish transmission and delivery.”
  - __päis__ (_header_) - koosneb __päiseväljadest__ (_header fields_) ja __keha__ (_body_)
  - “A message consists of header fields (collectively called "the header of the message") followed, optionally, by a body.”
  - ümbriku ja päise erinevuse kohta vt [siit](http://stackoverflow.com/questions/1750194/why-does-email-need-an-envelope-and-what-does-the-envelope-mean)
- kasutatakse e-posti transpordiprotokollis [RFC 2821 Simple Mail Transfer Protocol (SMTP)](https://tools.ietf.org/html/rfc2821#section-2.3) aga ka mujal 
- interneti sõnumivormingu laiendused
  - [RFC 2045 Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies](https://www.ietf.org/rfc/rfc2045.txt) ja seonduvad

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

- Simple Object Access Protocol (SOAP) 1.1, http://www.w3.org/TR/2000/NOTE-SOAP-20000508/
  - protokollina sisaldab kolme asja:
    - ümbrik - kui raamistik sõnumite sisu ja töötlemise määratlemiseks
    - kodeerimisreeglid
    - protseduuride kaugväljakutsete (RPC) kokkulepe (_convention_)
  - kasutatav kombineeritult teiste protokollidega, eelkõige HTTP-ga 
- https://www.w3.org/TR/soap/
- http://www.tutorialspoint.com/soap/soap_quick_guide.htm 

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
    - X-Road message headers = additional SOAp headers used by the X-Road
      - nt ``id`, X-tee sõnumi unikaalne identifikaator. 
      ```
      id - string - M(andatory)  - Unique identifier for this message.
          The recommended form of message ID is UUID.
      -- X-Road Message Protocol v4.0
      ```
  - __keha__ (_body_)
    - "MUST use Document/Literal-Wrapped SOAP encoding convention" 
  - __manus__ (_attachment_)
    - MIME multipart standardil 

#### X-tee SOAP ümbrik (_X-Road SOAP envelope_)
- dokumendivahetuse kontekstis sisaldab gzip-ga kokkupakitud, seejärel base64 kodeeritud "DVK dokumenti"

#### DVK dokument
- DVK ja DHS vahel ühe teenusekasutusega (päring-vastus interaktsiooniga) edastatav dokument
- XML vormingus
- dokument võib koosneda mitmest failist
- DVK spetsifikatsioonis nimetatakse dokumendi faile kohati samuti dokumentideks
- edastatakse X-tee SOAP ümbrikus
- asetseb "DVK konteineris"
- kirjeldatud [DVK spetsifikatsioonis](https://github.com/e-gov/DVK/tree/master/doc)

#### "DVK konteiner" e "kapsel"
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




  
