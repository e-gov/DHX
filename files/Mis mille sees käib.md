##Mis mille sees käib

_ja mis mille otsas istub ja mis millega seotud on_

#### HTTP sõnum, _HTTP message_
- võib olla:
  - päring(sõnum), _request (message)_
  - vastus(sõnum), _response (message)_
- edastuse osapooled:
  - klient (HTTP), _client_
  - server (HTTP), _server_
- [RFC 2616 HTTP/1.1](https://tools.ietf.org/html/rfc2616) jaotis 4.1

#### SOAP sõnum, _SOAP messsage_
- koosneb:
  - ümbrik, _envelope_
  - päis, _header_
  - keha, _body_
  - veablokk, _fault_ (valikuline)
- Simple Object Access Protocol (SOAP) 1.1, http://www.w3.org/TR/2000/NOTE-SOAP-20000508/
- https://www.w3.org/TR/soap/
- http://www.tutorialspoint.com/soap/soap_quick_guide.htm 

#### X-tee sõnum, _X-Road message
- määratletud kahe protokolliga:
  - [X-tee sõnumiprotokoll](http://x-road.eu/docs/x-road_message_protocol_v4.0.pdf) (X-Road Message Protocol)
  - [X-tee sõnumitranspordi protokoll](http://x-road.eu/docs/x-road_message_transport_protocol.pdf) (X-Road Message Transport Protocol)
- a profile of the SOAP 1.1 protocol
- edastuse osapooled:
  - X-tee teenuse klient, _service client_
  - X-tee teenuse osutaja, _service provider_
- kaht liiki:
  - päring(sõnum), _request (message)_
  - vastus(sõnum), _response (message)_
  - kuna X-tee on SOAP profiil ja SOAP transpordikihiks on HTTP, siis on üksüheselt seotud HTTP päringu ja vastusega
- struktuur:
  - päis, _header_
    - X-Road message headers = additional SOAp headers used by the X-Road
      - nt ``id`, X-tee sõnumi unikaalne identifikaator. 
      ```
      id - string - M(andatory)  - Unique identifier for this message.
          The recommended form of message ID is UUID.
      -- X-Road Message Protocol v4.0
      ```
  - keha, _body_
    - MUST use Document/Literal-Wrapped SOAP encoding convention 
  - manus, _attachment_
    - MIME multipart standardil 

#### X-tee SOAP ümbrik (_envelope_)
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
- kasutusel on kas versiooni:
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




  
