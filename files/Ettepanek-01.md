![](../img/DHX-SendAsyncReceipt.PNG)

Täiendada DHX protokolli järgmiselt:

#### 7.6 Kättesaamiskinnitus
__Vastuvõttev süsteem PEAB saatma kinnituse dokumendi kättesaamise kohta .__

DHX-i ärinõude - dokumendi garanteeritud kohaletoimetamise - tagamiseks peab dokumendi saaja saatma kinnituse dokumendi kättesaamise kohta. 

__Kättesaamiskinnituse PEAB saatma kas sünkroonse või asünkroonse meetodiga.__

__Sünkroonse meetodi kasutamisel saadetakse kättesaamiskinnitus teenuse `sendDocument` päring-vastus (request-response) sõnumipaari vastussõnumis.__

Dokumentide edastamine DHX-is tugineb X-tee standardsele "sünkroonsele" päring-vastus (_request-response_) sõnumimustrile. "Sünkroonsus" tähendab seda, et sõnumit saatvad ja vastuvõtvad turvaserverid on seadistatud vastust ootama suhteliselt lühikese aja jooksul (tavaliselt 2..5 minutit). Kui vastus selle aja jooksul ei tule, loetakse edastusüritus ebaõnnestunuks. See tähendab, et vastuvõttev süsteem saab kinnituse dokumendi kättesaamise kohta saata ainult automatiseeritult (masina poolt). Nii on ka tehtud: kättesaamiskinnitus saadetakse teenuse `sendDocument` vastussõnumis (_response message_) Hinnanguliselt katab see lahendus valdava osa DHX-i kasutajate vajaduse.

Siiski võib olla süsteeme, mis vajavad kättesaamiskinnituse koostamiseks rohkem aega. Kui kättesaamise osaks loetakse ka dokumendi hõlmamist vm tegevusi, mis nõuavad inimese sekkumist või pöördumist kolmanda andmetöötlusseadme või -süsteemi poole (dokumendi edastamine vahendaja poolt lõppadressaadile), siis võib X-tee standardne "sünkroonse" sõnumimustri rakendamine olla raskendatud või isegi võimatu.

__Asünkroonse meetodi kasutamisel PEAB Vastuvõttev süsteem teenuse `sendDocument` vastussõnumis teatama, et saadab kättesaamiskinnituse asünkroonselt.__
__Teate vorming on määratletud protokolli lisas 1 olevas teenuse `sendDocument` spetsifikatsioonis.__

__Vastuvõttev süsteem saadab asünkroonne kättesaamiskinnituse saatva süsteemi teenuse `sendAsyncReceipt` poole pöördumisega.__

__DHX-i rakendav asutus (või tema DHS vahendusteenuse või DHS majutusteenuse pakkuja) PEAB arendama oma DHS-is välja asünkroonse kättesaamiskinnituse teenuse ja käitama seda.__

__DHX-i rakendaja teostatud asünkroonse kättesaamiskinnituse teenus PEAB vastama lisas 3 esitatud täpsemale spetsifikatsioonile.__

HINNANG

Ettepanekut tuleks hinnata kahest aspektist: 1) äriline vajadus - kas sellist teenust on vaja? 2) lahenduse tehniline kvaliteet; 

Märgime, et DHX ei võta seisukohta kättesaamise semantika osas (nt kas kättesaamine eeldab ka dokumendi hõlmamist või mitte), vaid lähtub selle sõna üldlevinud tähendusest. 

Märgime, et kättesaamiskinnituse edastamine teenuse `sendDocument` vastussõnumis ja teenuse `sendAsyncReceipt` päringsõnumis on tehnilises mõttes võrdselt turvalised ja pakuvad võrdse jõuga garantiid. Küsimus on ainult sünkroonsuses-asünkroonsuses. Üldjuhul ei saa öelda, kumb (sünkroonne või asünkroonne) on parem, küsimus on kumb on sobivam - see aga sõltub konkreetse süsteemi võimekusest.
