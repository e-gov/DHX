---
layout: LY
permalink: LY
title: Lähteülesanne
---

_mudeldokument_

Süsteemi XX täiendamine DHX-i võimekusega

# Tööde kirjeldus

Sisukord

[1 Eesmärk ja koosseis]()
[2 Kasutatavad komponendid, töövahendid ja ressursid]()
[3 Sidusarendus]()
[4 Arhitektuuridokument]()
[5 Testimine]()
[6 Muud nõuded]()
[7 Projektikoosolekud]()
[Viited]()

### 1 Eesmärk ja koosseis
Käesolevaga tellitakse tarkvaraarendustööd, mille eesmärk on protokollile DHX vastava dokumendivahetusfunktsionaalsuse loomine süsteemis N (DHX-i võimekuse loomine).

Teostada DHX-i otsevõimekus [2] mõistes, sh
- dokumendi vastuvõtmine (`sendDocument` teenuse abil)
- dokumendi saatmine (`sendDocument` teenusele)
- lokaalse aadressiraamatu koostamine

DHX-i vahendamise võimekust süsteemis N ei teostata.

Süsteem N vahetab praegu dokumente Dokumendivahetuskeskusega (DVK) [2] nn "DVK spetsifikatsiooni" kohaselt, kasutades "DVK klient" ja "DVK-API" komponente. "DVK spetsifikatsiooni" kohane liides tuleb eemaldada, vastavad komponendid kas eemaldada või DHX-i vajadustest lähtuvalt ümber teha.

Tööd sisaldavad:

| töö | tulem |
|-----|-----------|
| projekteerimine | arhitektuuridokument "Süsteemi N täiendamine DHX-i võimekusega". |
| programmeerimine | süsteemi N täiendatud programmikood, mis teostab DHX protokolli |
| testimine        | testitud, protokollile DHX vastav tarkvara, sh testidokumentatsioon |

### 2 Kasutatavad komponendid, töövahendid ja ressursid

|                          | märkused                     | Arendajale antakse pääsuõigused? |
|--------------------------|------------------------------|-----|
| __süsteemi N koodirepo__ | BitBucket (Tellija taristus) | jah |
| __süsteemi N avalik koodirepo__ | GitHub (avalik koodirepo) | avalik |
| __DHX adapteri avalik koodirepo__ | DHX-i võimekuse loomisel tuleb kasutada DHX adapteri [3] koosseisus olevaid Java teeke, neid vajadusel kohandades ja täiendades | avalik |
| __automatiseerimisserver__ | Jenkins, Tellija taristus | jah |
| __arenduskeskkond__ | süsteemi N testimiseks Tellija taristus loodav virtuaalmasinate, neisse paigaldatud süsteemi- ja rakendustarkvara, võrguühenduste ja pääsuõiguste kogum | jah |
| __SoapUI__ | testimisvahend | jah |
| __rühmatöökeskkond__ | Confluence Tellija taristus | jah |
| __skype__ | jooksva suhtluse keskkond | jah |

### 3 Sidusarendus
1. Tarkvara ehitamine, paigaldamine ja testimine automatiseeritakse sidusarenduse (ingl _Continuous Integration_) põhimõtete kohaselt.
1. Sidusarenduse töövoog:
  - Tellija annab Arendajale pääsuõigused süsteemi N koodireposse, automatiseerimisserverisse ja arenduskeskkonda
  - Arendaja loob süsteemi N koodirepost omale töörepo
  - Arendaja koostab ehitus-, paigaldus- ja testiskriptid nning häälestab automatiseerimisserveri 
  - Arendaja kannab arenduse tulemid süsteemi N koodireposse (Git _push_ või _pull request_)
  - Automatiseerimisserver täidab ehitus-, paigaldus- ja testiskriptid
1. Süsteemi N koodirepo peegeldamine avalikku koodireposse (GitHub) toimub automaatselt

### 4 Arhitektuuridokument
Arhitektuuridokumendis tuleb:
- spetsifitseerida süsteemi funktsiooni(d), piir, liidesed, komponentstruktuur, tehnoloogiad jm olulised arhitektuurilised aspektid
- eraldi välja tuua DHX-i võimekuse loomisest tulenevad muudatused
- esitada arhitektuurijoonis(ed) koos seletuskirjaga (selgitava tekstiga).

### 5 Testimine
1. Arendaja peab testima kõiki DHX-i nõudeid.
  - muu hulgas tuleb teha dokumendis "DHX standardtestid" [5] määratletud testid
1. Koostada tuleb:
  - testistrateegia (_test strategy_ ja _test approach_ tähenduses [7])
  - testilood
  - testandmed
  - testiskriptid, automatiseerimisserveri seadistused (automaattestid)
  - testiraport
1. Testitakse kahe vahendiga:
  - SoapUI abil
  - DHX etalonteostuse abil, vastavalt dokumendis "DHX standardtestid" [5] jaotises "Etalonteostuse kasutamine DHX-i testimiseks" määratletule
1. DHX-i nõudeid kontrollivad testid tuleb automatiseerida (teha automaattestid). Automatiseerimisest võib loobeda, kui see on suure keerukuse või töökulu tõttu ebamõistlik.
1. Automaatteste ei tule koostada süsteemi N nendele funktsionaalsustele, mis ei ole seotud DHX-ga.
1. Regressioonitestid tuleb teha.
1. Spetsiaalseid koormusteste ei ole vaja teha.

### 6 Muud nõuded
1. Süsteemi N täiendamisel peab järgima:
  - Tellija mittefunktsionaalseid nõudeid (MFN)
  - Tellija dokumentatsiooniplaani.
1. Kõrvalekalded p 1 nimetatud nõuetest on lubatud põhjendatud juhtudel (süsteemi või keskkonna olemuse tõttu nõue ei ole kohalduv või eesmärgipärane) Tellija nõusolekul.

### 7 Projektikoosolek
1. Projektikoosolek:
  - peetakse iga nädal
  - Tellija ruumides
  - juhatab Tellija projektijuht
  - Täitja projektijuht esitab suulise aruande tööde edenemisest
  - seejärel arutatakse sisulisi ja korralduslikke küsimusi
  - koosolekud protokollitakse.

### Viited
[1] Dokumendivahetusprotokoll DHX, [https://e-gov.github.io/DHX/](https://e-gov.github.io/DHX/)

[2] Dokumendivahetuskeskus (DVK), [https://github.com/e-gov/DVK](https://github.com/e-gov/DVK)

[3] DHX adapter, [https://github.com/e-gov/DHX-adapter](https://github.com/e-gov/DHX-adapter)

[4] DHX etalonteostus, [https://github.com/e-gov/DHX-etalon](https://github.com/e-gov/DHX-etalon)

[5] DHX standardtestid, [https://github.com/e-gov/DHX/blob/master/docs/Standardtestid.md](https://github.com/e-gov/DHX/blob/master/docs/Standardtestid.md)

[6] Süsteem N

[7] ISTQB Glossary, [http://www.istqb.org/downloads/glossary.html](http://www.istqb.org/downloads/glossary.html)

[8] Tellija mittefunktsionaalsed nõuded

[9] Tellija dokumentatsiooniplaan
