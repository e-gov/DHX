##Mis mille sees käib

_ja mis mille otsas istub ja mis millega seotud on_

#### X-tee SOAP ümbrik (_envelope_)
- dokumendivahetuse kontekstis sisaldab gzip-ga kokkupakitud, seejärel base64 kodeeritud "DVK dokumenti"

#### DVK dokument
- DVK ja DHS vahel ühe teenusekasutusega (päring-vastus interaktsiooniga) edastatav dokument
- XML vormingus
- dokument võib koosneda mitmest failist
- DVK spetsifikatsioonis nimetatakse dokumendi faile kohati samuti dokumentideks
- edastatakse X-tee SOAP ümbrikus
- asetseb "DVK konteineris"

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



  
