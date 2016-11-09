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
| testitav süsteem | X-teega liidestatud infosüsteem, dokumendihaldussüsteem (DHS) või ka muu süsteem, millele arendatud DHX-i võimekust testitakse. |

## 3 DHX-i rakendusvariandid

DHX-i rakendaja peab valima järgmiste variantide vahel:

|  |  |
|--|---|
| 1 | DHX-i rakendamine otse |
| 1A | kasutades adapteriteeke |
| 1B | paigaldades DHX adapteri ja liidestades selle oma süsteemiga (DHS või muu) otsepöördusega (JDBC) adapteri andmebaasi poole | 
| 1C | paigaldades DHX adapteri ja liidestades selle oma süsteemiga SOAP liidese abil |
| 1D | teostades DHX protokolli ise |
| 1E | paigaldades DHX adapteri ja liidestades selle oma süsteemiga REST liidese abil - variant oli kaalumisel, kuid ei ole praegu adapteri poolt toetatud. Huvi korral võib vabavaralist DHX adapterit ise edasi arendada. |
| 2  | DHX-i rakendamine vahendaja kaudu, vt [https://e-gov.github.io/DHX/#6-vahendamine](https://e-gov.github.io/DHX/#6-vahendamine). |

## 3 Testistrateegia



DHX-i rakendamisel tuleb testistrateegia koostamisel arvestada järgmist:

- testimisel võib kasutada käesolevat standardtestide komplekti

## Etalonteostus kasutamine DHX-i testimiseks

DHX-i võimekuse loonud süsteemi testimiseks võib kasutada [DHX-i etalonteostust](https://github.com/e-gov/DHX-etalon).
- Etalonteostus koosneb kahest eraldi paigaldatud, RIA taristus käitatavast rakendusest, mis etendavad DHX-i võimekusega infosüsteeme. 

## Viited

- [Dokumendivahetusprotokoll DHX](https://e-gov.github.io/DHX/)

## Muutelugu

| versioon, kuupäev | muudatus |
|-------------------|----------|
| v0.1 09.11.2016   | algversioon |
