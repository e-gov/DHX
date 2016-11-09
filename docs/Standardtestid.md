![](DHX.PNG)

# DHX standardtestid

v0.1 09.11.2016

Sisukord

- [1 Ülevaade](#1-Ülevaade)
- [2 Mõisted ja lühendid](#2-mõisted-ja-lühendid)
- [3 Testilood]()
  - [1 Õige kapsli saatmine] 

- [Viited](#viited)
- [Muutelugu](#muutelugu)

## 1 Ülevaade

Käesoleva testilugude komplekti eesmärk on abistada DHX-i võimekuse loomisele suunatud arendustööde kavandajaid.

## 2 Mõisted ja lühendid

Lisaks alljärgnevateke kasutatakse käesolevas dokumendis [dokumendivahetusprotokolli DHX mõisteid ja lühendeid](https://e-gov.github.io/DHX/#3-m%C3%B5isted-ja-l%C3%BChendid).

| mõiste | seletus |
|--------|---------|
| etalonteostus | Kahest eraldi paigaldatud, RIA taristus käitatavast rakendusest koosnev vahend, mida saab kasutada testitava süsteemi testimiseks. Etalonrakendused etendavad DHX-i võimekusega infosüsteeme.  [DHX-i etalonteostust](https://github.com/e-gov/DHX-etalon) |
| testitav süsteem | X-teega liidestatud infosüsteem, dokumendihaldussüsteem (DHS) või ka muu süsteem, millele arendatud DHX-i võimekust testitakse. |

## 3 DHX-i rakendusvariandid

DHX-i rakendaja peab otsustama, mis viisil ta DHX-i rakendab. Valida on mitme variandi vahel:

| # | variant |
|---|---------|
| 1 | DHX-i rakendamine otse |
| 1A | kasutades adapteriteeke |
| 1B | paigaldades DHX adapteri ja liidestades selle oma süsteemiga (DHS või muu) otsepöördusega (JDBC) adapteri andmebaasi poole | 
| 1C | paigaldades DHX adapteri ja liidestades selle oma süsteemiga SOAP liidese abil |
| 1D | teostades DHX protokolli ise |
| 1E | paigaldades DHX adapteri ja liidestades selle oma süsteemiga REST liidese abil - variant oli kaalumisel, kuid ei ole praegu adapteri poolt toetatud. Huvi korral võib vabavaralist DHX adapterit ise edasi arendada. |
| 2  | DHX-i rakendamine vahendaja kaudu, vt [https://e-gov.github.io/DHX/#6-vahendamine](https://e-gov.github.io/DHX/#6-vahendamine). |

## 3 Testistrateegia


## 4 Testilood


|   | kontrollitav vastavusnõue,   |
|---|---|
| Dokumendi saatmine |    |
| - Adressaadil on DHX-i otsevõimekus | 1.5, 5.2, 5.6 |

Dokumendi vastuvõtmine

Lokaalse aadressinimistu koostamine 

| Testimisega kontrollitav nõue (protokolli jaotis, nimetus), vt [Vastavusnõuded](https://e-gov.github.io/DHX/#10-vastavusn%C3%B5uded) | Testiloo lühikirjeldus |
|---|---|
| __Protokollis kehtestatud nõuded__ |  |
| 1.5 	Dokumenti saatev süsteem PEAB määratlema kasutatava DXH protokolli versiooni. | _selgitada, kas seda saaks kontrollida etalonteostuses_  |
| 5.2 	DHX-i rakendav asutus (või tema DHS vahendusteenuse või DHS majutusteenuse pakkuja) PEAB arendama oma DHS-is välja DHX teenuse ja käitama seda. |   |
| 5.2 	DHX-i rakendaja teostatud DHX teenus PEAB vastama lisas 1 esitatud täpsemale spetsifikatsioonile. |   |
| 5.3 	DHX-i rakendav asutus PEAB avama DHX teenuse kõigile asutustele, kellega ta soovib dokumente vahetada. Kui asutus turvapoliitika vm kaalutlustel ei pea otstarbekaks DHX teenuse avamist kõigile X-tee liikmetele, siis VÕIB ta DHX teenuse avada konkreetsetele X-tee liikmetele (pääsuõiguste andmisega X-tee turvaserveris). |   |
| 5.3 	Üleminekuperioodiks PEAB DHX teenuse avama ka DVK-le. |   |
| 5.4 	DHX teenuse nimi PEAB järgima mustrit EE/<liikmeklass>/<registrikood>/<DHX*>/sendDocument. |   |
| 5.5 	DHX teenus PEAB kasutama X-tee alamsüsteemi nimega DHX*, kus * on sümbolijada, mis võib olla ka tühi. |   |
| 5.6 	Dokumendi PEAB edastama ametlikult kinnitatud elektroonilise andmevahetuse metaandmete loendile vastavas “kapslis”. | Testitav süsteem saadab nõuetekohaselt kapseldatud dokumendi etalonteostusele; etalonteostuse kasutajaliidese kaudu kontrollitakse, et dokument on õigesti kohale jõudnud.  |
| 5.7 	Saatev süsteem PEAB dokumendi saatmisürituste seeriale andma unikaalse identifikaatori (saadetise id, ingl consignment id). |   |
| 6.2 	DHX rakendamisel läbi vahendaja PEAB asutus sõlmima lepingu DHX vahendajaga. Kasutada TOHIB AINULT X-tee keskuse poolt DHX vahendajate nimekirja lisatud vahendajaid. |   |
| 7.1 	Saatev süsteem PEAB välja selgitama, kas adressaadil on DHX võimekus. |   |
| 7.2 	Otsevõimekust PEAB välja selgitama esimeses järjekorras (enne vahendaja kaudu võimekuse tuvastamist). |   |
| 7.2 	Saatev süsteem PEAKS otsevõimekuse välja selgitama X-tee globaalse konfiguratsioonifaili põhjal. |   |
| 7.2 	Adressaadil otsevõimekuse olemasolul PEAB dokumendi saatma adressaadile otse. |   |
| 7.3 	DHX võimekuse läbi vahendaja kontrollimiseks PEAB saatev süsteem: a) alla laadima X-tee keskusest X-tee globaalse konfiguratsiooni faili või kasutama turvaserveri poolt allalaetud globaalse konfiguratsiooni faili; b) leidma failist vahendajate nimekirja (DHX vahendajate grupi); c) käima kõik vahendajad läbi ning pärima X-tee kaudu vahendusnimekirjad; d) kindlaks tegema, kas adressaat sisaldub vahendusnimekirjades. |   |
| 7.3 	Kui adressaadil puudub DHX otsevõimekus, kuid on DHX võimekus läbi vahendaja, siis PEAB saatev süsteem saatma dokumendi vahendajale. |   |
| 7.4 	Puhvri (lokaalse aadressiraamatu) kasutamisel PEAB värskendamise periood olema konfigureeritav. |   |
| 7.5 	Kui saatev süsteem on kindlaks teinud, et adressaadil puudub DHX võimekus ja käimas on üleminekuperiood, siis PEAB saatev süsteem üritama dokumenti saata DVK sendDocument teenusesse. |   |
| 7.6 	Saatev süsteem PEAB lugema dokumendi edastatuks, kui on saanud sendDocument teenuselt positiivse vastuskoodiga vastussõnumi. |   |
| 7.7 	Kui adressaadiga ei saa ühendust või kättesaamise kinnitust ei tule, siis PEAB mõne aja pärast saatmist uuesti üritama. |   |
| 7.7 	Tühipäringute arvu vähendamiseks PEAKS kasutada eksponentsiaalse taganemise (exponential back-off) algoritmi [EXP]. |   |
| 7.7 	Saatmisürituste arv PEAB olema lõplik ja saatva süsteemi konfiguratsioonis määratav. |   |
| 8.1 	Vastuvõttev süsteem PEAB kontrollima, et dokument on saadetud õigele aadressile. |   |
| 8.1 	Vahendamise puhul PEAB vastuvõttev süsteem kontrollima, kas adressaat on vahendaja klient (on vahendusnimekirjas). |   |
| 8.2 	Valesti adresseeritud dokumendi korral PEAB vastuvõttev süsteem saatma saatjale veateate Vale aadress. |   |
| 8.3 	Vastuvõttev süsteem PEAB kontrollima, et dokument tuli nõuetekohases kapslis. |   |
| 8.3 	Kontroll PEAB sisaldama vähemalt XML skeemile vastavuse kontrollimist. |   |
| 8.3 	Vigase kapsli korral PEAB saatma vastava veateate Vigane kapsel. |   |
| 8.4 	Kui saatja DHS soovib dokumenti saata mitmele adressaadile (otsevõimekusega asutusele või vahendatavale asutusele) korraga, siis ta PEAB dokumendi kapsli saatma igale adresaadile eraldi, eraldi DHX sendDocument väljakutsega. |   |
| 8.5 	DHX-i võimekuse loonud süsteem PEAB üleminekuperioodil dokumente vastu võtma ka DVK-st. |   |
| 8.6 	Vastuvõttev süsteem PEAB kontrollima dokumendi kapslis sisalduvate saatjat kirjeldavate metaandmete ja X-tee päringsõnumi X-tee päiseväljade client ja representedParty kooskõlalisust. Lahknevuste korral PEAB dokumendi tagasi lükkama. |   |
| 8.6 	Vahendajalt dokumendi vastuvõtmisel PEAB kontrollima, kas vahendaja on vahendajate nimekirjas. Kontrolli tulemust VÕIB puhverdada. |   |
| 9.1 	Üleminekuperioodil niipea, kui asutuse DHS-is on tekkinud DHX protokolli võimekus (arendus on lõppenud), PEAB hakkama dokumendi saatmisel kasutama DHX teenust. |   |
| 9.1 	Üleminekuperioodil kui osutub, et adressaat ei ole veel dokumentide vastuvõtmise DHX-teenust loonud (teenus ei ole X-teel leitav), siis PEAB dokumendi saatma DVK kaudu, kasutades DVK teenust sendDocument ja märkides adressaadi dokumendi metaandmete kapslis. |   |
| 9.1 	DHX võimekuse saavutanud asutus PEAB DVK kasutamisest loobuma. |   |
| __Muud võimalikud nõuded__ |  |



## Etalonteostus kasutamine DHX-i testimiseks

DHX-i võimekuse loonud süsteemi testimiseks võib kasutada [DHX-i etalonteostust](https://github.com/e-gov/DHX-etalon).
- Etalonteostus koosneb kahest eraldi paigaldatud, RIA taristus käitatavast rakendusest, mis etendavad DHX-i võimekusega infosüsteeme.
  - Etalon1, [https://dhxdemo.eesti.ee/etalon1/](https://dhxdemo.eesti.ee/etalon1/), etendab DHX-i otsevõimekusega asutust
  - Etalon2, [https://dhxdemo.eesti.ee/etalon2/](https://dhxdemo.eesti.ee/etalon2/), etendab DHX-i vahendajat, kes vahendab kolme asutust. 

## Viited

- [Dokumendivahetusprotokoll DHX](https://e-gov.github.io/DHX/)

## Muutelugu

| versioon, kuupäev | muudatus |
|-------------------|----------|
| v0.1 09.11.2016   | algversioon |
