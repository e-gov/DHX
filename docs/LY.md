---
layout: LY
permalink: LY
title: Lähteülesanne
---

Süsteemi XX täiendamine DHX-i võimekusega

# Tööde kirjeldus

_mudeldokument_

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

### Tarkvarakomponendid, töövahendid ja ressursid

|                          | märkused                     | Arendajale antakse pääsuõigused? |
|--------------------------|------------------------------|-----|
| __süsteemi N koodirepo__ | BitBucket (Tellija taristus) | jah |
| __süsteemi N avalik koodirepo__ | GitHub (avalik koodirepo) | avalik |
| __DHX adapteri avalik koodirepo__ | DHX-i võimekuse loomisel tuleb kasutada DHX adapteri [3] koosseisus olevaid Java teeke, neid vajadusel kohandades ja täiendades | avalik |
| __automatiseerimisserver__ | Jenkins, Tellija taristus | jah |
| __arenduskeskkond__ | süsteemi N testimiseks Tellija taristus loodav virtuaalmasinate, neisse paigaldatud süsteemi- ja rakendustarkvara, võrguühenduste ja pääsuõiguste kogum | jah |
| __rühmatöökeskkond__ | Confluence Tellija taristus | jah |
| __skype__ | jooksva suhtluse keskkond | jah |

### Sidusarendus
1. Tarkvara ehitamine, paigaldamine ja testimine automatiseeritakse sidusarenduse (ingl _Continuous Integration_) põhimõtete kohaselt.
1. Sidusarenduse töövoog:
  - Tellija annab Arendajale pääsuõigused süsteemi N koodireposse, automatiseerimisserverisse ja arenduskeskkonda
  - Arendaja loob süsteemi N koodirepost omale töörepo
  - Arendaja koostab ehitus-, paigaldus- ja testiskriptid nning häälestab automatiseerimisserveri 
  - Arendaja kannab arenduse tulemid süsteemi N koodireposse (Git _push_ või _pull request_)
  - Automatiseerimisserver täidab ehitus-, paigaldus- ja testiskriptid
1. Süsteemi N koodirepo peegeldamine avalikku koodireposse (GitHub) toimub automaatselt

### Arhitektuuridokument

Arhitektuuridokumendis tuleb:

- spetsifitseerida süsteemi funktsiooni(d), piir, liidesed, komponentstruktuur, tehnoloogiad jm olulised arhitektuurilised aspektid
- eraldi välja tuua DHX-i võimekuse loomisest tulenevad muudatused
- esitada arhitektuurijoonis(ed) koos seletuskirjaga (selgitava tekstiga).

### Testimine

Testimisel tuleb aluseks võtta dokumendis "DHX standardtestid" [5] jaotises "Etalonteostuse kasutamine DHX-i testimiseks" määratletu.






### Viited
[1] Dokumendivahetusprotokoll DHX, [https://e-gov.github.io/DHX/](https://e-gov.github.io/DHX/)
[2] Dokumendivahetuskeskus (DVK), [https://github.com/e-gov/DVK](https://github.com/e-gov/DVK)
[3] DHX adapter, [https://github.com/e-gov/DHX-adapter](https://github.com/e-gov/DHX-adapter)
[4] DHX etalonteostus, [https://github.com/e-gov/DHX-etalon](https://github.com/e-gov/DHX-etalon)
[5] DHX standardtestid, [https://github.com/e-gov/DHX/blob/master/docs/Standardtestid.md](https://github.com/e-gov/DHX/blob/master/docs/Standardtestid.md)
[6] Süsteem N
