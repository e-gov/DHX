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
1.	Operaator saadab E-arve DVK-sse teenusega `sendDocuments.v1`
2.	E-arve saatja määratleb `sendDcouments.v1` päringu sisendis `<kaust>` parameetri väärtuseks `/ARVED`
```
<SOAP-ENV:Body>
  <dhl:sendDocuments>
    <keha>
      <dokumendid href="cid:b8fdc418df27ba3095a2d21b7be6d802"/>
      <kaust>/ARVED</kaust>
    </keha>
  </dhl:sendDocuments>
</SOAP-ENV:Body>
```
3.	DVK Kapsel saadetakse `sendDcouments.v1` päringus manusena. Operaatorid kasutavad e-arvete korral 1.0 kapsli veriooni. 
4.	DVK Kapsel sisaldab `<transport>` elemendis üldjuhul kolme parameetrit `<saatja>`, `<saaja>` ja `<vahendaja>`
5.	DVK Kapsel sisaldab `<metaxml>` blokis dokumendi liigi elementi `<rkel:Type>arve</rkel:Type>` (uues kapsli 2.1 versioonis vastab sellele `<RecordType>arve</RecordType>`)

## 2 E-arvete edastamine DHX protokolli kaudu (TO BE)

## 3 Üleminek

## 1 Üleminek



1.2 Ülemineku ettevalmistusi on tehtud 2015. aastast. Praeguseks on välja töötatud ja kinnitatud protokoll DHX (https://e-gov.github.io/DHX/). DHX saab universaalseks, turvaliseks elektrooniliste dokumentide vastuvõtmise ja saatmise kanaliks. Prognoosime, et valdav enamus asutusi võtab DHX-i kasutusele, eelkõige dokumendihaldussüsteemides (DHS). (DHX-i võib kasutada ka muudes dokumente vahetavates süsteemides). Protokolli rakendamist hõlbustavad tarkvarakomponendid (DHX adapter) valmivad 2016. a lõpuks. Koostatakse ja avaldatakse üleminekukava ja juhised (veebruar 2017. a).

1.3 Üleminek algab praegu veel kindlaks määramata kuupäeval, eeldatavalt 2017. a aprillis ja kestab 2018. a lõpuni.

1.4 Üleminekuperioodil tagab DVK:
  - vana, "DVK protokolliga" sissetulnud e-arve edastamise DHX-i võimekuse loonud asutusele, vastavalt DHX protokollile. DHX-i võimekuse loonud asutusele edastab DVK e-arve dokumendivahetuse kapslisse v2.1 pakendatult - sest uuema  kapslistandardi versiooni kasutamist nõuab DHX protokoll (vt [DHX, 5.6 Kapsli kasutamine](https://e-gov.github.io/DHX/#56-kapsli-kasutamine)).
  - DHX protokolliga sissetulnud e-arve edastamise asutusele, kes ei ole veel DHX-le üle läinud.

## 2  e-arve edastamine DHX protokolliga

2.1 DHX-i võib edukalt kasutada e-arvete edastamiseks. Prognoosime, et paljud asutused, aga ka e-arve edastusteenuse osutajad (nn „operaatorid“) soovivad DHX-i kasutada e-arvete edastamiseks.

2.2 DHX-i kasutamisel tuleb e-arve käsitada dokumendina avaliku sektori dokumendihalduse tähenduses. Vt [DHX, 3 Mõisted ja lühendid](https://e-gov.github.io/DHX/#3-m%C3%B5isted-ja-l%C3%BChendid).

2.3 Dokumendi edastamisel DHX-i protokolli kohaselt tuleb dokument asetada avaliku sektori metandmete kapslisse. Vt [DHX, 5.6 Kapsli kasutamine](https://e-gov.github.io/DHX/#56-kapsli-kasutamine). Arvestada tuleb, et toetatud on kapsli versioon 2.1 (mitte 1.0).

2.4 

## 3 DVK kaudu e-arvete saatja toimingud

## 4 DVK kaudu e-arvete saaja toimingud 





## 4 Tõlkimine uue ja vana protokolli vahel

_Märkus. Käesolev jaotis puudutab ainult neid ettevõtteid ja asutusi, kes kasutavad e-arvete edastamiseks DVK-d._

__Lähteolukord - oktoober 2016__ E-arve saadetakse DVK-sse ja sealt edasi asutuse DHS-i DVK liidese kaudu (joonisel DVK). DVK-s registreeritud asutused ja operaatorid on DVK kliendid. DVK kaudu saadavad arveid Fitek ja Omniva (operaatorid) ja ka Riigi Kinnisvara AS. Joonis 1:
```
                e-arve                  e-arve
  Operaator ----------------> DVK ----------------> Asutus 1
                  (DVK)         \        (DVK)
                                 \      e-arve
                                  -----------------> Asutus 2
                                           (DVK)                   
```
__Üleminekuperiood__ – asutus on DHX-le üle läinud. Üleminekuperioodil loovad asutused oma dokumente vahetavates süsteemides DHX-i võimekuse. Joonis 2 kujutab olukorda, kus AS2 on DHX-i võimekuse juba loonud. Üleminekuperioodil tegutseb DVK DHX-i vahendajana ja ühtlasi tõlgina uue ja vana protokolli (DHX-i ja DVK liidese) vahel. See tähendab, et operaatori saadetud e-arve saadab DVK asutusele AS2 edasi, nüüd juba DHX protokolli kaudu. Asutusele AS2, kes ei ole üle läinud, edastatakse e-arve endisel viisil. Joonis 2:
```
               e-arve                  e-arve
  Oeraator ----------------> DVK ----------------> AS1
                (DVK)          \        (DVK)
                                \        e-arve
                                 -----------------> AS2
                                        (DHX)                   
```

__Üleminekuperiood__ – operaator on DHX-le üle läinud. Joonisel 3 on kujutatud olukorda, kus seni DVK-d kasutanud operaator OP on loonud DHX-i võimekuse. e-arve saadetakse nüüd vastavalt DHX protokollile: adressaadil AS2 on DHX-i võimekus – operaator saadab talle e-arve otse; adressaadil AS1 ei ole veel DHX-i võimekust – operaator saadab e-arve DVK kaudu. Joonistelt 2 ja 3 on näha, et DVK tõlgib üleminekuperioodil uue ja vana protokolli mõlemas suunas. Joonis 3:
```
         e-arve                  e-arve
  OP ----------------> DVK ----------------> AS1
    \     (DHX)                   (DVK)
     \              e-arve
      \------------------------------------> AS2
                    (DHX)                   
```
__Pärast ülemineku lõppu__ DVK on tegevuse lõpetanud. Operaator saadab arveid asutusele AS2 otse. Mis sai asutusest AS1? Ka tema võis oma arveliikluse DHX-le üle viia; võib-olla aga leppis operaatoriga kokku muu kanali kasutamises. Joonis 4:
```
  OP 
     \   
      \            e-arve         
       -----------------------------------> AS2   
                   (DHX)
```

## 5 DVK-d mittekasutava operaatori tegevuskava

- Operaator peaks uurima ja hindama, kas tema avaliku sektori kliendid, kes DHS-des niikuinii DHX-i rakendama hakkavad, sooviksid ka e-arvete liiklust DHX-i abil korraldada.
- Kui teenuse osapooled (operaator ja klient) peavad asjakohaseks DHX-i rakendada, siis tuleb mõlemal oma süsteemis teostada DHX-i võimekuse loomiseks vajalikud arendustööd.

## 6 Viited

[Dokumendivahetusprotokoll DHX](https://e-gov.github.io/DHX/)

Riigi Infosüsteemi Amet. [E-arved ja DVK](https://www.ria.ee/ee/e-arved.html)
