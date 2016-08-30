DHX protokolli täiendamise ettepanek 03

### Mitme aadressi käsitlus

DVK-sse saatmisel on võimalik kapslis näidata mitu adressaati. DVK-sse saabunud dokument edastatakse kõigile kapslis näidatud adressaatidele.

DHX-is on sarnast mehhanismi kaalutud vahendamise puhul. Protokolli versioonis 1.0 on nõue:

> 8.4 Mitme aadressi käsitlus

> Vahendajana tegutsev süsteem PEAB mitmele aadressile saadetud dokumendi edastama kõigile oma klientidele, kes on dokumendi kapsli transpordiblokis adressaatidena nimetatud.

See on problemaatiline, sest adressaat näidatakse ka teenuse `sendDocument` päringsõnumi kehas, seal aga on praegu võimalik näidata ainult üht aadressi. See ei ole loogiliselt kooskõlaline. Samuti tekib küsimus, kuidas vastuvõttev süsteem peaks mitut aadressi täpselt käsitlema.

Ärivajaduseks on pakkuda DHS-is kasutajale võimalust ühe nupuvajutusega saata dokumente mitmele adressaadile. Tehniliselt võib see olla teostatud üksikute sõnumite saatmise teel. (X-tee sõnumivahetuste minimeerimine pole kõige suurem argument).

Seetõttu on ettepanek nõue 8.4 kõrvaldada. Igale adressaadile saadetakse dokument eraldi sõnumiga. Küll aga peab säiluma DHS-ides inimkasutajale pakutav võimalus valida mitu aadressi ja käivitada saatmine ühe nupuvajutusega.

HINNANG

1. __Äriline vajadus__ (kas sellist omadust on vaja?) Vt ülal.
2. __Tasakaalustatus__ On tasakaalus.
3. __Lahenduse tehniline kvaliteet__. Nõude 8.4 ärajätmine teeb protokolli selgemaks ja lihtsamaks, vähendab veakäsitluse probleemide ja dokumentide valele aadressile sattumise riski.

