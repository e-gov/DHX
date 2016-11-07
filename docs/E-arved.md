_kavand_ (_Lahtiütlus. Käesolev dokument on arenduses olev töödokument. Dokument ei ole kinnitatud ega ametlikult publitseeritud. Dokument täieneb, eelkõige tehniliste detailide osas._) Arvamused dokumendi kohta palume saata: Riigi Infosüsteemi Amet, Eneli Järve, 663 0278, eneli.jarve@ria.ee

# E-arved DVK-s üleminekuperioodil

07.11.2016

## Sisukord

- [1 Üleminek](#1-uleminek)
- [2 e-arve edastamine DHX protokolliga](#2--e-arve-edastamine-dhx-protokolliga)
- [3 e-arved üleminekul DHX protokollile](#3--e-arved-%C3%BCleminekul-dhx-protokollile)
- [4 e-arveid DVK kaudu edastava operaatori tegevuskava](#4-e-arveid-dvk-kaudu-edastava-operaatori-tegevuskava)
- [5 DVK-d mittekasutava operaatori tegevuskava](#5-dvk-d-mittekasutava-operaatori-tegevuskava)
- [6 Viited](#6-viited)

## Ülevaade

Käesolev dokument on suunatud DVK kaudu e-arveid vahetavatele asutustele ja ettevõtetele: e-arvete saatjatele, operaatoritele, saajatele. Selgitame, mida tuleb erinevatel osapooltel teha seoses avaliku sektori üleminekuga hajusale dokumendivahetusele. Ülemineku peamised osad on: a) dokumendivahetusprotokolli DHX kasutuselevõtmine dokumente vahetavates süsteemides; b)  dokumendivahetuskeskuse (DVK) sulgemine.

## 1 E-arvete edastamine DVK kaudu seni (AS IS)

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

## 2 E-arvete edastamine DHX protokolli kaudu (TO BE)

2.1 DHX-i kasutamisel tuleb e-arvet käsitada dokumendina avaliku sektori dokumendihalduse tähenduses. Vt [DHX, 3 Mõisted ja lühendid](https://e-gov.github.io/DHX/#3-m%C3%B5isted-ja-l%C3%BChendid).

2.2 Dokumendi edastamisel DHX-i protokolli kohaselt tuleb dokument asetada avaliku sektori metaandmete kapslisse. Vt [DHX, 5.6 Kapsli kasutamine](https://e-gov.github.io/DHX/#56-kapsli-kasutamine). Arvestada tuleb, et toetatud on kapsli versioon 2.1 (mitte 1.0).

2.3 DHX protokoll ei kirjuta ette, kuidas e-arvet tehniliselt saata, jättes selle e-arvete saatjate ja saajate omavahelise kokkuleppe teemaks. Koosvõime tagamiseks soovitame siiski (kui ei otsustata kokku leppida teisiti) järgida järgnevat:
- Kui DHX-iga liitunud asutus soovib saata E-arvet, siis peab ta juba dokumendi saatmisel väärtustama Kapsli välja  `DecMetadata/DecFolder` väärtuseks `/ARVED`.
- Seejärel vastuvõttev DHX süsteem peab dokumendi vastuvõtmisel suutma vajadusel ise Kapsli `DecMetadata/DecFolder` väärtuse alusel otsustada, kuhu infosüsteemi dokument suunata ( kas finantssüsteemi või DHS-i). Uue DHX Adapteri variant C „SOAP server“ kasutamine võib hõlbustada seda suunamist, sest sel juhul käivad eraldi infosüsteemid (finantssüsteem ja DHS) DHX adapteri käest dokumente küsimas `receiveDocuments` teenusega, andes endist viisi ette `<kaust>` parameetri.

## 3 Üleminek

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
__Asutus on DHX-le üle läinud__ Üleminekuperioodil loovad asutused oma dokumente vahetavates süsteemides DHX-i võimekuse. Joonis 2 kujutab olukorda, kus AS2 on DHX-i võimekuse juba loonud. Üleminekuperioodil tegutseb DVK DHX-i vahendajana ja ühtlasi tõlgina uue ja vana protokolli (DHX-i ja DVK liidese) vahel. See tähendab, et operaatori saadetud e-arve saadab DVK asutusele AS2 edasi, nüüd juba DHX protokolli kaudu. Asutusele AS2, kes ei ole üle läinud, edastatakse e-arve endisel viisil. Joonis 2:
```
               e-arve                  e-arve
  Oeraator ----------------> DVK ----------------> AS1
                (DVK)          \        (DVK)
                                \        e-arve
                                 -----------------> AS2
                                        (DHX)                   
```

__Operaator on DHX-le üle läinud__ Joonisel 3 on kujutatud olukorda, kus seni DVK-d kasutanud operaator OP on loonud DHX-i võimekuse. e-arve saadetakse nüüd vastavalt DHX protokollile: adressaadil AS2 on DHX-i võimekus – operaator saadab talle e-arve otse; adressaadil AS1 ei ole veel DHX-i võimekust – operaator saadab e-arve DVK kaudu. Joonistelt 2 ja 3 on näha, et DVK tõlgib üleminekuperioodil uue ja vana protokolli mõlemas suunas. Joonis 3:
```
         e-arve                  e-arve
  OP ----------------> DVK ----------------> AS1
    \     (DHX)                   (DVK)
     \              e-arve
      \------------------------------------> AS2
                    (DHX)                   
```
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
