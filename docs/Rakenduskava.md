# DHX-i rakenduskava

Kava eesmärk on määratleda Riigi Infosüsteemi Ameti, avaliku sektori asutuste ja erasektori teenusepakkujate ühised tööd avaliku sektori üleminekul dokumentide elektroonilisele otsevahetamisele DHX protokolli abil.

## Tähtajad

Ülemineku algus: 1.03.2017

Ülemineku lõpp: 31.12.2018

## Riigi Infosüsteemi Amet

1. avaldab DHX protokolli _avaldatud_
1. avaldab DHX adapteri tarkvara 
1. avaldab etalonteostuse (kood ja töötav rakendus) _avaldatud_
  - pakub etalonteostust DHX-i rakendajatele testimisteenusena _töötab_
1. loob DVK-s DHX vahendamise võimekuse
1. avab DHX-i aadressinimistu teenuse
1. kuulutab üleminekuperioodi ametlikult välja
1. avaldab juhised DHX-i rakendajatele
  - sh rakendamistegevuste soovitusliku nimekirja
  - arendustööde tellimise mudel-lepingu
1. levitab teavet ülemineku kohta _levitatud juba päris palju_
1. annab nõu DHX-i rakendajatele _vältida, et tekiks olukord, kus "RIA ei tõsta toru"_
  - protokolli kohta tekkivates küsimustes
  - adaptertarkvara kohta tekkivates küsimustes
  - etalonteostuse kaudu pakutava testimisteenuse kohta
  - DHX aadressinimistu kohta tekkivates küsimustes
1. peab arvestust ülemineku edenemise kohta, koostab ja avaldab vastavat statistikat
1. teenindab DHX-i rakendajaid:
  - registreerib X-teel DHX alamsüsteeme
  - lülitab asutuse dokumendiliikluse DVK-s ümber DHX-le
1. haldab DHX-i vahendamist
  - registreerib DHX-i vahendaja
  - avaldab DHX-i vahendajate nimekirja
  - teostab järelevalvet DHX-i vahendajate üle
1. üleminekuperioodi lõpus sulgeb DVK

## Asutus
1. selgitab välja infosüsteemid, mida üleminek puudutab
  - DVK-ga liidestatud DHS-id jm süsteemid
  - muud süsteemid, milles DHX-i rakendamine on vajalik ja otstarbekas
1. otsustab, kas ja kuidas DHX-i rakendab
    a) ise (otse)
    b) DHX-i vahendaja kaudu
1. kavandab üleminekutööd
  - selgitab, kas DHX-i rakendamise eeldused on täidetud; vajadusel korraldab vajalikud tööd
    - X-tee v6
    - dokumendivahetuse kapsel v2.1
1. tellib DHX-i võimekuse arendustööd
  - võimalusel tellides arendusi ühiselt teiste asutustega
  - koostöös arendajaga otsustab, kuidas DHX-i võimekuse tehniliselt loob
    - DHX-i adapteri teekide kasutamisega
    - DHX-i adapteri paigaldamisega
    - ise programmeerides
  - testib oma süsteemi DHX-i võimekust
    - soovi korral kasutades etalonteostust
1. esitab RIA-le taotluse X-teel DHX alamsüsteemi registreerimiseks
1. esitab RIA-le taotluse DVK dokumendiliikluse ümberlülitamiseks DHX-le
1. DHX-i vahendaja kasutamise korral:
  - sõlmib vahendajaga lepingu
  - ühendab oma süsteemi vahendaja süsteemiga

## DHX-i vahendaja
1. loob oma süsteemis DHX-i vahendusvõimekuse
1. registreerib end RIA-s DHX-i vahendajana
1. sõlmib asutusega vahenduslepingu
1. ühendab oma süsteemi asutuse süsteemiga
1. teenindab asutust, käitades vahendusteenust vastavalt DHX protokollile ja X-tee vahendamise nõuetele

## Arendaja
1. Kui soovib oma toodetes v teenustes DHX-i rakendada, siis kavandab ja teostab vastavad arendused 
1. Kui pakub DVK-ga suhtlevat tarkvara või teenuseid, siis kavandab ülemineku DHX-le ja teostab vastavad arendused
