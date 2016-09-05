DHX protokolli täiendamise ettepanek 06

### Muuta teenuse representationList laiendatavaks, sarnaselt teenusega sendDocument

Täiendada teenuse representationList spetsifikatsiooni: 

//////////////////////////////////////////////////

Lisaks ülalnimetatud parameetritele VÕIB vastussõnumi XML elemendis `Body/sendDocument` kasutada muid parameetreid.

Vastussõnumit töötlev süsteem PEAB sõnumi töötlemisel parameetrid, millest ta aru ei saa, vahele jätma.

//////////////////////////////////////////////////

HINNANG

1. __Äriline vajadus__ (kas sellist omadust on vaja?) Täiendus võimaldab vahendajal lisada vahendusnimekirja lisaks protokolliga reguleeritud elementidele täiendavat teavet.
2. __Tasakaalustatus__ On tasakaalus.
3. __Lahenduse tehniline kvaliteet__. Muudatus on lokaliseeritud, keerukust lisandub minimaalselt.
