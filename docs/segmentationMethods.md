# Jaotusalgoritmid (SegmentationMethod)

**Staatus: MUSTAND.** Käesolev register kuulub kokku laiendusega [granularAccess](granularAccess) (versioon 0.1-draft) ja on avaldatud tagasiside kogumiseks.

Läbiva suurtähega esitatud sõnu PEAB, PEAKS, VÕIB ja EI TOHI tuleb tõlgendada nii, nagu need on määratletud [DHX protokolli](index) jaotises 2 „Nõuete keel“ (vrdl RFC 2119).

## Sisukord

* [Milleks see register on](#milleks-see-register-on)
* [Register](#register)
* [Kuidas määratlust lugeda](#kuidas-m%C3%A4%C3%A4ratlust-lugeda)
* [pdf-pages-v1](#pdf-pages-v1)
  * [Ulatus](#ulatus-pdf-pages-v1)
  * [Lubatud vahemikud](#lubatud-vahemikud-pdf-pages-v1)
  * [Nummerdamine](#nummerdamine)
  * [Nõutavad kontrollarvud](#n%C3%B5utavad-kontrollarvud-pdf-pages-v1)
  * [Servajuhud](#servajuhud-pdf-pages-v1)
  * [Mida algoritm ei kata](#mida-algoritm-ei-kata-pdf-pages-v1)
  * [Näide](#n%C3%A4ide-pdf-pages-v1)
* [plaintext-blocks-v1](#plaintext-blocks-v1)
  * [Ulatus](#ulatus-plaintext-blocks-v1)
  * [Lubatud vahemikud](#lubatud-vahemikud-plaintext-blocks-v1)
  * [Kodeering](#kodeering)
  * [Reavahetused](#reavahetused)
  * [Tühimärgid](#t%C3%BChim%C3%A4rgid)
  * [Lõikude nummerdamine](#l%C3%B5ikude-nummerdamine)
  * [Sõnade nummerdamine](#s%C3%B5nade-nummerdamine)
  * [Nõutavad kontrollarvud](#n%C3%B5utavad-kontrollarvud-plaintext-blocks-v1)
  * [Servajuhud](#servajuhud-plaintext-blocks-v1)
  * [Mida algoritm ei kata](#mida-algoritm-ei-kata-plaintext-blocks-v1)
  * [Näide](#n%C3%A4ide-plaintext-blocks-v1)
* [Millele algoritmi veel ei ole](#millele-algoritmi-veel-ei-ole)
* [Uue algoritmi lisamine](#uue-algoritmi-lisamine)
* [Tagasiside](#tagasiside)

## Milleks see register on

Laiendus `granularAccess` kirjeldab faili osade juurdepääsu vahemikena — lehekülgede, lõikude ja sõnade järjekorranumbritena. Number iseenesest ei tähenda midagi: „lõik 3“ on mõttekas ainult siis, kui saatja ja vastuvõtja jaotavad faili täpselt ühtemoodi. Selle jaotuse määrab element `SegmentationMethod`, mille väärtus on jaotusalgoritmi tunnus.

Laiendus ise jaotusalgoritme ei määratle — see hoiaks uute algoritmide lisamise skeemi versioonide küljes. Tunnused avaldatakse **käesolevas registris**, mis täieneb laiendust muutmata (vt [Uue SegmentationMethod kasutuselevõtt](granularAccess#uue-segmentationmethod-kasutuselev%C3%B5tt)).

Register on koht, mille alusel rakendus otsustab, kas tohib faili osa tasandile laskuda: **tundmatu jaotusalgoritmi korral PEAB rakendus jääma faili tasandile** ja rakendama terve faili kohta faili enda `Access` väärtust. Avaldamata jaotusalgoritmi tunnust VÕIB kasutada, kuid see on tuntud ainult neile osapooltele, kes on selle omavahel kokku leppinud — kõigile teistele jääb fail tervikuna `AK`-ks (vt [Avaldamata tunnus](granularAccess#avaldamata-tunnus)). Avaldamine on seetõttu ainus viis muuta tunnus kõigile kasutatavaks.

## Register

| jaotusalgoritmi tunnus | failid | lubatud vahemikud | nõutavad kontrollarvud | staatus |
| ---------------------- | ------ | ----------------- | ---------------------- | ------- |
| [`pdf-pages-v1`](#pdf-pages-v1) | PDF | ainult `PageRange` | `PageCount` | mustand |
| [`plaintext-blocks-v1`](#plaintext-blocks-v1) | lihttekst | `ParagraphRange`, `WordRange` | `ParagraphCount`, `WordCount` | mustand |

**Mustandi staatus tähendab järgmist.** Kuni laiendus `granularAccess` on mustand, on ka need määratlused mustandid ja neid VÕIB veel muuta. Muutumatuse reegel („tunnuse tähendus EI TOHI kunagi muutuda“) hakkab tunnuse kohta kehtima siis, kui tunnust on kasutatud vahetatud dokumentides — mustandi ajal tootmisvahetust ei toimu, seega saab määratlust veel parandada. Laienduse esimese lõpliku versiooniga külmuvad mõlemad määratlused jäädavalt.

## Kuidas määratlust lugeda

Iga määratlus esitab samad osad. Pealkirjades on tunnus sulgudes, et samanimelised osad oleksid eri määratluste vahel eristatavad (nt „Ulatus (pdf-pages-v1)“).

* **Ulatus** — millistele failidele algoritm kohaldub.
* **Lubatud vahemikud** — milliseid kolmest vahemikuliigist selle tunnusega kasutada tohib. Ülejäänute kasutamine on viga ja toob kaasa kogu laiendusploki kõrvaleheitmise (vt [Vigane plokk](granularAccess#vigane-plokk)).
* **Nummerdamine** — kuidas ühikud loendatakse. Mitut ühikuliiki määratlev algoritm võib selle jaotada ühikuliikide kaupa (nt „Lõikude nummerdamine“ ja „Sõnade nummerdamine“), ning lisada vormingust tulenevaid osi, nagu kodeering või reavahetused.
* **Nõutavad kontrollarvud** — millised elemendi `SegmentationCheck` loendid tuleb selle tunnuse puhul esitada ja mida vastuvõtja kontrollib. Loendit, mida algoritm ei määratle, EI TOHI esitada. Skeem nõuab vähemalt üht loendit, kuid ei tea, millised on õiged — seda ütleb ainult käesolev register, mistõttu rakendus PEAB seda ise kontrollima.
* **Servajuhud** — olukorrad, mille kohta teostused muidu erineksid.
* **Mida algoritm ei kata** — failisisu, mis vahemikega kirjeldatav ei ole. See osa on ohutuse seisukohalt kõige olulisem: kui failis on piiratud teavet väljaspool algoritmi katet, ei piisa vahemikest ja fail PEAB jääma tervikuna `AK`-ks.

---

## pdf-pages-v1

Leheküljetäpsusega jaotus PDF-failidele. Mõeldud eelkõige skaneeritud dokumentidele, esitlusslaididele ja muudele failidele, mille lehekülgi saab eraldi kinni katta, kuid mille sisu ei ole usaldusväärselt lõikudeks ega sõnadeks jaotatav.

### Ulatus (pdf-pages-v1)

PDF-failid (`application/pdf`), sõltumata PDF-i versioonist.

Tunnus EI OLE kohaldatav failile, mille lehekülgi ei saa loendada — näiteks krüpteeritud failile, mille avamiseks võti puudub, või vigasele failile, mille leheküljepuud ei õnnestu läbida. Sellisel juhul PEAB fail jääma tervikuna `AK`-ks.

### Lubatud vahemikud (pdf-pages-v1)

Ainult `PageRange`.

`ParagraphRange` ja `WordRange` kasutamine selle tunnusega on **keelatud**. Põhjus on tahtlik: PDF-i tekstisisu eraldamise tulemus sõltub teegist, fondi kodeeringutest ja lehekülje ülesehitusest, mistõttu kaks teostust jõuaksid erineva sõnade loenduseni. Skaneeritud lehekülgedel puudub masinloetav tekst üldse.

### Nummerdamine

Lehekülgi loendatakse **1-st**, failisisese järjekorra alusel:

1. Võetakse dokumendi kataloogi (`/Root`) element `/Pages` — leheküljepuu juur.
2. Puud läbitakse **sügavuti**, järgides igas sõlmes elemendi `/Kids` massiivi järjekorda.
3. Loendatakse ainult lehtsõlmi (`/Type /Page`). Vahesõlmi (`/Type /Pages`) ei loendata.

Saadud järjekord on sama, mida näitab lehekülgede kaupa liikuv vaatur. Leheküljepuu VÕIB olla mitmetasandiline — seda tulebki läbida puuna, mitte lugeda faili objektide esinemise järjekorda, mis võib erineda.

**Number on lehekülje asukoht failis, mitte leheküljele trükitud number.** Need erinevad sageli: tiitelleht võib olla nummerdamata, sisukord rooma numbritega, skaneeritud köide võib alata originaali leheküljelt 47. Ka elementi `/PageLabels`, mis kirjeldab vaaturis kuvatavaid leheküljesilte, EI arvestata — enamikus failides see puudub.

### Nõutavad kontrollarvud (pdf-pages-v1)

`PageCount` — lehekülgede koguarv failis, loendatuna eespool kirjeldatud viisil.

`ParagraphCount` ja `WordCount` EI TOHI esineda, sest see tunnus lõike ega sõnu ei määratle.

Saatja esitab arvu, milleni ta ise jõudis; vastuvõtja läbib leheküljepuu ja võrdleb. Erinevus tähendab, et pooled mõistavad faili leheküljestruktuuri erinevalt — tavaline põhjus on teisiti läbitud mitmetasandiline leheküljepuu või vigane `/Count` —, mistõttu ka leheküljenumbrid ei tähenda mõlemale sama. Sel juhul PEAB vastuvõtja jääma faili tasandile (vt [Jaotuse kontroll](granularAccess#jaotuse-kontroll)).

### Servajuhud (pdf-pages-v1)

| olukord | tulemus |
| ------- | ------- |
| Üheleheküljeline fail | Ainus lehekülg on nr 1. |
| Lehekülgede erinev suurus või pööre (`/Rotate`) | Ei mõjuta nummerdamist. |
| Mitmetasandiline leheküljepuu | Läbitakse sügavuti; vahesõlmi ei loendata. |
| `/Count` ei ühti tegelike lehtsõlmede arvuga | Fail on vigane; tunnus ei ole kohaldatav, fail jääb `AK`-ks. |
| Lisatud (inkrementaalselt uuendatud) fail | Loendatakse viimase, kehtiva `/Root` järgi. |

### Mida algoritm ei kata (pdf-pages-v1)

Lehekülje kinnikatmine eemaldab ainult selle lehekülje **sisu**. PDF-is on aga andmeid, mis ei kuulu ühelegi leheküljele ja jäävad lehekülgede eemaldamisel alles:

* dokumendi metaandmed (`/Info`, XMP) — sealhulgas pealkiri, autor, märksõnad;
* manustatud failid (`/EmbeddedFile`) ja failimanused;
* järjehoidjad ja sisukorrapuu (`/Outlines`), mille pealkirjad võivad kirjeldada kaetud lehekülje sisu;
* vormiväljade väärtused (`/AcroForm`), mis ei pruugi paikneda lehekülje sisuvoos;
* kommentaarid ja märkmed, mis viitavad kaetud leheküljele;
* digiallkirjad ja nende metaandmed.

> **Kui piiratud teave esineb mõnes neist, ei piisa `PageRange` vahemikest ja fail PEAB jääma tervikuna `AK`-ks.** Saatja vastutab selle kontrollimise eest enne osa tasandi kirjeldamist.

Samuti tuleb arvestada, et **lehekülje kinnikatmine tähendab uue faili koostamist**. Vastuvõtja, kes avaldab osa failist, EI TOHI avaldada algset faili koos juhisega lehekülgi mitte vaadata — piiratud leheküljed PEAB failist tegelikult eemaldama.

### Näide (pdf-pages-v1)

Viieleheküljeline skaneeritud PDF, mille leheküljed 4–5 sisaldavad ärisaladust:

```xml
<SegmentationMethod>pdf-pages-v1</SegmentationMethod>
<SegmentationCheck>
  <PageCount>5</PageCount>
</SegmentationCheck>
<DefaultPartAccessConditionsCode>Avalik</DefaultPartAccessConditionsCode>
<AccessGroup>
  <Access>
    <AccessConditionsCode>AK</AccessConditionsCode>
    <AccessRestriction>
      <RestrictionIdentifier>AvTS§35p1p17</RestrictionIdentifier>
      <RestrictionBeginDate>2012-11-11</RestrictionBeginDate>
      <RestrictionEndDate>2017-11-11</RestrictionEndDate>
      <RestrictionBasis>Avaliku teabe seadus §35 lg 1 p 17</RestrictionBasis>
      <InformationOwner>Riigi Infosüsteemi Amet</InformationOwner>
    </AccessRestriction>
  </Access>
  <PageRange>
    <StartPage>4</StartPage>
    <EndPage>5</EndPage>
  </PageRange>
</AccessGroup>
```

Vastuvõtja avaldab leheküljed 1–3.

---

## plaintext-blocks-v1

Lõigu- ja sõnatäpsusega jaotus lihttekstifailidele. Lihttekst on kõige lihtsam vorming, mille jaotust saab täpselt reprodutseerida, ja seetõttu sobiv esimene näide osa tasandi täpsemast kirjeldamisest.

### Ulatus (plaintext-blocks-v1)

Lihttekstifailid (`text/plain`).

Tunnus EI OLE kohaldatav failile, mis ei ole kehtiv UTF-8 (vt kodeeringut allpool), ega vormindatud tekstile (`.doc`, `.docx`, `.odt`, `.rtf`, HTML, Markdown). Vormindatud teksti jaoks on vaja eraldi tunnust: seal sõltub lõikudeks jaotamine dokumendi struktuurist, mitte tühjadest ridadest, ning arvestada tuleb tabeleid, joonealuseid märkusi, tekstikaste, päiseid ja jaluseid.

### Lubatud vahemikud (plaintext-blocks-v1)

`ParagraphRange` ja `WordRange`.

`PageRange` kasutamine on **keelatud** — lihttekstil ei ole lehekülgi. Kuvatav reamurdmine ja trükitavad leheküljed sõltuvad vaaturist, mitte failist.

### Kodeering

Faili sisu tõlgendatakse **UTF-8** kodeeringus. Kui fail ei ole kehtiv UTF-8, ei ole tunnus kohaldatav ja fail PEAB jääma tervikuna `AK`-ks — muu kodeering vajab eraldi tunnust, sest kodeeringu vahetamine muudab märgipiire ja seega sõnade arvu.

Faili alguses olev baidijärjestuse märk (BOM, U+FEFF) **jäetakse arvestamata**: seda ei loeta märgiks ega sõna osaks.

### Reavahetused

Reavahetusena käsitatakse kõiki kolme jada: `LF` (U+000A), `CRLF` (U+000D U+000A) ja üksik `CR` (U+000D). Iga neist lõpetab rea.

Faili lõpus olev reavahetus **ei loo** uut rida. Seega on failidel `"abc"` ja `"abc\n"` mõlemal üks rida.

### Tühimärgid

Tühimärgiks loetakse **täpselt** need märgid:

| märk | nimi |
| ---- | ---- |
| U+0009 | tabulaator |
| U+000A | reavahetus (LF) |
| U+000B | vertikaaltabulaator |
| U+000C | lehevahetus (FF) |
| U+000D | reavahetus (CR) |
| U+0020 | tühik |

Kõiki muid märke loetakse sisumärkideks. **Eraldi tähelepanu:** katkematu tühik (NBSP, U+00A0), kitsas katkematu tühik (U+202F), Unicode’i muud tühikud (U+2000–U+200A) ja nullilaiusega tühik (U+200B) **ei ole** siinses mõttes tühimärgid, vaid kuuluvad sõna sisse. Loetelu on tahtlikult lõplik: Unicode’i klassi `Zs` koosseis sõltub Unicode’i versioonist ja ei sobi muutumatu tunnuse aluseks.

### Lõikude nummerdamine

**Tühi rida** on rida, mis ei sisalda ühtki märki või sisaldab ainult tühimärke.

**Lõik** on maksimaalne järjestikuste mittetühjade ridade jada. Lõike loendatakse **1-st** faili alguse poolt lugedes.

Sellest järeldub:

* Tühjad read ei kuulu ühtegi lõiku.
* Mitu järjestikust tühja rida ei loo tühje lõike — mistahes pikkusega tühjade ridade jada on üksainus lõikude eraldaja.
* Faili alguses ja lõpus olevad tühjad read ei loo lõike.
* Ainult tühimärke sisaldav rida eraldab lõike samamoodi nagu täiesti tühi rida.

### Sõnade nummerdamine

**Sõna** on maksimaalne järjestikuste mittetühimärkide jada.

Sõnu loendatakse **1-st üle terve faili**, mitte igas lõigus uuesti — nii nagu näeb ette laienduse `WordRange` (vt [Vahemikud](granularAccess#vahemikud)). Seega saab sõnavahemiku märkida seda sisaldavat lõiku loetlemata.

Kirjavahemärgid kuuluvad sõna sisse: `Männik,` on üks sõna, `isikukood:` on üks sõna. Sidekriipsuga liitsõna `e-post` on üks sõna. See on tahtlik lihtsustus — keelepõhine sõnapiiride tuvastamine ei ole eri teostustes korratav.

### Nõutavad kontrollarvud (plaintext-blocks-v1)

`ParagraphCount` — lõikude koguarv failis. `WordCount` — sõnade koguarv üle terve faili. Mõlemad on kohustuslikud, sest mõlemat ühikut saab selle tunnusega vahemikes kasutada.

`PageCount` EI TOHI esineda, sest see tunnus lehekülgi ei määratle.

Kaks arvu kontrollivad eri asju ja seetõttu esitatakse mõlemad. Lõikude arvu erinevus osutab tavaliselt tühja rea erinevale tõlgendamisele — näiteks ainult tabulaatoritest koosnev rida, mida üks teostus tühjaks ei loe, liidab kaks lõiku üheks ja nihutab kõiki järgnevaid lõigunumbreid. Sõnade arvu erinevus osutab erinevale arusaamale tühimärkidest või sõnapiiridest; see võib esineda ka siis, kui lõikude arv ühtib. Kui kas või üks arv erineb, PEAB vastuvõtja jääma faili tasandile (vt [Jaotuse kontroll](granularAccess#jaotuse-kontroll)).

### Servajuhud (plaintext-blocks-v1)

| olukord | tulemus |
| ------- | ------- |
| Tühi fail (0 baiti) | 0 lõiku, 0 sõna. Osa tasandil kirjeldada pole midagi. |
| Ainult tühimärke sisaldav fail | 0 lõiku, 0 sõna. |
| Fail ilma ühegi tühja reata | 1 lõik, mis hõlmab kõiki ridu. |
| Fail, mis algab tühjade ridadega | Esimene lõik on esimene mittetühi rida; lõik nr 1 ei ole tühi. |
| Ainult BOM-i sisaldav fail | 0 lõiku, 0 sõna (BOM jäetakse arvestamata). |
| Rida ainult tabulaatoritest | Tühi rida; eraldab lõike. |

### Mida algoritm ei kata (plaintext-blocks-v1)

Lihttekstifailis on kogu sisu tekst, mistõttu kate on täielikum kui PDF-i puhul. Arvestada tuleb:

* **Failinimi** ei ole faili sisu ega kuulu ühtegi lõiku. Kui failinimi avaldab piiratud teabe, kasutatakse elementi `PublicFileName` (vt [Avalik pealkiri, lühiesitus ja failinimed](granularAccess#avalik-pealkiri-l%C3%BChiesitus-ja-failinimed)).
* **Kinnikatmine tähendab uue faili koostamist.** Vastuvõtja PEAB piiratud lõigud või sõnad failist tegelikult eemaldama, mitte avaldama algset faili koos juhisega neid mitte lugeda.
* **Sõna eemaldamine võib jätta sisu tuletatavaks.** Kui alles jääb „isikukood on ⟨eemaldatud⟩ ja ta elab Tallinnas“, võib piiratud teave olla ümbritsevast järeldatav. Selle hindamine on saatja vastutus: tunnus annab jaotuse, mitte otsuse, kas jaotus on piisav.

### Näide (plaintext-blocks-v1)

Fail `teade.txt` (`␣` tähistab tühikut, `⏎` reavahetust):

```text
 1  Ettepanek⏎
 2  ⏎
 3  Palume kaaluda uue lahenduse⏎
 4  kasutuselevõttu. Kontakt: 38001085718⏎
 5  ␣␣␣⏎
 6  ⏎
 7  Lugupidamisega⏎
 8  Jaak-Kristjan Jõeorg⏎
```

Jaotus:

| lõik | read | sõnad |
| ---- | ---- | ----- |
| 1 | 1 | 1: `Ettepanek` |
| 2 | 3–4 | 2: `Palume`, 3: `kaaluda`, 4: `uue`, 5: `lahenduse`, 6: `kasutuselevõttu.`, 7: `Kontakt:`, 8: `38001085718` |
| 3 | 7–8 | 9: `Lugupidamisega`, 10: `Jaak-Kristjan`, 11: `Jõeorg` |

Tähelepanuväärne:

* Rida 5 sisaldab ainult tühikuid ja read 5–6 moodustavad **ühe** eraldaja — lõik 2 lõpeb real 4 ja lõik 3 algab real 7. Tühje lõike vahele ei teki.
* Lõik 2 hõlmab kaht rida; reavahetus lõigu sees lõiku ei katkesta.
* Sõnu loendatakse üle terve faili, seega on lõigu 3 esimene sõna nr 9, mitte nr 1.
* `Jaak-Kristjan` on **üks** sõna, mitte kaks — sidekriips ei ole tühimärk (vt [Sõnade nummerdamine](#s%C3%B5nade-nummerdamine)). Seetõttu on faili sõnade koguarv 11, mitte 12.

Kui piiratud teave on ainult isikukood (sõna 8), piisab ühest sõnavahemikust:

```xml
<SegmentationMethod>plaintext-blocks-v1</SegmentationMethod>
<SegmentationCheck>
  <ParagraphCount>3</ParagraphCount>
  <WordCount>11</WordCount>
</SegmentationCheck>
<DefaultPartAccessConditionsCode>Avalik</DefaultPartAccessConditionsCode>
<AccessGroup>
  <Access>
    <AccessConditionsCode>AK</AccessConditionsCode>
    <AccessRestriction>
      <RestrictionIdentifier>AvTS§35p1p12</RestrictionIdentifier>
      <RestrictionBeginDate>2012-11-11</RestrictionBeginDate>
      <RestrictionEndDate>2087-11-11</RestrictionEndDate>
      <RestrictionBasis>Avaliku teabe seadus §35 lg 1 p 12</RestrictionBasis>
      <InformationOwner>Riigi Infosüsteemi Amet</InformationOwner>
    </AccessRestriction>
  </Access>
  <WordRange>
    <StartWord>8</StartWord>
    <EndWord>8</EndWord>
  </WordRange>
</AccessGroup>
```

Tähelepanu tuleb pöörata piirangu pikale lõpptähtajale: isikuandmeid sisaldava teabe juurdepääsupiirang kestab AvTS § 40 lõike 3 järgi 75 aastat, samal ajal kui ülejäänud dokumendi piirang lõpeb 5 aasta pärast. Just seepärast kannab iga `AccessGroup` oma täielikku `AccessRestriction` kirjeldust.

---

## Millele algoritmi veel ei ole

Registris puuduva failitüübi osa tasandil kirjeldada ei saa — sellised failid jäävad faili tasandile. See ei ole viga ega takista laienduse kasutamist: failide kaupa eristamine on laienduse esmane eesmärk.

Kõige olulisem puuduv juhtum on **vormindatud tekst** (`.doc`, `.docx`, `.odt`, `.rtf`, HTML). Lõikudeks jaotamine sõltub seal dokumendi struktuurist, mitte tühjadest ridadest, ning arvestada tuleb tabeleid, joonealuseid märkusi, tekstikaste, päiseid, jaluseid ja jälitatud muudatusi. Sõltumatud teostused jõuavad hõlpsasti erineva lõikude ja sõnade loenduseni, ning sõnavahemiku nihkumine ühe võrra tähendab, et avaldatakse isikukood, mis pidi jääma avaldamata. Selle vormingu algoritm vajab seetõttu hoolikat spetsifitseerimist ja on kavas eraldi tööna.

Kuni algoritm puudub, kirjeldatakse vormindatud tekstifaile ainult faili tasandil. Kui faili avalik osa tuleb siiski avaldada, on kaks võimalust:

1. **Kinnikaetud koopia** — saatja lisab dokumendile algse faili koopia, millest piiratud osad on eemaldatud, ja märgib koopia `Avalik`-uks. Algne fail jääb `AK`-ks. See töötab ka siis, kui kumbki pool osa tasandit ei toeta, ja säilitab faili vormingu. Vt [Kinnikaetud koopia avaliku versioonina](granularAccess#kinnikaetud-koopia-avaliku-versioonina) — sealhulgas seda, mille eest saatja seejuures vastutab.
2. **Teisendamine lihttekstiks**, mille järel saab kasutada tunnust [`plaintext-blocks-v1`](#plaintext-blocks-v1). Annab masinloetava osa tasandi kirjelduse, kuid kaotab vorminduse ja võib kaotada sisu, mida lihttekst ei kanna (tabelid, joonealused märkused, tekstikastid).

## Uue algoritmi lisamine

Uue jaotusalgoritmi määratlemise ja avaldamise kord on kirjeldatud laienduse dokumendis: [Uue SegmentationMethod kasutuselevõtt](granularAccess#uue-segmentationmethod-kasutuselev%C3%B5tt).

Uus määratlus lisatakse käesolevasse registrisse. Registri täienemine **ei muuda** laiendust `granularAccess` ega selle skeemi ja ei nõua laienduse uut versiooni.

## Tagasiside

Määratlused on mustandi staatuses. Ettepanekud ja märkused on oodatud [DHX hoidla](https://github.com/e-gov/DHX) kaudu.
