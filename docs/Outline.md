# Legacy-süsteemide likvideerimisest. DHX (ja RIHA) kogemus ja seis
19.10.2016, Luhtre arhitektuuriseminar

Priit Parmakson

MSc, #DontMakeMeThink, #TheSimplestThingThatCouldPossiblyWork, YOLO (algtase)

Vt ka:
  - ![protokolli tekst https://e-gov.github.io/DHX/](https://e-gov.github.io/DHX/)
  - ![DHX adapter https://e-gov.github.io/DHX/Adapter.html](https://e-gov.github.io/DHX/Adapter.html)

MIS ON DHX?
  - a DVK-killer, DVK-tapja
  - universaalne muster dokumentide otsevahetamiseks


MILLEKS?
  - Pythagorase teoreem
  - DVK tagasitulek? Pole välistatud, et inkarneerub
    nt riigipilve Pub/Sub teenusena

LAIEM PROBLEEM
  - legacy-st vabanemine
  - paljud meie e-riigi süsteemid on 10+ aastat vanad
  - neid üritatakse teha paremaks
  - üksikuid tehnoloogiaid vahetada uuemate vastu
  - vahetada arendajaid

  - inimeste mõtlemine on aga jäänud samaks
  - töömeetodid on jäänud samaks
  - arendajate kapatsiteet ei ole kasvanud
  - ja IT ei ole enam sama, mis 10 aastat tagasi

  - avastame, et teeme sama asja uuesti

  - tarkvaraline legacy
  - töömeetodite legacy
  - mõtlemise legacy

A, B ja C
  - A tippkvaliteet, hoida ajakohane iga hinna eest
  - B enam-vähem
  - C läbu

PROTOKOLL
  - suunatud koostalitlusvõime saavutamisele
    - ei ürita lahendada probleeme, mida on otstarbekas
      lahendada mujal (siduskihtides)
  - spetsifikatsioon
    - "Spec is never up to date? MY spec is up to date" -- Joel Spolsky
  - avalik, publitseeritud
  - üks omanik
  - avatud, formaliseeritud täiendamise protsess

INNOVATIIVSED ELEMENDID
  - RFC 2119 järjekindel kasutamine
  - speki haldus Tellija kätes
  - vastavusnõuete ilmutatud väljatoomine
  - juhitud terminoloogia
  - protokollide best practice rakendamine
    - avatud standardiloome protsess
    - avalik arutelu
    - etalonteostus
  - X-tee vahendamise kontseptsiooni edasiarendus

TOOTEPEREKOND
  - protokoll (A)
    - sh halduse protsess
  - etalonteostus (B)
    - demonstreerib protokolli teostatavust
    - eeskuju protokolli rakendajatele
    - toimib testivahendina
  - üleminekukava (A)
  - testimisteenus (C)?
  - tarkvaratükid protokolli rakendajatele
    - DHX adapter (B) 
    - Java teegid (B)
  - DVK-DHX konverter (B)
    - DVK koosseisus, üleminekuperioodil
  - "Kapsel" (B)

RAKENDAMISE ALTERNATIIVID
  - teen ise
  - teen ise, kasutades 3 Java teeki
  - kasutan DHX adapterit
    - SOAP liidesega
    - otsepöördusega DHX adapteri andmebaasi

ÜLEMINEKUKAVA
  - selged sõnumid ja tegutsemisjuhised
  - sihtrühmadele:
    - asutus, DHSi äriomanik
    - asutus, IT spetsialist
    - arendaja
    - DHX vahendusteenuse pakkuja
  - Mida ma PEAN teadma?
  - Mida ma PEAN tegema?
  *Erinevaid üleminekuid on palju. Kuidas vältida, et need asutustel sassi ei lähe?
