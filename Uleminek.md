## Probleem

Hajussüsteem koosneb arvukatest - suurusjärgus kuni 1000 - dokumendihaldussüsteemidest (DHS) ja ühest Dokumendivahetuskeskusest (DVK).

Dokumendihaldussüsteemi (DHS) (vt joonis) modelleerime koosnevana:
- dokumendihoidlast
- väljamineva posti puhvrist
- saabunud posti puhvrist
- algoritmist
- mälust
- seadistusväärtustest
- dokumentidest (D)
- adressaatide registrikoodidest (regK), nende abil toimub adresseerimine
- kommunikatsiooniprimitiividest:
    - `saadaOtse` - üritab saata dokumenti DHX protokolli kasutades,
    - `võtaVastuOtse` - on kuuldel ja võtab vastu dokumente DHX protokolli kasutades,
    - `viiPost` - pöördub DVK poole ja üritab saata dokumenti,
    - `tooPost` - pöördub DVK poole, kui seal on dokumente, siis toob need.

````
     DHX protokoll          "DVK protokoll"


   saadaOtse  võtaVastuOtse  viiPost  tooPost
   (regK, D)      \         (regK, D)   /
      \            \         /         /
       \       -----\--------         /
        \     /      ------------    /
         \   /                   \  /
       väljaminev              saabunud
          post                   post
         +---+                  +---+
         | D |                  | D |
         +---+                  +---+
         | D |                  | D |
         +---+                  +---+
         | D |                    |
         +---+                    |
         | D |                    |
         +---+                    |
          / \                     |
           |                     \ /
      +--------------------------------+
      |              DHS               |
      |       dokumendihoidla          |
      +--------------------------------+
 ````

Primitiivid põhinevad päring-vastus mustril. Vastuse kaotsiminek või viibimine on võimalik. Seetõttu ebaõnnestunud saatmist üldiselt korratakse. Dokument jääb väljamineva posti puhvrisse seni, kuni saatmine on õnnestunud (või administraator sekkub).

Algseisus on kõik DHS-id realiseerinud ja kasutavad "DVK protokolli" primitiive `viiPost` ja `tooPost`. DHS-id peavad realiseerima primitiivid `saadaOtse` ja `võtaVastuOtse`. Teevad seda erinevatel aegadel.

Eesmärgiks on täielikult üle minna primitiividele `saadaOtse` ja `võtaVastuOtse`. Üleminekuperioodi lõppedes lülitatakse DVK välja.

## Küsimus

Millised MINIMAALSED nõuded tuleks seada DHS-ide algoritmidele, et üleminek õnnestuks?

Ei ole tingimata nõutav, et kõik realiseeriksid täpselt ühesuguse üleminekualgoritmi. Algoritm võib olla ka stohhastiline.
