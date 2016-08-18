DHX protokolli täiendamise ettepanek 02

Vt ka:
- https://github.com/e-gov/DHX/issues/1 "Kui asutusel on mitu DHSi?"
- https://github.com/e-gov/DHX/issues/29 "Mitmes asutuses on 2 või enam infosüsteemi, mis kasutavad DVK-d eraldi kausta alusel. Mis saab?"

Täiendada DHX protokolli järgmiselt:

//////////////////////////////////////////////////

| mõiste | seletus |
|---|---|
| _dokumendihaldussüsteem_, _DHS_ | asutuse elektroonilise dokumendihalduse, sh dokumendivahetuse teenindamisele spetsialiseerunud infosüsteem. Käesolevas dokumendis eeldatakse, et asutusel võib olla mitu dokumendihaldussüsteemi. |

[..]

#### 5.2 

__DHX-i rakendav asutust VÕIB DHX-i võimekuse luua ka enamas kui ühes oma infosüsteemis.__

[..]

#### 5.4 Nimemuster
__DHX teenuse nimi PEAB järgima mustrit `EE/<liikmeklass>/<registrikood>/DHX.<täpsustus>/sendDocument`, kus__
 - `EE` on X-tee Eesti instantsi nimi
 - `<liikmeklass>` on X-tee liikmeklass (vastavalt vahendaja õiguslikule vormile kas `GOV` või `PRI`) 
 - `DHX` on teenuse ülesleidmist tagav, käesoleva protokolliga fikseeritud X-tee alamsüsteemi nimi
 - `.<täpsustus>` on mittekohustuslik nimetäpsustus asutustele, kes kasutavad mitut DHS-i ja
 - `<registrikood>` on asutuse registrikood.

 Näited:
 
 `EE/GOV/70003158/DHX/sendDocument`
 
 `EE/GOV/70000906/DHX.viru/sendDocument` (Viru Ringkonnaprokuratuur)
 
 `EE/GOV/70000906/DHX.laane/sendDocument` (Lääne Ringkonnaprokuratuur)

#### 5.5 Reserveeritud nimi "DHX"
__DHX teenus PEAB kasutama X-tee alamsüsteemi nimekuju "DHX" või "DHX.täpsustus". X-tee keskus EI TOHI registreerida ühegi asutuse sellise nimemustriga alamsüsteemi teiseks otstarbeks.__

//////////////////////////////////////////////////


HINNANG

1. __Äriline vajadus__ (kas sellist omadust on vaja?) Täiendus lihtsustaks väikese, kuid olulise hulga asutuste üleminekut DHX-le. Eelkõige on need asutused, kes on DVKga liidestunud enama kui ühe infosüsteemiga. Peamised juhud:
  - ringkonnaprokuratuuridel (neid on 4) igaühel on oma DHS;
  - Tallinna ja Pärnu kohtumajadel on omaette DHS-id. Kuid kohtumajad ei ole eraldi asutused;
  - Tartu Linnavalitsus kasutab DVK-d arvete saatmiseks oma DHS-st oma finantsinfosüsteemi;
  - RIA on DVK küljes ADIT-ga, kuid RIA-l on ka oma DHS;
  - Riigi Teataja ja RIKi DHS.
2. __Tasakaalustatus__ Täiendus teeb küll nimemustri veidi keerukamaks, kuid ei lisa keerukust töötlusloogikale ega teostusele.
3. __Lahenduse tehniline kvaliteet__. Ettepanek (Vitali S) on tõenäoliselt üks lihtsamaid viise ärivajadust lahendada.

