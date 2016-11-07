_kavand_ (_Lahtiütlus. Käesolev dokument on arenduses olev töödokument. Dokument ei ole kinnitatud ega ametlikult publitseeritud. Dokument täieneb, eelkõige tehniliste detailide osas._) Arvamused dokumendi kohta palume saata: Riigi Infosüsteemi Amet, Eneli Järve, 663 0278, eneli.jarve@ria.ee

# E-arved DVK-s üleminekuperioodil

v 0.2 07.11.2016

## Sisukord

- [1 Ülevaade](#1-Ülevaade)
- [2 E-arvete edastamine DVK kaudu seni (AS IS)](#1-e-arvete-edastamine-dvk-kaudu-seni-as-is)
- [3 E-arvete edastamine DHX protokolli kaudu (TO BE)](#2-e-arvete-edastamine-dhx-protokolli-kaudu-to-be)
- [3.1 Kapsli v2.1 kasutamine E-arvete saatmiseks](#kapsli-v21-kasutamine-e-arvete-saatmiseks)
- [4 Üleminek](#3-Üleminek)
- [6 Viited](#6-viited)

## 1 Ülevaade

Käesolev dokument on suunatud DVK kaudu e-arveid vahetavatele asutustele ja ettevõtetele: e-arvete saatjatele, operaatoritele, saajatele. Selgitame, mida tuleb erinevatel osapooltel teha seoses avaliku sektori üleminekuga hajusale dokumendivahetusele. Ülemineku peamised osad on: a) dokumendivahetusprotokolli DHX kasutuselevõtmine dokumente vahetavates süsteemides; b)  dokumendivahetuskeskuse (DVK) sulgemine.

## 2 E-arvete edastamine DVK kaudu seni (AS IS)

Operaatorid saadavad praegu DVK kaudu e-arveid kasutades Kapsli 1.0 versiooni.

- Operaator saadab E-arve DVK-sse teenusega `sendDocuments.v1`
- E-arve saatja määratleb `sendDcouments.v1` päringu sisendis `<kaust>` parameetri väärtuseks `/ARVED`

```xml
<SOAP-ENV:Body>
  <dhl:sendDocuments>
    <keha>
      <dokumendid href="cid:b8fdc418df27ba3095a2d21b7be6d802"/>
      <kaust>/ARVED</kaust>
    </keha>
  </dhl:sendDocuments>
</SOAP-ENV:Body>
```

- DVK Kapsel saadetakse `sendDcouments.v1` päringus manusena. Operaatorid kasutavad e-arvete korral 1.0 kapsli veriooni. 
- DVK Kapsel sisaldab `<transport>` elemendis üldjuhul kolme parameetrit `<saatja>`, `<saaja>` ja `<vahendaja>`
- DVK Kapsel sisaldab `<metaxml>` blokis dokumendi liigi elementi `<rkel:Type>arve</rkel:Type>` (uues kapsli 2.1 versioonis vastab sellele `<RecordType>arve</RecordType>`).

## 3 E-arvete edastamine DHX protokolli kaudu (TO BE)

### 3.1 Üldpõhimõtted

3.1 DHX-i kasutamisel tuleb e-arvet käsitada dokumendina avaliku sektori dokumendihalduse tähenduses. Vt [DHX, 3 Mõisted ja lühendid](https://e-gov.github.io/DHX/#3-m%C3%B5isted-ja-l%C3%BChendid).

2.2 Dokumendi edastamisel DHX-i protokolli kohaselt tuleb dokument asetada avaliku sektori metaandmete kapslisse. Vt [DHX, 5.6 Kapsli kasutamine](https://e-gov.github.io/DHX/#56-kapsli-kasutamine). Arvestada tuleb, et toetatud on kapsli versioon 2.1 (mitte 1.0).

2.3 DHX protokoll ei kirjuta ette, kuidas e-arvet tehniliselt saata, jättes selle e-arvete saatjate ja saajate omavahelise kokkuleppe teemaks. Koosvõime tagamiseks soovitame siiski (kui ei otsustata kokku leppida teisiti) järgida järgnevat:
- Kui DHX-iga liitunud asutus soovib saata E-arvet, siis peab ta juba dokumendi saatmisel väärtustama Kapsli välja  `DecMetadata/DecFolder` väärtuseks `/ARVED`.
- Seejärel vastuvõttev DHX süsteem peab dokumendi vastuvõtmisel suutma vajadusel ise Kapsli `DecMetadata/DecFolder` väärtuse alusel otsustada, kuhu infosüsteemi dokument suunata ( kas finantssüsteemi või DHS-i). Uue DHX Adapteri variant C „SOAP server“ kasutamine võib hõlbustada seda suunamist, sest sel juhul käivad eraldi infosüsteemid (finantssüsteem ja DHS) DHX adapteri käest dokumente küsimas `receiveDocuments` teenusega, andes endist viisi ette `<kaust>` parameetri.

### 3.2 Kapsli v2.1 kasutamine E-arvete saatmiseks DHX protokollis

Uue 2.1 ja vanade 1.0 Kapsli väljade vastavus ja võrdlus on toodud Kapsli kirjelduses RIHA-s.

Nüansid üleminekul:
- Kapsli 1.0 versiooni väljale `<dhl:vahendaja>` vastavat vastet uues Kapsli 2.1 versioonis ei leidu. Seda välja ei saa operaatorid arve edastamisel enam kasutada.
- E-arve operaator peab Kapsli versioonis 2.1 dokumendi saatjaks (`Transport/DecSender/OrganisationCode`) märkima iseenda (mitte ettevõtte, kelle arveid ta vahendab). Vaata DHX protokolli nõue [8.6 „Saatja kindlakstegemine“](https://e-gov.github.io/DHX/#86-saatja-kindlakstegemine):
- DHX `sendDocument` teenusega arvet saates tuleb määrata Kausta väärtus `/ARVED` Kapsli XML elemendis `DecMetadata/DecFolder`. Sest uue DHX `sendDocument` teenuses puudub vastav päringu parameeter, nagu vana DVK korral oli `<kaust>`.

Järgnevalt on toodud näide, kuidas kasutada Kapsli 2.1 versiooni E-arvete saatmiseks.
```xml
<?xml version="1.0" encoding="utf-8"?>
<DecContainer xmlns="http://www.riik.ee/schemas/deccontainer/vers_2_1/">
  <Transport>
    <DecSender><OrganisationCode>10328799</OrganisationCode></DecSender>
    <DecRecipient><OrganisationCode>90006399</OrganisationCode></DecRecipient>
  </Transport>
  <RecordCreator>
    <Person>
      <Name>Lauri Tammemäe</Name><GivenName>Lauri</GivenName>
      <Surname>Tammemäe</Surname>
      <PersonalIdCode>EE38806190294</PersonalIdCode><Residency>EE</Residency>
    </Person>
    <ContactData>
      <Phone>3726630276</Phone><Email>lauri.tammemae@ria.ee</Email>
    </ContactData>
  </RecordCreator>
  <Recipient>
    <Organisation>
      <Name>sihtasutus Põhja-Eesti Regionaalhaigla</Name>
      <OrganisationCode>90006399</OrganisationCode>
      <Residency>EE</Residency>
    </Organisation>
  </Recipient>
  <RecordMetadata>
    <RecordGuid>25892e17-80f6-415f-9c65-7395632f0234</RecordGuid>
    <RecordType>arve</RecordType>
    <RecordOriginalIdentifier>213465</RecordOriginalIdentifier>
    <RecordDateRegistered>2016-11-11T19:18:03</RecordDateRegistered>
    <RecordTitle>e-arve 163350</RecordTitle>
    <RecordLanguage>EE</RecordLanguage>
  </RecordMetadata>
  <Access>
    <AccessConditionsCode>AK</AccessConditionsCode>
  </Access>
  <File>
    <FileGuid>25892e17-80f6-415f-9c65-7395632f0001</FileGuid>
    <RecordMainComponent>1</RecordMainComponent>
    <FileName>163350_eInvoice.xml</FileName>
    <MimeType>text/xml</MimeType>
    <FileSize>6232</FileSize>
    <ZipBase64Content>...</ZipBase64Content>
  </File>
  <File>
    <FileGuid>25892e17-80f6-415f-9c65-7395632f0002</FileGuid>
    <RecordMainComponent>1</RecordMainComponent>
    <FileName>163350.pdf</FileName>
    <MimeType>application/pdf</MimeType>
    <FileSize>211543</FileSize>
    <ZipBase64Content>...</ZipBase64Content>
  </File>
  <RecordTypeSpecificMetadata />
  <DecMetadata>
    <DecId>12345</DecId>
    <DecFolder>/ARVED</DecFolder>
    <DecReceiptDate>2016-11-11T19:20:42</DecReceiptDate>
  </DecMetadata>
</DecContainer>
```

## 4 Üleminek

Üleminekuperioodil tagab DVK:
  - vana, "DVK protokolliga" sissetulnud e-arve edastamise DHX-i võimekuse loonud asutusele, vastavalt DHX protokollile. DHX-i võimekuse loonud asutusele edastab DVK e-arve dokumendivahetuse kapslisse v2.1 pakendatult - sest uuema  kapslistandardi versiooni kasutamist nõuab DHX protokoll (vt [DHX, 5.6 Kapsli kasutamine](https://e-gov.github.io/DHX/#56-kapsli-kasutamine)).
  - DHX protokolliga sissetulnud e-arve edastamise asutusele, kes ei ole veel DHX-le üle läinud.

Sisuliselt toimib DVK tõlgina uue ja vana protokolli vahel. Alljärgnevad neli skeemi selgitavad tõlkimise protsessi.

__Lähteolukord - oktoober 2016__ E-arve saadetakse DVK-sse ja sealt edasi asutuse DHS-i DVK liidese kaudu (joonisel DVK). DVK-s registreeritud asutused ja operaatorid on DVK kliendid. DVK kaudu saadavad arveid Fitek ja Omniva (operaatorid) ja ka Riigi Kinnisvara AS. Joonis 1:
```
                e-arve                  e-arve
  Operaator ----------------> DVK ----------------> Asutus 1
                  (DVK)         \        (DVK)
                                 \      e-arve
                                  -----------------> Asutus 2
                                           (DVK)                   
```

Sama korraldus jääb kehtima ka üleminekuperioodil, nendel juhtudel, kus saatja ja saaja kumbki ei ole veel DHX-le üle läinud:
- E-arve  saadetakse vanaviisi, määrates `Type/RecodType` väärtuseks `arve` ja DVK `sendDocuments` teenuse sisendis `<kaust>/ARVED</kaust>`.
- Vastuvõtja loeb e-arveid DVK-st vanamoodi, andes `receiveDocuments` teenuse sisendis ette parameetri `<kaust>/ARVED</kaust>`.
- Operaatorid ja vastuvõtjad võivad endiselt kasutada vana 1.0 kapsli versiooni (kui nad mõlemad on endiselt DVK kasutajad).

__Asutus on DHX-le üle läinud__ Üleminekuperioodil loovad asutused oma dokumente vahetavates süsteemides DHX-i võimekuse. Joonis 2 kujutab olukorda, kus AS2 on DHX-i võimekuse juba loonud. Üleminekuperioodil tegutseb DVK DHX-i vahendajana ja ühtlasi tõlgina uue ja vana protokolli (DHX-i ja DVK liidese) vahel. See tähendab, et operaatori saadetud e-arve saadab DVK asutusele AS2 edasi, nüüd juba DHX protokolli kaudu. Asutusele AS2, kes ei ole üle läinud, edastatakse e-arve endisel viisil. Joonis 2:
```
               e-arve                  e-arve
  Oeraator ----------------> DVK ----------------> AS1
                (DVK)          \        (DVK)
                                \        e-arve
                                 -----------------> AS2
                                        (DHX)                   
```

- DHX vastuvõtjale edastatakse ainult sellised e-arved, mis on saadetud kapsli 2.1 versiooniga.
- Kui Operaator püüab DVK-s saata DHX adressaadile vana 1.0 versiooni Kapsli, siis DVK annab `sendDocuments.v1-v3` teenuse väljakutsel koheselt vea `DHX adressaat ei toeta vana Kapsli 1.0 vesiooni`. Operaator ei saa igale suvalisele adressaadile (DHXile üle läinud adresaatidele) enam e-arveid saata, kuni ta ise ei ole üle läinud 2.1 kapsli versioonile.
- DVK edastab talle saabunud E-arve dokumendi DHX vastuvõtja asutusele, väärtustades 2.1 Kapsli sees täiendavalt  välja `DecMetadata/DecFolder` väärtuseks `/ARVED`.
- Seejärel DHX süsteem peab dokumendi vastuvõtmisel (`sendDocument` teenusega) ise suutma Kapsli `DecMetadata/DecFolder` väärtuse alusel otsustada, kuhu infosüsteemi dokument suunata (kas finantssüsteemi või DHS-i). Uue DHX Adapteri variant C „SOAP server“ kasutamine võib hõlbustada seda suunamist, sest sel juhul käivad eraldi infosüsteemid (finantssüsteem ja DHS) DHX adapteri käest dokumente küsimas `receiveDocuments` teenusega, andes endist viisi ette `<kaust>` parameetri.

__Operaator on DHX-le üle läinud__ Joonisel 3 on kujutatud olukorda, kus seni DVK-d kasutanud operaator on loonud DHX-i võimekuse. e-arve saadetakse nüüd vastavalt DHX protokollile: adressaadil AS2 on DHX-i võimekus – operaator saadab talle e-arve otse; adressaadil AS1 ei ole veel DHX-i võimekust – operaator saadab e-arve DVK kaudu. Joonistelt 2 ja 3 on näha, et DVK tõlgib üleminekuperioodil uue ja vana protokolli mõlemas suunas. Joonis 3:
```
         e-arve                  e-arve
  OP ----------------> DVK ----------------> AS1
    \     (DHX)                   (DVK)
     \              e-arve
      \------------------------------------> AS2
                    (DHX)                   
```

- DHX-ile üle läinud operaator peab juba e-arve saatmisel väärtustama Kapsli välja `DecMetadata/DecFolder` väärtuseks `/ARVED`.
- Saatmisel toetatud kapsli versioon on 2.1.
- `DecFolder` väli salvestatakse maha DVK-sse. DVK vastuvõtja, kes käib dokumente küsimas `receiveDocuments` sisendiga `<kaust>/ARVED</kaust>`, saab kätte DHX saatjalt saadetud dokumendi.
- Kui DHX saatja jätab `DecFolder` välja väärtustamata (määrab ainult `<RecordType>arve</RecordType`), siis e-arve ei pruugi laekuda DVK vastuvõtja finantssüsteemi, vaid laekub vastuvõtja DHS süsteemi.

__Nii operaator kui ka saaja on DHX-le üle läinud__ DVK on tegevuse lõpetanud. Operaator saadab arveid asutusele AS2 otse. Mis sai asutusest AS1? Ka tema võis oma arveliikluse DHX-le üle viia; võib-olla aga leppis operaatoriga kokku muu kanali kasutamises. Joonis 4:
```
  OP 
     \   
      \            e-arve         
       -----------------------------------> AS2   
                   (DHX)
```

## 6 Viited

[Dokumendivahetusprotokoll DHX](https://e-gov.github.io/DHX/)

Riigi Infosüsteemi Amet. [E-arved ja DVK](https://www.ria.ee/ee/e-arved.html)
