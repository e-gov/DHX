_kavand_

_Lahtiütlus. Käesolev dokument on arenduses olev töödokument. Dokument ei ole kinnitatud ega ametlikult publitseeritud. Dokument täieneb, eelkõige tehniliste detailide osas._

Arvamused dokumendi kohta palume saata: Riigi Infosüsteemi Amet, Eneli Järve, 663 0278, eneli.jarve@ria.ee

# E-arved hajusas dokumendivahetuses

01.11.2016

Käesolev dokument selgitab, mida e-arvete töötlejad peavad teadma ja tegema seoses avaliku sektori üleminekuga hajusale dokumendivahetusele.

- [Ülevaade](#ulevaade)
- [e-arve edastamine DHX protokolliga](#e-arve-edastamine-dhx-protokolliga)
- [e-arved üleminekul DHX protokollile](#e-arved-uleminekul-dhx-protokollile)
- [e-arveid DVK kaudu edastava operaatori tegevuskava](#e-arveid-dvk-kaudu-edastava-operaatori-tegevuskava)
- [DVK-d mittekasutava operaatori tegevuskava](#dvk-d-mittekasutava-operaatori-tegevuskava)
- [Viited](#viited)

## 1 Üleminek

- Ülemineku peamised osad on: a) dokumendivahetusprotokolli DHX kasutuselevõtmine dokumente vahetavates süsteemides; b)  dokumendivahetuskeskuse (DVK) sulgemine.
- Ülemineku ettevalmistusi on tehtud 2015. aastast.
- Praeguseks on välja töötatud ja kinnitatud protokoll DHX (https://e-gov.github.io/DHX/). DHX saab universaalseks, turvaliseks elektrooniliste dokumentide vastuvõtmise ja saatmise kanaliks. Prognoosime, et valdav enamus asutusi võtab DHX-i kasutusele, eelkõige dokumendihaldussüsteemides (DHS). (DHX-i võib kasutada ka muudes dokumente vahetavates süsteemides).
- Protokolli rakendamist hõlbustavad tarkvarakomponendid (DHX adapter) valmivad 2016. a lõpuks.
- Koostatakse ja avaldatakse üleminekukava ja juhised (veebruar 2017. a).
- Üleminek algab praegu veel kindlaks määramata kuupäeval, eeldatavalt 2017. a aprillis ja kestab 2018. a lõpuni.

## 2  e-arve edastamine DHX protokolliga

- DHX-i võib edukalt kasutada e-arvete edastamiseks. Prognoosime, et paljud asutused, aga ka e-arve edastusteenuse osutajad (nn „operaatorid“) soovivad DHX-i kasutada e-arvete edastamiseks.
- DHX-i kasutamisel tuleb e-arve käsitada dokumendina avaliku sektori dokumendihalduse tähenduses. Vt [DHX, 3 Mõisted ja lühendid](https://e-gov.github.io/DHX/#3-m%C3%B5isted-ja-l%C3%BChendid).
- Dokumendi edastamisel DHX-i protokolli kohaselt tuleb dokument asetada avaliku sektori metandmete kapslisse. Vt [DHX, 5.6 Kapsli kasutamine](https://e-gov.github.io/DHX/#56-kapsli-kasutamine).

## 3  e-arved üleminekul DHX protokollile

Üleminekuperioodil tagab DVK:

1. vana, "DVK protokolliga" sissetulnud e-arve edastamise DHX-i võimekuse loonud asutusele, vastavalt DHX protokollile.
  Märkus. DHX-i võimekuse loonud asutusele edastab DVK e-arve dokumendivahetuse kapslisse v2.1 pakendatult - sest uuema  kapslistandardi versiooni kasutamist nõuab DHX protokoll (vt [DHX, 5.6 Kapsli kasutamine](https://e-gov.github.io/DHX/#56-kapsli-kasutamine)).
2. DHX protokolliga sissetulnud e-arve edastamise asutusele, kes ei ole veel DHX-le üle läinud.

## 4 e-arveid DVK kaudu edastava operaatori tegevuskava

_Märkus. Käesolev jaotis puudutab ainult neid ettevõtteid ja asutusi, kes kasutavad e-arvete edastamiseks DVK-d._

__Lähteolukord - oktoober 2016__
Kaks operaatorit (OP) – Fitek ja Omniva – kasutavad DVK-d e-arvete saatmiseks teatud hulgale DVK-ga liitunud asutustele (joonisel 1 AS1 ja AS2). Arve saatmine DVK-sse ja sealt edasi asutuse DHS-i toimub DVK liidese kaudu (joonisel DVK). DVK-ga liitunud asutused ja operaatorid on DVK kliendid. DVK kaudu saadab arveid ka Riigi Kinnisvara AS, keda võib siinses kontekstis käsitleda operaatoriga samal viisil.

Joonis 1
```
         e-arve
  OP ----------------> DVK
         (DVK)       /|
                    / |
              (DVK)/  |(DVK)
                  /   v
                 AS1  AS2
```
__Üleminekuperiood__ – asutus on DHX-le üle läinud
Üleminekuperioodil loovad asutused oma dokumente vahetavates süsteemides DHX-i võimekuse. Joonis 2 kujutab olukorda, kus AS1 on DHX-i võimekuse juba loonud. Üleminekuperioodil tegutseb DVK DHX-i vahendajana . See tähendab, et operaatori OP saadetud e-arve saadab DVK asutusele AS1 edasi, nüüd juba DHX protokolli kaudu. Asutusele AS2, kes ei ole üle läinud, edastatakse e-arve endisel viisil.

Joonis 2
```
         e-arve
  OP ----------------> DVK
         (DVK)       /|
                    / |
              (DHX)/  |(DVK)
                  /   v
                 AS1  AS2

```

__Üleminekuperiood__ – operaator on DHX-le üle läinud
Joonisel 3 on kujutatud olukorda, kus seni DVK-d kasutanud operaator OP on loonud DHX-i võimekuse. e-arve saadetakse nüüd vastavalt DHX protokollile: adressaadil AS1 on DHX-i võimekus – OP saadab talle e-arve otse; adressaadil AS2 ei ole veel DHX-i võimekust – OP saadab e-arve DVK kaudu. (Joonistelt 2 ja 3 on näha, et DVK suudab üleminekuperioodil toimida uue ja vana protokolli tõlkijana mõlemas suunas).

Joonis 3

```
         e-arve
  OP ----------------> DVK
     \    (DHX)       /|
      \              / |
       ---------    /  |(DVK)
         (DHX)  \      v
                 AS1  AS2

```
__Pärast ülemineku lõppu__
DVK on tegevuse lõpetanud. Operaator OP saadab arveid asutusele AS1 otse. Mis sai asutusest AS2? Ka tema võis oma arveliikluse DHX-le üle viia; võib-olla aga leppis operaatoriga kokku muu kanali kasutamises.  

Joonis 4
```
  OP 
     \   
      \  e-arve         
       ---------   
         (DHX)  \    
                 AS1 
```

## 5 DVK-d mittekasutava operaatori tegevuskava

- Operaator peaks uurima ja hindama, kas tema avaliku sektori kliendid, kes DHS-des niikuinii DHX-i rakendama hakkavad, sooviksid ka e-arvete liiklust DHX-i abil korraldada.
- Kui teenuse osapooled (operaator ja klient) peavad asjakohaseks DHX-i rakendada, siis tuleb mõlemal oma süsteemis teostada DHX-i võimekuse loomiseks vajalikud arendustööd.

## 6 Viited

[Dokumendivahetusprotokoll DHX](https://e-gov.github.io/DHX/)
