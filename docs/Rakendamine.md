### Protokolli rakendamine

DHX-i rakendaja peab otsustama, mis viisil ta DHX-i rakendab. Valida on mitme variandi vahel:

| # | DHX-i rakendusvariant | lühikirjeldus  |
|---|---------|---|
| 1 | DHX-i rakendamine otse (ilma vahendajata) | Vt allolevad alamvariandid. |
| 1A | adapteriteekide abil | DHS saab kasutada DHX Java teeke, mis arendatakse välja uue DHX adapteri loomise raames. DHX Java teegid sisaldavad funktsionaalsust dokumendi saatmiseks, vastuvõtmiseks ja aadressiraamatu koostamiseks. Saatmise klassid realiseerivad sisuliselt X-tee SOAP kliendi funktsionaalsuse, koos DHX hajusa saatmisalgoritmiga. Vastuvõtmise klassid realiseerivad  DHX SOAP teenuse ja saabunud dokumendi DHS-ile edastamise liidese. Vt [https://github.com/e-gov/DHX-adapter](https://github.com/e-gov/DHX-adapter). |
| 1B | DHX adapteriga (otsepöördusega adapteri andmebaasi) | Paigaldades DHX adapteri ja liidestades selle oma süsteemiga (DHS või muu) otsepöördusega (JDBC) adapteri andmebaasi poole. Vt [https://github.com/e-gov/DHX-adapter](https://github.com/e-gov/DHX-adapter). |
| 1C | DHX adapteriga (SOAP liides) | Paigaldades DHX adapteri ja liidestades selle oma süsteemiga SOAP liidese abil. Vt [https://github.com/e-gov/DHX-adapter](https://github.com/e-gov/DHX-adapter). | 
| 1D | teostades DHX protokolli ise | DHS arendaja võib ise DHX protokolli toetavad komponendid programmeerida, valides sobiva platvormi ja programmeerimiskeele. |
| 1E | DHX adapteriga (REST liides) | Paigaldades DHX adapteri ja liidestades selle oma süsteemiga REST liidese abil. Variant oli kaalumisel, __kuid ei ole praegu adapteri poolt toetatud__. Huvi korral võib vabavaralist DHX adapterit ise edasi arendada. |
| 2  | DHX-i rakendamine vahendaja kaudu | Vt [https://e-gov.github.io/DHX/#6-vahendamine](https://e-gov.github.io/DHX/#6-vahendamine). |
