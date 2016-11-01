
# DHX aadressiraamat

Spetsifikatsioon

v0.2 01.11.2016

Sisukord

- [Ülevaade](#ulevaade)
- [Mõisted ja lühendid](#moisted-ja-luhendid)
- [Vajadus](#vajadus)
- [Lahendus](#lahendus)
- [Ei ole skoobis](#ei-ole-skoobis)
- [Teostus](#teostus)
- [Muutelugu](#muutelugu)

## Ülevaade

__DHX aadressiraamat__ on tööriist, mille abil hajusale dokumendihaldusele ülemineku erinevad osapooled saavad ülevaate kes ja kuidas on DHX-i võimekuse loonud ning kes pakuvad DHX vahendusteenust.

## Mõisted ja lühendid

| mõiste | seletus |
|--------|---------|
| DHX AR | DHX aadressiraamat |

## Vajadus

1. Avaliku sektori üleminek detsentraliseeritud dokumendivahetusele algab plaanide kohaselt 2017. a. Erinevad sihtrühmad (asutused, arendajad, teenusepakkujad, ITAO) hakkavad meie poole pöörduma küsimustega:
  1. kes on DHX-i vahendajad?
  2. millised asutused on DHX-i vahendajate kliendid?
  3. kes asutustest on DHX-ile juba üle läinud?
2. Vajame jooksvat ülevaadet ülemineku seisust.
3. Vajalik teave sisaldub mitmes allikas:
  1. X-tee globaalses konfiguratsioonis
    1. DHX nimemustriga (DHX*) alamsüsteemide andmed
    2. DHX vahendajate grupi liikmete nimekiri
  2. DHX-i vahendajate poolt X-teel publitseeritavates vahendusnimekirjades.
4. Puudub lihtne viis selle teave kiireks kokkusaamiseks ja inimesele esitamiseks.

## Lahendus

1. Arhitektuurijoonis

![](DHX-AR-01.PNG)

1. __Töövoog__ Tööriist peab realiseerima protsessi:
   - pöördumine
      - X-tee globaalse konfiguratsiooni
      - ja X-teel publitseeritavate DHX-i vahendusnimekirjade poole,
   - sealt teabe kogumine ülalnimetatud kolmele küsimusele vastamiseks
   - teabe esitaks veebiliidese kaudu inimkasutajale.

2. __Kasutajad__
  - Teenus on suunatud inimkasutajatele (DHX-i planeerijale, arendajale, haldajale, dokumendihalduse koordinaatorile).
  - Kasutajad võivad olla nii RIA-sisesed kui ka välised.
  - Tööriista põhikasutajaks on RIA teenusehaldurid ja ülemineku koordinaator, kes kasutavad teavet erinevate sihtrühmade nõustamiseks, probleemide lahendamiseks, üleminekuprotsessi seireks ja statistika andmiseks dokumendihaldust koordineerivale üksusele ITAO-le.
  
3. Tööriist peaks olema konfigureeritav nii, et teenuse saaks avalikult avada. (X-tee globaalne konfiguratsioon on tehniliselt avalik, DHX-i vahendusnimekirjade avalikkuse kohta tuleb seisukoht kujundada.)

## Ei ole skoobis

1. __DHX-i „aadressiraamatut“ ei pakuta masinloetavalt.__ DHX-i rakendav infosüsteem peab, DHX protokolli kohaselt, dokumendiedastuseks vajaliku aadressiotsingu teostama lokaalselt (https://e-gov.github.io/DHX/#74-lokaalne-aadressiraamat).

1. Ajalugu võib olla vajalik, eelkõige DHX-i vahendajatega seotud probleemide ja järelevalve teostamiseks. Seda oleks siiski tunduvalt raskem teostada, vajadusel saab pöörduda X-tee logide poole.

2. __RIHA andmete kasutamine.__ Tööriist esimeses teostuses ei haara RIHAs registreeritavat teavet. RIHAst pakuks huvi see, kuidas asutused märgivad end dokumendihalduse standardlahenduste kasutajateks ja DHX-i vahendajaid oma DHS-de volitatud töötlejateks. Nimetatud protsess ei ole veel põhjalikult läbi analüüsitud. Samuti puudub RIHA-l praegu võime nimetatud andmeid masinloetaval kujul välja anda. Tööriista täiendamine RIHA andmete hõivamisega on võimalik tulevikus.

## Teostus

Käideldavusnõue on madal.
Tööriista programmeerimiseks vajalikud tarkvarakomponendid on DHX etalonteostuse käigus juba loodud. Kokkupanemise maht on väike.
Tööriistaga ei looda uusi andmeid, andmebaasi ei vaja.
Analüüsi vajab küsimus, kas DHX-i aadressiraamat peaks tervikuna või osaliselt olema avalik. Kui mitte, siis on vaja autentimist ja pääsuhaldust.

## Viited

- [Dokumendivahetusprotokoll DHX](https://e-gov.github.io/DHX/)

## Muutelugu

| versioon, kuupäev | muudatus |
|-------------------|----------|
| v0.1 28.10.2016   | algversioon |
| v0.2 01.11.2016   |   |

