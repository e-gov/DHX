![](img/EL_struktuuri-_ja_investeerimisfondid_horisontaalne.jpg)

[EN](#en)

## Dokumendivahetusprotokoll DHX / Document exchange protocol DHX

![](docs/DHX.PNG)  ![](docs/X-ROAD.PNG)

__DHX on uus, X-tee v6 omadustele rajatud dokumendivahetusprotokoll, mis võimaldab Eesti avaliku sektori dokumendihaldussüsteemidel vahetada dokumente hajus- e detsentraliseeritud põhimõttel.__

Sisukord

- [1 Tooted ja teenused](#1-tooted-ja-teenused)
- [2 Protokolli rakendamine](#2-protokolli-rakendamine)
- [3 Protokolli arendamine](#3-protokolli-arendamine)
- [4 Projekt "Dokumendivahetustaristu hajusarhitektuurile üleviimise väljatöötamine"](#4-projekt-dokumendivahetustaristu-hajusarhitektuurile-üleviimise-väljatöötamine)

### 1 Tooted ja teenused

|     |   |
|-----|-------------|
| ![](img/book-open-variant.png) | __[Protokoll](https://e-gov.github.io/DHX)__ _kinnitatud, ametlik tekst_ |
| <img src="img/power-plug.png" alt="alt text" width="48" height="48"> | [DHX Adapter](https://github.com/e-gov/DHX-adapter) _tarkvarakomponendid DHX-i rakendajatele_   - <img src="img/widgets.png" alt="alt text" width="48" height="48"> sh tarkvarateegid |
| ![](img/ruler.png) | [Etalonteostus](https://github.com/e-gov/DHX-etalon) |
| ![](img/weather-windy.png) | Üleminekukava _tuleb_ |
| ![](img/auto-fix.png) | Rakendamise koordineerimine _tuleb_ ; teave: Eneli Järve, Riigi Infosüsteemi Amet, 663 0278, eneli.jarve@ria.ee |
| ![](img/format-align-justify.png) | DHX aadressiraamat _tuleb_ - [DHX aadressiraamat](docs/DHX-aadressiraamat.md) | _spetsifikatsioon_ |
| ![](img/checkbox-marked-circle-outline.png) | Sertifitseerimine _protokolli rakendajate sertifitseerimist ei ole kavandatud_ |
| ![](img/test-tube.png) | Testimisteenus. DHX-i rakendajad saavad testida, et on protokolli õigesti implementeerinud, [etalonteostuse](https://github.com/e-gov/DHX-etalon) abil. |
| ![](img/format-align-justify.png) | [Standardtestid](docs/Standardtestid.md) |

Protokolli saab kasutada [MIT litsentsi alusel](LICENCE.txt).

### 2 Protokolli rakendamine

DHX-i rakendaja peab otsustama, mis viisil ta DHX-i rakendab. Valida on mitme variandi vahel:

| # | DHX-i rakendusvariant | lühikirjeldus  |
|---|---------|---|
| 1 | DHX-i rakendamine otse (ilma vahendajata) | Vt allolevad alamvariandid. |
| 1A | adapteriteekide abil | DHS saab kasutada DHX Java teeke, mis arendatakse välja uue DHX adapteri loomise raames. DHX Java teegid sisaldavad funktsionaalsust dokumendi saatmiseks, vastuvõtmiseks ja aadressiraamatu koostamiseks. Saatmise klassid realiseerivad sisuliselt X-tee SOAP kliendi funktsionaalsuse, koos DHX hajusa saatmisalgoritmiga. Vastuvõtmise klassid realiseerivad  DHX SOAP teenuse ja saabunud dokumendi DHS-ile edastamise liidese. Vt [https://github.com/e-gov/DHX-adapter](https://github.com/e-gov/DHX-adapter). |
| 1B | DHX adapteriga (otsepöördusega adapteri andmebaasi) | Paigaldades DHX adapteri ja liidestades selle oma süsteemiga (DHS või muu) otsepöördusega (JDBC) adapteri andmebaasi poole. Vt [https://github.com/e-gov/DHX-adapter](https://github.com/e-gov/DHX-adapter). |
| 1C | DHX adapteriga (SOAP liides) | Paigaldades DHX adapteri ja liidestades selle oma süsteemiga SOAP liidese abil. Vt [https://github.com/e-gov/DHX-adapter](https://github.com/e-gov/DHX-adapter). | 
| 1D | teostades DHX protokolli ise | DHS arendaja võib ise DHX protokolli toetavad komponendid programmeerida, valides sobiva platvormi ja programmeerimiskeele. |
| 1E | DHX adapteriga (REST liides) | Paigaldades DHX adapteri ja liidestades selle oma süsteemiga REST liidese abil. Variant oli kaalumisel, __kuid ei ole praegu adapteri poolt toetatud__. Huvi korral võib vabavaralist DHX adapterit ise edasi arendada. |
| 2  | DHX-i rakendamine vahendaja kaudu | Vt [https://e-gov.github.io/DHX/#6-vahendamine](https://e-gov.github.io/DHX/#6-vahendamine). |

### 3 Protokolli arendamine
- [Foorum](https://github.com/e-gov/DHX/issues)
- [Osale arenduses](CONTRIBUTING.md)
- [Analüüs](https://github.com/e-gov/DHX/blob/master/files/Hajusa_dokumendivahetuse_andmevahetusprotokolli_DHX_anal%C3%BC%C3%BCs_1.2.pdf)
- Ettepanekud
  - 01 [Asünkroonne kättesaamiskinnitus](files/Ettepanek-01.md#as%C3%BCnkroonne-k%C3%A4ttesaamiskinnitus) TAGASI LÜKATUD
  - 02 [Mitut DHS-i toetav nimemuster](files/Ettepanek-02.md#mitut-dhs-i-toetav-nimemuster) SISSE VIIDUD v 1.0
  - 03 [Mitme aadressi käsitlus](files/Ettepanek-03.md) SISSE VIIDUD v 1.0.1
  - 04 [Mitme alamsüsteemi kasutamine](files/Ettepanek-04.md) SISSE VIIDUD v 1.0.2
  - 05 [Teenuse sendDocument spetsifikatsiooni täiendamine mittekohustusliku väljaga recipientSystem](files/Ettepanek-05.md) SISSE VIIDUD v 1.0.2
  - 06 [Muuta teenuse representationList laiendatavaks, sarnaselt teenusega sendDocument](files/Ettepanek-06.md) SISSE VIIDUD v 1.0.2
  - 07 [Parameetrite lisamine teenusesse representationList](files/Ettepanek-07.md) SISSE VIIDUD v 1.0.3
- [Vormingutevahelised seosed](https://e-gov.github.io/DHX/Vormingud.html)
- [E-arved DVK-s üleminekuperioodil](docs/E-arved.md) _töödokument_
- [Esitlus](files/DHX_esitlus.pptx) _2.11.2016_

#### Taustamaterjale
- [Kirjandus](files/Kirjandus.md)
- [Dokumendihalduse "ökosüsteem"](files/DOK-S.md)

### 4 Projekt "Dokumendivahetustaristu hajusarhitektuurile üleviimise väljatöötamine"

mai 2016 - veebruar 2017

Projektis: 

- täpsustatakse, detailiseeritakse ja verifitseeritakse (sh sihtrühmadega) projekti ettevalmistamisel loodud kontseptsioon;
- töötatakse välja andmevahetusprotokoll, lähtudes projekti ettevalmistamise tulemusel valminud kavandist;
- luuakse demonstraator (_proof of concept_, töötav mudel) protokolli headuse tõestamiseks
- arendatakse välja universaalne tarkvarakomponent
- tehakse vajalikud muudatused dokumendivahetuskeskuses
- valmistatakse ette uuele andmevahetusprotokollile üleminek:
     - koostatakse üleminekukava (sh vajadusel õiguslikud muudatused)
     - korraldatakse asutustele suunatud teavitustegevusi.

Projekt tagab ettevalmistused riigile tehnoloogiliselt, organisatoorselt optimaalse ja kõige jätkusuutlikuma IT-arhitektuurseks ülesehituseks. Tulevikus paraneb tänus sellele asutuste dokumendivahetuse käideldavus, tõuseb turvalisus (konfidentsiaalsus), üldine tõrkekindlus ning kaob sõltuvus kesksest komponendist.

Projekti hankija on Riigi Infosüsteemi Amet ja täitja BPW Consulting OÜ. Projekti rahastatakse Euroopa Liidu struktuurifondide toetusega.

Projektijuht: Eneli Järve, Riigi Infosüsteemi Amet, 663 0278, eneli.jarve@ria.ee

_Lahtiütlus. Käesoleva repositooriumi sisu - kui ei ole öeldud teisiti - on arenduses olevad töödokumendid, mis ei ole kinnitatud ega ametlikult publitseeritud. Dokumentatsioon võib täieneda._

#### EN

- __[Protocol Text](docs/EN.html)__
- [Overview](https://github.com/e-gov/DHX/blob/master/files/Overview.md)
- [Presentation](https://github.com/e-gov/DHX/blob/master/files/DHX_EN%20%282%29.pdf) (with a very brief discussion of X-Road)
- [Discussion page](https://github.com/e-gov/DHX/issues)
- [How to contribute](https://github.com/e-gov/DHX/blob/master/CONTRIBUTING.md)
- [Reference implementation](https://github.com/e-gov/DHX-etalon)

Protocol is published with [MIT licence](LICENCE.txt).
