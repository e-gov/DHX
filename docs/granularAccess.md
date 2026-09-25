# Kapsli laiendus granularAccess

**Staatus: MUSTAND (versioon 0.1-draft).** Spetsifikatsioon ei ole veel lõplik ja on avaldatud tagasiside kogumiseks. Struktuuri üksikasjad võivad muutuda.

Läbiva suurtähega esitatud sõnu PEAB, PEAKS, VÕIB ja EI TOHI tuleb tõlgendada nii, nagu need on määratletud [DHX protokolli](index) jaotises 2 „Nõuete keel“ (vrdl RFC 2119). Nõuete koond on jaotises [Nõuete loend](#n%C3%B5uete-loend).

Tehniline dokumentatsioon:

* [granularAccess.xsd](v2.1/granularAccess.xsd)
* [GranularAccessExample1.xml](v2.1/GranularAccessExample1.xml)
* [Jaotusalgoritmid](segmentationMethods) — avaldatud `SegmentationMethod` tunnuste register

## Sisukord

* [Milleks laiendus on](#milleks-laiendus-on)
* [Ühilduvus](#%C3%BChilduvus)
  * [Valideerimine](#valideerimine)
  * [Vigane plokk](#vigane-plokk)
  * [Mida skeem kontrollib ja mida mitte](#mida-skeem-kontrollib-ja-mida-mitte)
* [Töötlusjärjekord](#t%C3%B6%C3%B6tlusj%C3%A4rjekord)
* [Struktuur](#struktuur)
  * [File](#file)
  * [Avalik pealkiri, lühiesitus ja failinimed](#avalik-pealkiri-l%C3%BChiesitus-ja-failinimed)
  * [DefaultPartAccessConditionsCode](#defaultpartaccessconditionscode)
  * [Vahemikud](#vahemikud)
  * [SegmentationMethod](#segmentationmethod)
  * [Jaotuse kontroll](#jaotuse-kontroll)
  * [Uue SegmentationMethod kasutuselevõtt](#uue-segmentationmethod-kasutuselev%C3%B5tt)
  * [Avaldamata tunnus](#avaldamata-tunnus)
  * [AccessGroup](#accessgroup)
* [Näited](#n%C3%A4ited)
  * [Avalik fail piiratud dokumendis](#avalik-fail-piiratud-dokumendis)
  * [Valdavalt avalik fail üksikute piiratud kohtadega](#valdavalt-avalik-fail-%C3%BCksikute-piiratud-kohtadega)
  * [Skaneeritud PDF](#skaneeritud-pdf)
  * [Kinnikaetud koopia avaliku versioonina](#kinnikaetud-koopia-avaliku-versioonina)
* [Laienduse edasiarendamine](#laienduse-edasiarendamine)
  * [Uus laiendus vana kõrvale](#uus-laiendus-vana-k%C3%B5rvale)
  * [Kuidas eri süsteemid seda loevad](#kuidas-eri-s%C3%BCsteemid-seda-loevad)
  * [Juurdepääsu täpsustamine sama faili kohta](#juurdep%C3%A4%C3%A4su-t%C3%A4psustamine-sama-faili-kohta)
* [Mida laiendus ei kata](#mida-laiendus-ei-kata)
* [Nõuete loend](#n%C3%B5uete-loend)
* [Tagasiside](#tagasiside)

## Milleks laiendus on

[Kapslis](Kapsel) kirjeldab juurdepääsutingimust üksainus element `DecContainer/Access`, mis kehtib terve dokumendi ja kõigi selle failide kohta. Kui dokumendis on kasvõi üks piiranguga fail, tuleb kogu dokument tunnistada asutusesiseseks (AK) — ka siis, kui suurem osa sellest on tegelikult avalik.

Avaliku teabe seaduse § 38 lõige 2 näeb ette teistsuguse tulemuse:

> Kui teabele juurdepääsu võimaldamine võib põhjustada juurdepääsupiiranguga teabe avalikuks tulemise, siis tagatakse juurdepääs üksnes sellele osale teabest või dokumendist, mille kohta juurdepääsupiirangud ei kehti.

**Milline norm mida nõuab.** § 38 lõige 2 paneb kohustuse teabevaldajale teabenõudele vastamisel — see ei nõua, et juurdepääsupiirang oleks dokumendis osade kaupa märgitud. Piirangu märkimist ennast reguleerivad § 40 (tähtajad) ja § 41 (märke tegemine). Käesolev laiendus ei täida § 38 lõike 2 kohustust, vaid **valmistab selle täitmise ette**: kui dokumendiga liigub kaasa masinloetav kirjeldus sellest, milline osa ei ole piiratud, saab vastuvõttev asutus hiljem teabenõudele vastates avaldada just selle osa — ilma et keegi peaks dokumendi uuesti läbi töötama ja otsustama, mis on avalik. Ilma niisuguse kirjelduseta on osaline avaldamine käsitöö, ja käsitsi tehtav otsus jäetakse praktikas sageli tegemata, tunnistades kogu dokumendi asutusesiseseks.

Laiendus `granularAccess` võimaldab kirjeldada, millised tervikuna piiratud dokumendi **failid** on tegelikult avalikud, ja vajaduse korral ka millised faili **osad** (leheküljed, lõigud, sõnad) on avalikud. Nii saab vastuvõttev süsteem hiljem teabenõudele vastates avaldada just selle osa, mille kohta piirang ei kehti. Lisaks saab laiendusega edastada dokumendi **avalikustatava pealkirja, lühiesituse ja failinimed**, sest ka pealkiri, lühiesitus või failinimi võib ise piiratud teavet avaldada.

Laienduse praktiline põhieesmärk on eristada avalikke faile piiratutest. Osa tasandi kirjeldus on ette nähtud peamiselt tulevikuks — see on olemas siis, kui dokumendihaldussüsteemid suudavad seda luua ja töödelda.

## Ühilduvus

Laiendus **ei muuda** `Kapsel.xsd` faili. Ta paigutatakse elementi `RecordTypeSpecificMetadata`, mis on kapslis ainus laiendamiseks mõeldud koht (`xs:any processContents="skip"`). Seetõttu:

* Laiendust mittetundev rakendus töötab täpselt nagu varem, kasutades ainult `DecContainer/Access` väärtust. Ta ei pea kapsli töötlemist muutma ega laiendust valideerima.
* Laiendust tundev rakendus saab lisaks avada faile või failiosi.

Ühilduvuse tagab üks reegel.

> **Ühilduvusreegel.** Iga tasand PEAB olema vähemalt niivõrd piirav kui kõik sellesse kuuluvad tasandid.
>
> `DecContainer/Access` ⊇ `File/Access` ⊇ `AccessGroup/Access`

Juurdepääs muutub dokumenti süvenedes seega ainult **leebemaks**, mitte kunagi rangemaks. Rakendus, mis peatub mis tahes tasandil, ei anna kunagi juurdepääsu millelegi, mida võimekam rakendus peaks piirama — halvimal juhul on tulemus vajalikust konservatiivsem.

Sellest järeldub kaks asja, mida on lihtne valesti teha:

* Kui failis on kasvõi üks piiratud osa, PEAB `File/Access` olema `AK`. Faili EI TOHI märkida `Avalik`, lootes et piiratud osad tulevad allpool olevatest `AccessGroup` elementidest — faili tasandil peatuv rakendus avaldaks siis terve faili.
* Kui `DecContainer/Access` on `Avalik`, on kogu dokument juba avalik ja laiendusel ei ole midagi avada. Sellisel dokumendil EI TOHIKS laiendust üldse olla.

### Valideerimine

Laiend paikneb `xs:any processContents="skip"` metamärgi taga. See tähendab, et **kapsli skeemikontroll ei puuduta laiendust üldse** — [DHX protokolli](index) jaotise 8.3 nõue („Vastuvõttev süsteem PEAB kontrollima, et dokument tuli nõuetekohases kapslis. Kontroll PEAB sisaldama vähemalt XML skeemile vastavuse kontrollimist“) on täidetud ka siis, kui laiendusplokk on täiesti vigane.

Seetõttu PEAB rakendus, kes kavatseb laiendust kasutada:

1. valideerima ploki `granularAccess.xsd` järgi;
2. kontrollima neid reegleid, mida skeem väljendada ei suuda (vt allpool).

### Vigane plokk

> **Kui plokk ei valideeru või rikub mõnda käesoleva spetsifikatsiooni reeglit, PEAB rakendus kogu laienduse eirama ja rakendama terve dokumendi kohta `DecContainer/Access` väärtust.**

Rakendus **EI TOHI** plokki osaliselt töödelda ega toimida nende `File` kirjete alusel, mis juhtumisi on korrektsed. Reegli rikkumine tähendab, et koostaja tahe ei ole usaldusväärselt teada, ning vigase kirjelduse loetavate osade päästmine on tõenäoliseim viis piiratud sisu avaldamiseks. Kogu ploki kõrvaleheitmine on alati ohutu, sest `DecContainer/Access` ei ole kunagi leebem kui miski, mida laiend kirjeldab.

Koos plokiga kaovad ka `PublicRecordTitle`, `PublicRecordAbstract` ja `PublicFileName` ning rakendus kuvab metaandmeid täpselt nii, nagu ta teeks laiendust tundmata: kapsli enda väärtuste ja oma avaldamisreeglite alusel. Piiratud dokumendi metaandmete avaldamine on vastuvõtva asutuse otsustus juba praegu ja laiendus seda üle ei võta (vt [Avalik pealkiri, lühiesitus ja failinimed](#avalik-pealkiri-l%C3%BChiesitus-ja-failinimed)).

### Mida skeem kontrollib ja mida mitte

Osa reegleid on skeemis jõustatud, osa mitte — XSD 1.0 ei suuda neid väljendada. Vahe on oluline: teise rühma reegleid PEAB rakendus ise kontrollima, sest vigane plokk läbib skeemikontrolli.

| reegel | kontrollib |
| ------ | ---------- |
| Iga `FileGuid` esineb kuni üks kord (täpsel võrdlusel) | skeem |
| Kaks `FileGuid` väärtust ei lange kokku ka tõstutundetul võrdlusel | **rakendus** |
| Iga `AccessGroup` sisaldab vähemalt üht vahemikku | skeem |
| `SegmentationCheck` sisaldab vähemalt üht loendit | skeem |
| `SegmentationCheck` sisaldab täpselt neid loendeid, mida jaotusalgoritm nõuab | **rakendus** |
| `SegmentationMethod`, `SegmentationCheck`, `DefaultPartAccessConditionsCode` ja `AccessGroup` esinevad kas koos või üldse mitte | skeem |
| Elemendi `SegmentationCheck` loendid ühtivad rakenduse enda jaotuse tulemusega | **rakendus** |
| Fail, mille `Access` on `Avalik`, ei sisalda ühtki `AccessGroup` elementi | **rakendus** |
| Ükski tasand ei ole rangem kui teda ümbritsev (ühilduvusreegel) | **rakendus** |
| Vahemiku lõppväärtus ei ole väiksem kui algusväärtus | **rakendus** |
| Sama faili erinevate `AccessGroup` elementide vahemikud ei kattu | **rakendus** |
| `Avalik` koodiga `Access` ei kanna `AccessRestriction` elementi | **rakendus** |

## Töötlusjärjekord

Laiendust tundev rakendus PEAB ploki esmalt valideerima ja kontrollima skeemiväliseid reegleid (vt [Valideerimine](#valideerimine)). Vigase ploki korral PEAB kogu laienduse eirama. Seejärel liigub ta tasandite kaupa ja peatub esimesel tasandil, mida ta ei suuda töödelda.

1. **Dokument.** Kui `DecContainer/Access/AccessConditionsCode` on `Avalik`, on kogu dokument koos failidega avalik. `RecordTypeSpecificMetadata` elementi ei ole vaja uurida.
2. **Fail.** Kui dokumendi kood on `AK`, otsib rakendus iga `DecContainer/File` jaoks üles `granularAccess/File` kirje, mille `FileGuid` ühtib. Fail, millel kirje puudub või millel puudub oma `Access`, jääb piiratuks nagu ütleb `DecContainer/Access`.
3. **Avalik fail.** Kui kirje `Access/AccessConditionsCode` on `Avalik`, on terve fail avalik. Rakendus peatub siin — selle faili `AccessGroup` elemente ei ole vaja uurida ja neid EI TOHI ka olla.
4. **Jaotusalgoritm.** Kui kood on `AK`, on fail tervikuna piiratud, kuid selle osad võivad olla avalikud. Rakendus VÕIB osa tasandile laskuda **ainult siis**, kui ta tunneb faili `SegmentationMethod` väärtust ja suudab jaotuse täpselt taastada. Kui element puudub või väärtus on tundmatu, PEAB rakendus peatuma ja rakendama terve faili kohta faili enda `Access` väärtust.
5. **Jaotuse kontroll.** Jaotusalgoritmi tundes jaotab rakendus faili ise ja võrdleb oma ühikute koguarve elemendiga `SegmentationCheck`. Kui mõni tunnuse poolt nõutav loend erineb, PEAB rakendus peatuma ja rakendama terve faili kohta faili enda `Access` väärtust — täpselt nagu tundmatu tunnuse korral (vt [Jaotuse kontroll](#jaotuse-kontroll)).
6. **Osad.** Loendite ühtimisel loeb rakendus `DefaultPartAccessConditionsCode` välja ja rakendab seejärel iga `AccessGroup` väärtust selles loetletud vahemike kohta. See element on osa tasandil kirjeldatud faili puhul alati olemas, sest skeem nõuab seda koos `SegmentationMethod`, `SegmentationCheck` ja `AccessGroup` elementidega.

## Struktuur

```text
granularAccess
├── PublicRecordTitle                 (0..1)  avalikustatav dokumendi pealkiri
├── PublicRecordAbstract              (0..1)  avalikustatav sisu lühiesitus
└── File                              (0..n)  FileGuid on unikaalne
    ├── FileGuid                              viide DecContainer/File failile
    ├── PublicFileName                (0..1)  avalikustatav failinimi
    ├── Access                        (0..1)  terve faili juurdepääsutingimus
    └── ─── osa tasand: kas kõik või mitte ühtki ───  (0..1)
        ├── SegmentationMethod                jaotusalgoritmi tunnus
        ├── SegmentationCheck                 jaotuse ühikute koguarvud
        │   ├── PageCount                (0..1)  kui algoritm nõuab
        │   ├── ParagraphCount           (0..1)  kui algoritm nõuab
        │   └── WordCount                (0..1)  kui algoritm nõuab
        ├── DefaultPartAccessConditionsCode   katmata osade tingimus
        └── AccessGroup                (1..n)
            ├── Access                        rühma juurdepääsutingimus
            └── vähemalt üks vahemik   (1..n) suvalises järjekorras:
                ├── PageRange                 StartPage, EndPage
                ├── ParagraphRange            StartParagraph, EndParagraph
                └── WordRange                 StartWord, EndWord
```

`Access` on nii `File` kui `AccessGroup` tasandil struktuurilt samasugune kui kapsli `DecContainer/Access`: `AccessConditionsCode` (`Avalik` või `AK`) ja korduv `AccessRestriction`.

### File

| element | kohustuslik | kirjeldus |
| ------- | ----------- | --------- |
| `FileGuid` | jah | Vastava `DecContainer/File` elemendi `FileGuid`. Nii seotakse juurdepääsukirjeldus failiga. **Iga fail TOHIB esineda kuni üks kord** — skeem jõustab seda. |
| `PublicFileName` | ei | Avalikustatav failinimi. Puudumisel kasutatakse `DecContainer/File/FileName`. |
| `Access` | ei | Terve faili juurdepääsutingimus. Puudumisel kehtib `DecContainer/Access`. |
| `SegmentationMethod` | osa tasandil jah | Faili osadeks jaotamise algoritmi tunnus. |
| `SegmentationCheck` | osa tasandil jah | Jaotuse ühikute koguarvud, mille vastuvõtja arvutab uuesti ja võrdleb. |
| `DefaultPartAccessConditionsCode` | osa tasandil jah | Nende osade tingimus, mida ükski `AccessGroup` ei kata. |
| `AccessGroup` | osa tasandil jah | Vahemike rühmad. Omavad tähendust ainult siis, kui faili `Access` on `AK`. |

Kõiki kapsli faile ei pea loetlema. Loetlemata fail jääb piiratuks koos ülejäänud dokumendiga. Ühtki `File` elementi ei pea üldse esitama — dokument, milles ükski fail ei ole avalik, VÕIB siiski kanda `PublicRecordTitle` ja `PublicRecordAbstract` väärtust.

**Sama faili TOHIB kirjeldada ainult üks kord.** Kaks sama `FileGuid` väärtusega kirjet oleksid vastuolulised — üks võiks öelda `Avalik`, teine `AK` — ja nende vahel valimiseks ei ole alust. Esimese kirje järgi toimiv ja viimase kirje järgi toimiv rakendus avaldaksid erineva sisu, mistõttu skeem lükkab sellise ploki tagasi.

**Tõstutundetu võrdlus on rakenduse ülesanne.** Skeemi kitsendus võrdleb `FileGuid` väärtusi täpselt nii, nagu need on kirjutatud, kuid kapsli `GuidType` lubab mõlemat kuueteistkümnendsüsteemi tähekuju (`[a-fA-F0-9]`). Seetõttu on `25892e17-…` ja `25892E17-…` sama GUID kahel kujul ja skeem neid ei taba. **Rakendus PEAB võrdlema `FileGuid` väärtusi tõstutundetult** ja käsitlema iga kokkulangevust vigase plokina (vt [Vigane plokk](#vigane-plokk)). Põhjendus on sama nagu `SegmentationMethod` tüübistamisel `xs:token`-ina: väärtus, millest sõltub juurdepääsuotsus, ei tohi muutuda kaheks eri väärtuseks tähenduseta erinevuse tõttu.

**Osa tasand on jagamatu.** Neli elementi — `SegmentationMethod`, `SegmentationCheck`, `DefaultPartAccessConditionsCode` ja `AccessGroup` — esinevad kas kõik koos või mitte ühtegi. Nii ei saa tekkida vahemikke, mille numeratsioon on määramata (`SegmentationMethod` puudub), vahemikke, mille aluseks olevat jaotust ei saa kontrollida (`SegmentationCheck` puudub), ega vahemikke, mille kõrval on määramata kõige muu tingimus (`DefaultPartAccessConditionsCode` puudub). Faili, mida kirjeldatakse ainult faili tasandil, puhul jäetakse kõik neli välja.

### Avalik pealkiri, lühiesitus ja failinimed

Piiratud dokumendi puhul on piiratud selle **sisu**, mitte olemasolu: dokumendiregistri kanne on avalik, et isik saaks dokumendi olemasolust teada ja selle kohta teabenõude esitada. Seetõttu on ka tervikuna piiratud dokumendil avalikult nähtav pool — pealkiri, lühiesitus ja failinimed.

Just see pool võib ise avaldada piiratud teabe: `Avaldus Mari-Liis Männiku ravikulude hüvitamiseks` või `AS_Ehitaja_hinnapakkumine.pdf` paljastavad kaitstava sisu juba enne, kui ükski fail on avatud.

Asutused lahendavad seda juba praegu laienduseta: dokumendiregistrisse kantakse piiratud dokumendi kohta üldistatud pealkiri, nagu `Kirjavahetus`. **Laiendus ei võta seda otsustust üle** — milliseid metaandmeid avaldada, otsustab avaldav asutus oma reeglite järgi ka edaspidi.

`PublicRecordTitle`, `PublicRecordAbstract` ja `File/PublicFileName` võimaldavad selle üldistuse **saatja poolel valmis teha** ja dokumendiga kaasa anda. Väärtust, mille saatja on ise avaldatavaks märkinud, ei pea vastuvõtja uuesti koostama ega hindama, kas kapsli oma pealkirja tohib näidata. **Avaldamisel** kasutab rakendus neid kapsli enda väärtuste — `RecordMetadata/RecordTitle`, `RecordMetadata/RecordAbstract` ja `DecContainer/File/FileName` — asemel. Kapsli enda väärtused jäävad seejuures alles ja on endiselt need, mille alusel dokumenti asutusesiseselt käsitletakse: laiendus ei kirjuta neid üle, vaid annab nende kõrvale avaldatava kuju.

* **Need ei asenda vastuvõtja avaldamisreegleid.** Nende puudumine ei ütle, et kapsli enda väärtus on avaldatav, ega vastupidi. Vastuvõtja avaldab metaandmeid oma reeglite järgi nagu praegu; laiendus annab talle ainult valmis üldistatud väärtuse, kui saatja on selle kaasa pannud.
* **Saatja vastutab** selle eest, et esitatud väärtus on tõepoolest avaldatav.
* **Need ei ole juurdepääsutingimused.** Nende kohta ei kehti ühilduvusreegel ega tasandite kaupa laskumine — need on lihtsalt kuvatavad väärtused.
* **Kasulikud ka tervikuna piiratud dokumendi puhul.** Selline dokument tuleb avaldada pärast juurdepääsupiirangu tähtaja möödumist; ette valmistatud avalik pealkiri, lühiesitus ja failinimed liiguvad dokumendiga kaasa, selle asemel et neid aastaid hiljem koostada. Sel juhul võib laiendus koosnedagi ainult `PublicRecordTitle` elemendist.
* **`RecordAbstract` on kapslis ise vabatahtlik**, erinevalt elemendist `RecordTitle`. Kui ei ole kapsli lühiesitust ega `PublicRecordAbstract` elementi, ei ole lihtsalt lühiesitust, mida näidata — see ei ole viga. See, kas dokumendihaldussüsteem lühiesitust üldse avaldab, on süsteemiti erinev, mistõttu `PublicRecordAbstract` on vabatahtlik, mitte eeldatav.

Soovituslik on `PublicRecordTitle` täita alati, kui kapsli pealkiri ei ole avaldatav — nii saab vastuvõtja avaldamiskõlbliku pealkirja sealt, kus see on teada, selle asemel et seda ise üldistada. Sama kehtib `PublicRecordAbstract` kohta siis, kui dokumendil on lühiesitus.

### DefaultPartAccessConditionsCode

See väli otsustab, kumba poolt on vaja loetleda — nii ei pea kunagi kirjeldama kõiki faili osi.

* `Avalik` — katmata osad on avalikud, seega loetletakse `AccessGroup` elementides ainult **piiratud** osad. Sobib valdavalt avalikule failile, kus on üksikud piiratud kohad.
* `AK` — katmata osad pärivad faili piirangu, seega loetletakse ainult **avatavad** osad. Sobib valdavalt piiratud failile, millest avaldatakse üksikud osad.

**Element on osa tasandil kohustuslik.** Väärtus PEAB olema alati otsesõnu kirjas — vaikeväärtust ei ole. Nii on seepärast, et katmata osade tingimus on kogu osa tasandi ohutuse alus: vale eeldus siinkohal avaldab sisu, mida koostaja kavatses piirata. Skeemi vaikeväärtus (`default="AK"`) seda ei lahendaks, sest XSD vaikeväärtus kehtib üksnes elemendile, mis on olemas, kuid tühi — mitte puuduvale elemendile. Vaikeväärtus jätaks seega just olulise juhu katmata ja muudaks pealekauba kehtivaks tühja elemendi.

### Vahemikud

Kõik vahemikud on **kaasavad** (`End...` kuulub vahemikku) ja loendus algab **1-st**. Üht osa katva vahemiku puhul on algus ja lõpp võrdsed.

Kolme liiki vahemikke loendatakse **üksteisest sõltumatult** ja neid võib ühes rühmas segamini kasutada. Sõnavahemikku ei ole seega vaja siduda seda sisaldava lõigu ega leheküljega — sõnad on nummerdatud üle terve faili, mitte lõigu kaupa uuesti alustades.

| vahemik | väljad | märkused |
| ------- | ------ | -------- |
| `PageRange` | `StartPage`, `EndPage` | Lehekülje **asukoht failis**, mitte leheküljele trükitud number (need võivad erineda, nt tiitellehe või rooma numbritega eesosa tõttu). |
| `ParagraphRange` | `StartParagraph`, `EndParagraph` | Lõikude tähendus sõltub algoritmist — nt tabelarvutusfailis võib lõik olla üks rida. |
| `WordRange` | `StartWord`, `EndWord` | Nummerdatud üle terve faili. |

Iga `AccessGroup` PEAB sisaldama vähemalt üht vahemikku — skeem jõustab seda. Vahemikuta rühm kirjeldaks tingimust, mis ei kehti millegi kohta; tõenäoline tahe oli vahemik, mis jäi kirjutamata.

Sama faili erinevate `AccessGroup` elementide vahemikud EI TOHI kattuda. Kattumise korral kehtib kattuva osa kohta **rangem** rühm. Samuti EI TOHI vahemiku lõppväärtus olla väiksem kui algusväärtus. Kumbagi neist ei suuda XSD 1.0 väljendada, mistõttu neid PEAB kontrollima rakendus (vt [Mida skeem kontrollib ja mida mitte](#mida-skeem-kontrollib-ja-mida-mitte)).

### SegmentationMethod

Faili osadeks jaotamise viisi ei saa eeldada: erinevaid failitüüpe jaotatakse erinevalt ning ka ühe tüübi sees on valikukohti (kas leheküljenumbrid, päised ja jalused loetakse kaasa; mis on „sõna“). Seepärast annab `SegmentationMethod` **jaotusalgoritmi tunnuse** — nime, mille alusel mõlemad pooled teavad, millist jaotusalgoritmi kasutada ja kuidas vahemikke seetõttu tõlgendada. Edaspidi nimetatakse seda väärtust ka lühidalt tunnuseks.

Laiendus **teadlikult ei fikseeri kinnist algoritmide loetelu**, et uusi algoritme saaks kasutusele võtta ilma skeemi muutmata. Tunnused avaldatakse eraldi registris: **[Jaotusalgoritmid](segmentationMethods)**, mille täienemine ei nõua laienduse uut versiooni. Soovituslik on, et väärtus näitaks nii meetodit kui selle versiooni (nt `pdf-pages-v1`).

> **Kasutada PEAKS registris avaldatud tunnuseid.** Praegu on määratletud:
>
> * [`pdf-pages-v1`](segmentationMethods#pdf-pages-v1) — PDF-failid leheküljetäpsusega (ainult `PageRange`);
> * [`plaintext-blocks-v1`](segmentationMethods#plaintext-blocks-v1) — lihttekst lõigu- ja sõnatäpsusega (`ParagraphRange`, `WordRange`).
>
> Avaldamata tunnuse kasutamine ei ole keelatud — see on kasutatav täpselt nende osapoolte vahel, kes tunnust tunnevad (vt [Avaldamata tunnus](#avaldamata-tunnus)). Kõigi teiste jaoks jääb fail tervikuna `AK`-ks. Vormindatud teksti (`.doc`, `.docx`, `.odt`) jaoks ei ole tunnust veel määratletud — selliseid faile kirjeldatakse praegu ainult faili tasandil.

Tunnuse andmetüüp on `xs:token`, mitte `xs:string`: ümbritsevad tühimärgid eemaldatakse ja sisemised koondatakse. Rakendused võrdlevad tunnust täpse vastena, mistõttu normaliseerimata jääks omaette reale taandatud väärtus eri tunnuseks ja fail jääks piiratuks üksnes vormistuserinevuse tõttu.

Algoritm määrab ka selle, **millised vahemikuliigid on antud faili puhul üldse tähenduslikud**, ja VÕIB mõne kasutamise keelata. Näiteks skaneeritud PDF-i saab kirjeldada lehekülgede kaupa, kuid mitte lõikude ega sõnade kaupa, sest masinloetavat teksti ei ole. Tabelarvutusfaili saab kirjeldada nii, et iga rida loetakse lõiguks — eraldi lahtri tasandi konstruktsiooni ei ole selleks vaja.

`SegmentationMethod` toimib ühtlasi **väravana** osa tasandi töötlusele: tundmatu või puuduva väärtuse korral peatub rakendus faili tasandil (vt töötlusjärjekorra samm 4). See on turvaline, kuid tähendab, et algoritm on kasutatav täpselt nii laialt, kui laialt selle tunnus on teada — kahepoolselt kokku lepitud algoritmi puhul jääb fail kõigi teiste jaoks piiratuks. Seepärast avaldatakse tunnused keskselt (vt [Uue SegmentationMethod kasutuselevõtt](#uue-segmentationmethod-kasutuselev%C3%B5tt)).

> **Jaotusalgoritmi tunnuse tähendus EI TOHI kunagi muutuda.** Vahetatud dokumentides kasutatud väärtus on jäädav. Muutumatus hõlmab jaotamise viisi, ühikute nummerdamist ja seda, milliseid vahemikuliike selle väärtusega kasutada võib. Iga muudatus nõuab **uut tunnust** (nt `pdf-pages-v2`), mitte ümbermääratlemist — tunnus on ainus alus, mille järgi rakendus otsustab, kas tohib osa tasandile laskuda, nii et muutuv tähendus paneks vana rakenduse rakendama vahemikke, mida ta enam õigesti ei tõlgenda.

### Jaotuse kontroll

Jaotusalgoritmi tunnuse tundmine on rakenduse enda arvamus: ta usub, et teostab selle tunnusega kirjeldatud algoritmi. Kaks teostust võivad mõlemad `plaintext-blocks-v1` väärtust tunda ja siiski lahkneda — üks loeb ainult tabulaatoritest koosneva rea tühjaks, teine mitte —, mis liidab kaks lõiku üheks ja **nihutab kõiki järgnevaid numbreid**. Tagajärg ei ole veateade, vaid vaikne viga: rakendus avaldab enesekindlalt piiratud lõigu naabri või piiratud lõigu enda.

Selle vastu kannab osa tasandil kirjeldatud fail elementi `SegmentationCheck`:

```xml
<SegmentationMethod>plaintext-blocks-v1</SegmentationMethod>
<SegmentationCheck>
  <ParagraphCount>12</ParagraphCount>
  <WordCount>287</WordCount>
</SegmentationCheck>
```

Saatja esitab ühikute koguarvud, milleni ta oma jaotusega jõudis. Vastuvõtja jaotab faili ise ja võrdleb.

> **Kui mõni nõutav loend erineb rakenduse enda arvutatust, EI TOHI rakendus osa tasandile laskuda ja PEAB rakendama terve faili kohta faili enda `Access` väärtust.** Sama tulemus nagu tundmatu jaotusalgoritmi korral: fail jääb tervikuna piiratuks. See on ohutu ja — erinevalt vaiksest lahknevusest — märgatav.

**Millised loendid on nõutavad, otsustab jaotusalgoritm, mitte skeem.** Iga registrikirje ütleb, milliseid elementidest `PageCount`, `ParagraphCount` ja `WordCount` ta nõuab. Loendit, mida algoritm ei määratle, EI TOHI esitada — mitte ka nullina, sest null on tühja faili puhul õiguspärane väärtus. Skeem jõustab ainult **alampiiri**: vähemalt üks loend peab olema esitatud. Seetõttu PEAB **rakendus ise kontrollima, et esitatud on täpselt tunnuse nõutud loendid** — vale loendi esitamine või nõutava ärajätmine on vigane plokk.

| jaotusalgoritmi tunnus | nõutavad loendid |
| ---------------------- | ---------------- |
| [`pdf-pages-v1`](segmentationMethods#pdf-pages-v1) | `PageCount` |
| [`plaintext-blocks-v1`](segmentationMethods#plaintext-blocks-v1) | `ParagraphCount`, `WordCount` |

**Loendid, mitte räsi.** Sisu räsi eeldaks, et spetsifikatsioon fikseerib jaotatud sisu baiditäpse kanoonilise esituse — ja see kuju muutuks ise uueks kohaks, kus teostused võivad lahkneda. Loendid tulenevad otse jaotusest, mille tunnus juba määrab, ja on inimesele loetavad.

**Loendid on terve faili kohta, mitte `AccessGroup` kaupa.** Kontrolli mõte on tuvastada, et pooled jaotavad faili ühtemoodi; seda näitab ainult kogusumma. Rühma sees loendatud ühikute arv ei tõesta midagi — sõna 8–8 valiv rühm annab „üks sõna“ ka siis, kui nummerdus on täiesti paigast ära.

**See ei ole terviklikkuse kontroll.** `SegmentationCheck` kontrollib jaotust, mitte faili: ta ei tuvasta muudetud sisu, kui muudatus jätab ühikute arvu samaks, ega asenda allkirja või kontrollsummat.

### Uue SegmentationMethod kasutuselevõtt

Uue jaotusalgoritmi loomine **ei nõua** laienduse ega Kapsli muutmist — see on selle versiooni sisseehitatud võimalus. Küll aga on uus algoritm kasulik alles siis, kui teisedki süsteemid seda tunnevad, seega kuulub selle juurde avaldamine.

Protsess järgib protokolli üldist arenduskorda (vt [CONTRIBUTING.md](https://github.com/e-gov/DHX/blob/master/CONTRIBUTING.md)):

1. **Algoritmi kirjeldamine.** Uue tunnuse looja spetsifitseerib algoritmi nii täpselt, et sõltumatu teostus jõuaks sama jaotuseni: kuidas sisu lehekülgedeks, lõikudeks ja sõnadeks jagatakse, kuidas neid nummerdatakse, mida (nt leheküljenumbrid, päised, jalused, joonealused märkused, metaandmed) arvestatakse ja mida ei arvestata, milliseid failivorminguid tunnus katab ning **milliseid vahemikuliike sellega kasutada tohib**. Tunnus valitakse nii, et see sisaldaks versiooninumbrit (nt `pdf-pages-v1`).
2. **RIA-le esitamine.** Kirjeldus — või link välisele spetsifikatsioonile, samuti viited taaskasutatavatele teekidele või moodulitele, kui neid on — esitatakse RIA-le [DHX hoidla Issue](https://github.com/e-gov/DHX/issues) kaudu.
3. **Läbivaatamine.** RIA töötab sisendi läbi ja täpsustab seda.
4. **Avaldamine.** RIA avaldab tunnuse kirjelduse või selle lingi registris [Jaotusalgoritmid](segmentationMethods), et kõik osapooled saaksid algoritmile toe realiseerida.

Avaldatud jaotusalgoritmi tunnus on **jäädav**: selle tähendust ei muudeta hiljem (vt eelmist märkust). Muudatus tähendab alati uut tunnust, mis läbib sama protsessi.

### Avaldamata tunnus

Avaldamata jaotusalgoritmi tunnuse kasutamine **ei ole keelatud**. Seda võib kasutada nii avaldamise ajal kui ka siis, kui avaldamist ei ole taotletudki — näiteks kahe osapoole vahel, kes on jaotusviisi omavahel kokku leppinud. Ohtu see ei loo: tunnust mittetundev vastuvõtja jääb faili tasandile ja rakendab terve faili kohta faili enda `Access` väärtust, mis ei ole kunagi leebem kui ükski faili osa.

Kasutaja PEAB siiski arvestama, et **avaldamata tunnuse tundmisele ei saa tugineda**:

* algoritmi tunnevad ainult need osapooled, kellega see on kokku lepitud — kõigi teiste jaoks jääb fail tervikuna `AK`-ks, ja osa tasandi kirjeldus jääb neile kasutamata;
* dokument liigub edasi ja seda loevad hiljem süsteemid, kellega kokkulepet ei ole, sealhulgas need, kes vastavad teabenõudele piirangu tähtaja möödudes;
* tunnuse tähenduse muutumatus kehtib ka avaldamata algoritmi kohta (vt [SegmentationMethod](#segmentationmethod)). Kui tunnus hiljem avaldatakse, PEAB avaldatav määratlus kirjeldama sama jaotust, mida juba vahetatud dokumentides kasutati — vastasel juhul tõlgendab hiljem avaldatud määratluse järgi toimiv rakendus vanu vahemikke valesti. Muudetud tähendus nõuab uut tunnust.

Seepärast on avaldamine soovituslik alati, kui kirjeldus võib olla laiemalt kasulik: avaldatud tunnus töötab kõigi osapooltega, avaldamata tunnus ainult kokkuleppe osaliste vahel.

### AccessGroup

Rühm koondab ühe juurdepääsukirjelduse alla kõik vahemikud, mille kohta see kehtib. Nii ei ole vaja identseid `Access` andmeid iga vahemiku juures korrata:

```xml
<AccessGroup>
  <Access>
    <AccessConditionsCode>AK</AccessConditionsCode>
    <AccessRestriction>
      <RestrictionIdentifier>AvTS§35p1p11</RestrictionIdentifier>
      <RestrictionBeginDate>2012-11-11</RestrictionBeginDate>
      <RestrictionEndDate>2017-11-11</RestrictionEndDate>
      <RestrictionBasis>Avaliku teabe seadus §35 lg 1 p 11</RestrictionBasis>
      <InformationOwner>Riigi Infosüsteemi Amet</InformationOwner>
    </AccessRestriction>
  </Access>
  <ParagraphRange>
    <StartParagraph>3</StartParagraph>
    <EndParagraph>4</EndParagraph>
  </ParagraphRange>
  <WordRange>
    <StartWord>42</StartWord>
    <EndWord>42</EndWord>
  </WordRange>
</AccessGroup>
```

Igal rühmal on **oma täielik** `AccessRestriction`, mitte päritud. See on oluline, sest juurdepääsupiirangu alused erinevad tähtaja poolest: AvTS § 40 lõige 1 lubab üldjuhul kuni 5 (+5) aastat, lõige 3 näeb isikuandmete puhul ette 75 / 30 / 110 aastat. Ühe faili eri osad võivad seega olla piiratud erineval alusel ja erineva lõpptähtajaga.

## Näited

### Avalik fail piiratud dokumendis

Kõige sagedasem kasutus. Dokument on tervikuna `AK`, kuid üks selle fail on avalik. Osa tasandit ei kasutata.

```xml
<Access>
  <AccessConditionsCode>AK</AccessConditionsCode>
  <AccessRestriction>
    <RestrictionIdentifier>AvTS§35p1p11</RestrictionIdentifier>
    <RestrictionBeginDate>2012-11-11</RestrictionBeginDate>
    <RestrictionEndDate>2017-11-11</RestrictionEndDate>
    <RestrictionBasis>Avaliku teabe seadus §35 lg 1 p 11</RestrictionBasis>
    <InformationOwner>Riigi Infosüsteemi Amet</InformationOwner>
  </AccessRestriction>
</Access>
...
<RecordTypeSpecificMetadata>
  <granularAccess xmlns="http://www.riik.ee/schemas/deccontainer/vers_2_1/granularAccess/">
    <File>
      <FileGuid>25892e17-80f6-415f-9c65-7395632f0002</FileGuid>
      <Access>
        <AccessConditionsCode>Avalik</AccessConditionsCode>
      </Access>
    </File>
  </granularAccess>
</RecordTypeSpecificMetadata>
```

### Valdavalt avalik fail üksikute piiratud kohtadega

Lihttekstifail ise on `AK` (ühilduvusreegel), kuid `DefaultPartAccessConditionsCode` avab kõik osad, mida allpool ei loetleta. Loetleda tuleb ainult piiratud kohad. Jaotus järgib tunnust [`plaintext-blocks-v1`](segmentationMethods#plaintext-blocks-v1).

```xml
<File>
  <FileGuid>25892e17-80f6-415f-9c65-7395632f0001</FileGuid>
  <Access>
    <AccessConditionsCode>AK</AccessConditionsCode>
    <AccessRestriction>
      <RestrictionIdentifier>AvTS§35p1p11</RestrictionIdentifier>
      <RestrictionBeginDate>2012-11-11</RestrictionBeginDate>
      <RestrictionEndDate>2017-11-11</RestrictionEndDate>
      <RestrictionBasis>Avaliku teabe seadus §35 lg 1 p 11</RestrictionBasis>
      <InformationOwner>Riigi Infosüsteemi Amet</InformationOwner>
    </AccessRestriction>
  </Access>
  <SegmentationMethod>plaintext-blocks-v1</SegmentationMethod>
  <SegmentationCheck>
    <ParagraphCount>12</ParagraphCount>
    <WordCount>287</WordCount>
  </SegmentationCheck>
  <DefaultPartAccessConditionsCode>Avalik</DefaultPartAccessConditionsCode>
  <AccessGroup>
    <Access>
      <AccessConditionsCode>AK</AccessConditionsCode>
      <AccessRestriction>
        <RestrictionIdentifier>AvTS§35p1p11</RestrictionIdentifier>
        <RestrictionBeginDate>2012-11-11</RestrictionBeginDate>
        <RestrictionEndDate>2017-11-11</RestrictionEndDate>
        <RestrictionBasis>Avaliku teabe seadus §35 lg 1 p 11</RestrictionBasis>
        <InformationOwner>Riigi Infosüsteemi Amet</InformationOwner>
      </AccessRestriction>
    </Access>
    <ParagraphRange>
      <StartParagraph>3</StartParagraph>
      <EndParagraph>4</EndParagraph>
    </ParagraphRange>
    <WordRange>
      <StartWord>42</StartWord>
      <EndWord>42</EndWord>
    </WordRange>
  </AccessGroup>
</File>
```

Siin on piiratud lõigud 3–4 ning eraldi üks sõna (nr 42, näiteks muidu avalikus lõigus möödaminnes mainitud isikukood). Sõnavahemik ei nõua seda sisaldava lõigu loetlemist.

Enne ühegi vahemiku rakendamist jaotab vastuvõtja faili ise ja kontrollib, et ta jõuab samade koguarvudeni nagu `SegmentationCheck` — 12 lõiku ja 287 sõna, mõlemad tunnuse `plaintext-blocks-v1` poolt nõutud. Erinevus tähendaks, et pooled ei jaota faili ühtemoodi, mistõttu fail jääks tervikuna piiratuks (vt [Jaotuse kontroll](#jaotuse-kontroll)).

### Skaneeritud PDF

Skaneeritud lehekülgedel ei ole masinloetavat teksti, seega kirjeldab algoritm `pdf-pages-v1` ainult lehekülgi ja keelab lõigu- ning sõnavahemikud. Leheküljetäpsus on piisav, et jätta avaldamata kaks piiratud sisuga lehekülge. Kontrollarvuna nõuab tunnus ainult lehekülgede koguarvu.

```xml
<File>
  <FileGuid>25892e17-80f6-415f-9c65-7395632f0003</FileGuid>
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
  <SegmentationMethod>pdf-pages-v1</SegmentationMethod>
  <SegmentationCheck>
    <PageCount>11</PageCount>
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
</File>
```

Täielik näidiskapsel: [GranularAccessExample1.xml](v2.1/GranularAccessExample1.xml).

### Kinnikaetud koopia avaliku versioonina

Kui failile **ei ole kohaldatavat `SegmentationMethod` tunnust**, kuid avalik versioon on siiski vajalik, saab saatja lisada dokumendile **eraldi faili — algse faili koopia, millest piiratud osad on eemaldatud.** Algne fail jääb `AK`-ks, koopia märgitakse `Avalik`-uks.

See on ainus viis osa failist avaldada siis, kui osa tasandit ei saa kasutada. Kõige sagedasem juhtum on vormindatud tekst (`.doc`, `.docx`, `.odt`), millele jaotusalgoritmi veel ei ole (vt [Millele algoritmi veel ei ole](segmentationMethods#millele-algoritmi-veel-ei-ole)).

Kolm asja teevad selle lähenemise praktiliseks:

* **See ei nõua kummaltki poolelt midagi juurde.** Kasutatakse ainult faili tasandit — `SegmentationMethod`, `SegmentationCheck` ega `AccessGroup` ei esine. Lahendus töötab kahe süsteemi vahel, millest kumbki osa tasandit ei toeta, ja kasutab ära laienduse esmast, juba praegu kasutatavat võimekust (töötlusjärjekorra sammud 1–3).
* **Kinnikatmise otsustab saatja, mitte vastuvõtja.** Osa tasandil koostab avaliku versiooni vastuvõtja, rakendades vahemikke — ja nihkes jaotus tähendab vale sisu avaldamist. Just selleks on olemas [jaotuse kontroll](#jaotuse-kontroll). Kinnikaetud koopia puhul teeb lõike saatja, kes ainsana teab, mis on kaitstud ja miks; vastuvõtjapoolne taastamine kaob probleemina ära, mitte ei muutu tuvastatavaks.
* **See vastab otsesõnu AvTS § 38 lõikele 2**, mis nõuab juurdepääsu tagamist teabe piiranguta osale — mitte selle kirjeldamist, kus see osa asub. Ette valmistatud avalik versioon täidab kohustust vahetumalt kui kirjeldus.

Näide. Dokumendis on `.docx` fail, mille kolm lõiku sisaldavad ärisaladust. Kapslis on **kaks** faili:

```xml
<File>
  <FileGuid>25892e17-80f6-415f-9c65-7395632f0005</FileGuid>
  <FileName>Hinnapakkumise_analyys.docx</FileName>
  ...
</File>
<File>
  <FileGuid>25892e17-80f6-415f-9c65-7395632f0006</FileGuid>
  <FileName>Hinnapakkumise_analyys_avalik.docx</FileName>
  ...
</File>
```

Laiendusplokis jääb algne fail piiratuks ja koopia on avalik:

```xml
<granularAccess xmlns="http://www.riik.ee/schemas/deccontainer/vers_2_1/granularAccess/">
  <File>
    <FileGuid>25892e17-80f6-415f-9c65-7395632f0005</FileGuid>
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
  </File>
  <File>
    <FileGuid>25892e17-80f6-415f-9c65-7395632f0006</FileGuid>
    <Access>
      <AccessConditionsCode>Avalik</AccessConditionsCode>
    </Access>
  </File>
</granularAccess>
```

Tuleb tähele panna, et koopia on **kapsli tavaline fail** ja ei vaja laienduses ühtki uut elementi. Laiendust mittetundev rakendus jätab mõlemad failid piiratuks — ohutu, nagu ikka.

#### Mille eest saatja vastutab

Kinnikaetud koopia on saatja koostatud ja **miski seda ei kontrolli** — skeem ei tea, et üks fail on teise kinnikaetud versioon, ega saa seda teada. Seetõttu on järgnev saatja vastutus ja iga punkti eiramine avaldab piiratud teabe.

* **Kinnikatmine tähendab uue faili koostamist.** Piiratud sisu PEAB failist tegelikult eemaldama. Must ristkülik teksti peal, valge kirjavärv, kärbitud kuvaala või „peidetud“ tekst EI OLE kinnikatmine — sisu on failis endiselt olemas ja leitav.
* **Metaandmed liiguvad koopiaga kaasa.** Autor, versiooniajalugu, jälitatud muudatused, kommentaarid, eelvaatepildid ja `docProps` väljad sisaldavad sageli algset teksti ka pärast seda, kui see on dokumendikehast eemaldatud. „Salvesta koopiana“ neid ei puhasta. Koopia PEAB olema metaandmetest puhastatud sama hoolikalt kui sisust.
* **Kaks faili EI TOHI olla vastuolus.** Koopia peab olema tõepoolest algse faili kinnikaetud versioon. Kui algset faili hiljem asendatakse või täiendatakse, tuleb koopia uuesti koostada — vananenud koopia võib avaldada sisu, mille piirang on vahepeal muutunud.
* **Järelduvus jääb alles.** Kui alles jääv tekst on „hinnapakkumine oli ⟨eemaldatud⟩ eurot, mis ületas eelarvet 12% võrra“, on eemaldatu arvutatav. Hinnang, kas kinnikatmine on piisav, on saatja oma.
* **Failinimi ei ole failisisu.** Kui algse faili nimi avaldab piiratud teabe, kasutatakse `PublicFileName` elementi (vt [Avalik pealkiri, lühiesitus ja failinimed](#avalik-pealkiri-l%C3%BChiesitus-ja-failinimed)). Koopia nimi PEAKS näitama, et tegu on avaliku versiooniga, et seda ei peetaks terviklikuks dokumendiks.

#### Millal eelistada osa tasandit

Kinnikaetud koopia on **varulahendus juhuks, kui kohaldatav `SegmentationMethod` puudub**, mitte osa tasandi asendaja. Kui tunnus on olemas, tuleks eelistada osa tasandit:

* dokumendis on üksainus fail, mitte kaks, mis võivad omavahel lahku minna;
* kapsli maht ei kahekordistu — suure skaneeritud PDF-i puhul on see märkimisväärne;
* piiratud osade loetelu jääb masinloetavaks, mistõttu piirangu tähtaja möödudes saab avaliku versiooni koostada automaatselt.

## Laienduse edasiarendamine

Laiendus on koostatud nii, et hilisem versioon saaks lisada uusi võimalusi ilma juba töötavaid teostusi lõhkumata. Seda kirjeldatakse siin, et edasiarendajad teaksid, millised eeldused peavad püsima.

Allpool tähendab **vanem süsteem** süsteemi, mis tunneb käesolevat `granularAccess` laiendust, kuid mitte selle kõrvale tekkinud uuemat laiendust. Süsteemi, mis ei tunne ühtki laiendust, nimetatakse **laiendust mittetundvaks** — sellele jäävad kõik failid piiratuks nii praegu kui edaspidi (vt [Ühilduvus](#%C3%BChilduvus)).

### Uus laiendus vana kõrvale

Uus versioon EI TOHI muuta ei selle laienduse nimeruumi ega juurelementi `granularAccess`, samuti mitte olemasolevate elementide tähendust. Uued võimalused — näiteks uus vahemikuliik, nagu pildipiirkond skaneeritud lehekülgedel oleva teabe katmiseks — tuuakse kasutusele **eraldi laiendusena**, mis määratleb oma nimeruumi ja juurelemendi (nt `granularAccess2`).

Mõlemad plokid pannakse `RecordTypeSpecificMetadata` sisse kõrvuti:

```xml
<RecordTypeSpecificMetadata>
  <granularAccess xmlns="http://www.riik.ee/schemas/deccontainer/vers_2_1/granularAccess/">
    ...
  </granularAccess>
  <granularAccess2 xmlns="http://www.riik.ee/schemas/deccontainer/vers_2_1/granularAccess2/">
    ...
  </granularAccess2>
</RecordTypeSpecificMetadata>
```

Kapsel lubab seda, sest `RecordTypeSpecificMetadata` võtab vastu suvalise arvu laiendusplokke. Vanem süsteem loeb `granularAccess` plokki **täpselt nagu varem** ja jätab tundmatu `granularAccess2` ploki vahele — täpselt samamoodi, nagu ta praegu jätab vahele iga muu laienduse, mida ta ei tunne. Uut laiendust tundev süsteem loeb mõlemat.

Otsustav on see, et **vana plokk jääb muutumatuks**: see valideerub senise skeemi järgi ja vanem süsteem ei pea oma töötlust kuidagi muutma. Kui uusi elemente lisataks hoopis olemasolevasse nimeruumi, lükkaks senise skeemi järgi valideeriv süsteem kogu ploki tagasi ja kaotaks **kõigi** selles kirjeldatud failide juurdepääsukirjelduse, sealhulgas nende, mida ta seni edukalt avaldas.

**Mida teha EI TOHI:** jätta vanem `granularAccess` plokk välja ja saata ainult uus. Vanem süsteem ei leiaks siis ühtki plokki, mida ta tunneb, ning **kõik failid jääksid tema jaoks `AK`-ks**.

**Miks mitte metamärk laienduse sees.** Tehniliselt oleks võimalik lisada `granularAccess` skeemi sisse `xs:any namespace="##other" processContents="lax"` sabad, nii et tuleviku elemendid saaksid sõita vana ploki sees ja valideeruksid endiselt vana skeemi järgi. Seda teadlikult ei tehta.

Ohutuse mõttes on mõlemad lahendused **sama seisus**: nii vahele jäetud element kui vahele jäetud kõrvalplokk tähendavad, et rakendus eirab sisu, mis oleks võinud olla piirav. Vahe on selles, **kus kohustus on nähtav ja väljendatav**. Kõrvalploki puhul on kohustus kirjeldatav ploki täpsusega ja see on ka kirja pandud: vanem plokk PEAB jääma iseseisvalt korrektseks ja piisavalt piiravaks (vt [Juurdepääsu täpsustamine sama faili kohta](#juurdep%C3%A4%C3%A4su-t%C3%A4psustamine-sama-faili-kohta)). Metamärk seevastu hajutaks kohustuse üksikute elementide tasandile — iga tulevase elemendi juures tuleks eraldi kokku leppida, kas selle vahelejätmine on ohutu, ja just seal jääks see kokkulepe tegemata. Kõrvalploki mudel sunnib kohustuse välja ütlema; metamärk laseb selle vaikides ära jätta.

Hind on see, et uus vahemikuliik nõuab **nii uut `SegmentationMethod` tunnust kui uut nimeruumi**. See topeltsidumine on teadlik valik ülaltoodud nähtavuse kasuks.

### Kuidas eri süsteemid seda loevad

Näiteks dokument, milles on 9 osaliselt avalikku tekstifaili ja 1 pildifail, mille tundlikud kohad saab uue laienduse abil katta. Tekstifailid kirjeldatakse `granularAccess` plokis, pildifail uues plokis:

| süsteem | tekstifailid (1–9) | pildifail (10) |
| ------- | ------------------ | -------------- |
| tunneb mõlemat laiendust | avaldab osaliselt | avaldab osaliselt, tundlikud piirkonnad kaetud |
| tunneb ainult `granularAccess` laiendust | avaldab osaliselt | jääb tervikuna `AK` |
| ei tunne ühtki laiendust | jäävad tervikuna `AK` | jääb tervikuna `AK` |

Vanem süsteem kaotab seega ainult selle ühe faili, mille kirjeldus asub tundmatus plokis. Ülejäänud üheksa tööd ei muutu. Laiendust mittetundva süsteemi olukord ei muutu samuti — talle jäid failid piiratuks juba enne uue laienduse tekkimist. Tagasilangus on osaline, mitte täielik — ja just see teebki uue versiooni kasutuselevõtu ohutuks: iga süsteem avaldab nii palju, kui ta oskab, ega avalda kunagi rohkem.

### Juurdepääsu täpsustamine sama faili kohta

Sama faili võib kirjeldada mõlemas plokis eri täpsusega. Vanem plokk katab näiteks `PageRange` abil terve lehekülje (vanem süsteem jätab selle lehekülje avaldamata), uuem plokk aga ainult selle lehekülje tundlikud piirkonnad (mõlemat laiendust tundev süsteem avaldab lehekülje, kattes piirkonnad). Mõlemad kirjeldused on õiged, uus on üksnes täpsem.

Rakendus kasutab **kõige täpsemat kirjeldust, mida ta mõistab**, ja ignoreerib ülejäänuid. Turvalisuse tagab see, et uuemat plokki mittetundev süsteem langeb tagasi vanemale, jämedamale ja seega **piiravamale** kirjeldusele — täpselt nagu tasandite kaupa laskumisel. Iga vanem kirjeldus on nõnda kehtiv ülemmäär neile, kes täpsemat lugeda ei oska, ning uuem kirjeldus võib olla ainult leebem, mitte rangem.

Sellest järeldub koostaja kohustus: vanem plokk PEAB jääma iseseisvalt korrektseks ja piisavalt piiravaks ka siis, kui uuemat plokki ei loeta. Praegune versioon seda mustrit ei spetsifitseeri — kui seda tulevikus tehakse, tuleb ülaltoodud reegel kirja panna, sest kirjelduste omavahelist kooskõla ei kontrolli miski.

## Mida laiendus ei kata

Laiendus on teadlikult piiratud ulatusega. Praeguses versioonis **ei** saa kirjeldada:

* **Kontakt- ja isikuandmete juurdepääsu** — saatja, saaja, allkirjastaja ja muude isikute nimesid, isikukoode ning kontaktandmeid (`RecordCreator`, `RecordSenderToDec`, `Recipient` jt). Ka need võivad olla piiratud teave, kuid nende avalike vastete kirjeldamine kuulub muude protokolli muudatuste või laienduste valdkonda. Pealkirja, lühiesituse ja failinimede jaoks on laienduses olemas `PublicRecordTitle`, `PublicRecordAbstract` ja `PublicFileName` (vt [Avalik pealkiri, lühiesitus ja failinimed](#avalik-pealkiri-l%C3%BChiesitus-ja-failinimed)), muude metaandmete väljade kohta samasugust võimalust ei ole. Allkirjastaja nime (`SignatureMetadata/Signer`) kohta eraldi avalikku vastet ei ole ja seda ei ole ka kavas: avaldatav dokument ei kanna kõiki metaandmeid kaasa ning vastuvõttev süsteem peab teadma, kas allkirjastajate nimesid tohib üldse avaldamata jätta. See otsus ei kuulu kapslisse.
* **Asukohta pildis** — näiteks isikukoodi ümbritsevat ristkülikut skaneeritud lehel. Koordinaatide töötlemine oleks praegustele dokumendihaldussüsteemidele liiga keeruline; skaneeritud failide puhul on lahenduseks leheküljetäpsus.
* **AK-märke tegemist dokumendile endale.** AvTS § 41 lõige 2 nõuab märke tegemist dokumendile, kui teabekandja seda võimaldab. Laiendus kirjeldab juurdepääsu kapslis ja seda kohustust ei asenda.
* **Osa tasandit failivormingutele, millele `SegmentationMethod` tunnus puudub** — praegu eelkõige vormindatud tekst. Neid faile kirjeldatakse ainult faili tasandil. Kui avalik osa on siiski vaja edastada, on lahenduseks saatja koostatud kinnikaetud koopia eraldi failina (vt [Kinnikaetud koopia avaliku versioonina](#kinnikaetud-koopia-avaliku-versioonina)).

## Nõuete loend

Käesoleva laienduse nõuded koondatult, [DHX protokolli](index) nõuete loendi eeskujul. Veerg „jaotis“ viitab kohale, kus nõuet selgitatakse.

| jaotis | nõue |
| ------ | ---- |
| [Ühilduvus](#%C3%BChilduvus) | Iga tasand PEAB olema vähemalt niivõrd piirav kui kõik sellesse kuuluvad tasandid: `DecContainer/Access` ⊇ `File/Access` ⊇ `AccessGroup/Access`. |
| [Ühilduvus](#%C3%BChilduvus) | Kui failis on kasvõi üks piiratud osa, PEAB `File/Access` olema `AK`. Faili EI TOHI märkida `Avalik`, lootes et piiratud osad tulevad `AccessGroup` elementidest. |
| [Ühilduvus](#%C3%BChilduvus) | Kui `DecContainer/Access` on `Avalik`, EI TOHIKS dokument laiendust üldse sisaldada. |
| [Valideerimine](#valideerimine) | Rakendus, kes kavatseb laiendust kasutada, PEAB ploki valideerima `granularAccess.xsd` järgi ja PEAB kontrollima neid reegleid, mida skeem väljendada ei suuda. |
| [Vigane plokk](#vigane-plokk) | Kui plokk ei valideeru või rikub mõnda spetsifikatsiooni reeglit, PEAB rakendus kogu laienduse eirama ja rakendama terve dokumendi kohta `DecContainer/Access` väärtust. |
| [Vigane plokk](#vigane-plokk) | Rakendus EI TOHI vigast plokki osaliselt töödelda ega toimida selle korrektsete `File` kirjete alusel. |
| [Avalik pealkiri, lühiesitus ja failinimed](#avalik-pealkiri-l%C3%BChiesitus-ja-failinimed) | Saatja vastutab selle eest, et `PublicRecordTitle`, `PublicRecordAbstract` ja `PublicFileName` väärtused on tõepoolest avaldatavad. |
| [Töötlusjärjekord](#t%C3%B6%C3%B6tlusj%C3%A4rjekord) | `Avalik` märkega fail EI TOHI sisaldada ühtki `AccessGroup` elementi. |
| [Töötlusjärjekord](#t%C3%B6%C3%B6tlusj%C3%A4rjekord) | Rakendus VÕIB osa tasandile laskuda ainult siis, kui ta tunneb faili `SegmentationMethod` väärtust. Tundmatu või puuduva väärtuse korral PEAB rakendus peatuma ja rakendama terve faili kohta faili enda `Access` väärtust. |
| [File](#file) | Iga fail TOHIB `granularAccess` plokis esineda kuni üks kord. |
| [File](#file) | Rakendus PEAB võrdlema `FileGuid` väärtusi tõstutundetult ja käsitlema kokkulangevust vigase plokina. Skeemi unikaalsuskitsendus võrdleb väärtusi täpselt, kuid `GuidType` lubab mõlemat tähekuju. |
| [DefaultPartAccessConditionsCode](#defaultpartaccessconditionscode) | Osa tasandil kirjeldatud faili puhul PEAB `DefaultPartAccessConditionsCode` väärtus olema otsesõnu kirjas. |
| [Vahemikud](#vahemikud) | Iga `AccessGroup` PEAB sisaldama vähemalt üht vahemikku. |
| [Vahemikud](#vahemikud) | Sama faili erinevate `AccessGroup` elementide vahemikud EI TOHI kattuda; vahemiku lõppväärtus EI TOHI olla väiksem kui algusväärtus. |
| [SegmentationMethod](#segmentationmethod) | Kasutada PEAKS registris [Jaotusalgoritmid](segmentationMethods) avaldatud tunnuseid. Avaldamata tunnust VÕIB kasutada, kuid selle tundmisele ei saa tugineda. |
| [SegmentationMethod](#segmentationmethod) | Tunnusega lubatud vahemikuliike EI TOHI ületada: iga tunnuse määratlus ütleb, milliseid kolmest liigist tohib kasutada. |
| [SegmentationMethod](#segmentationmethod) | Kasutusel oleva `SegmentationMethod` väärtuse tähendus EI TOHI kunagi muutuda; muudatus nõuab uut tunnust. |
| [Jaotuse kontroll](#jaotuse-kontroll) | Osa tasandil kirjeldatud faili puhul PEAB `SegmentationCheck` sisaldama täpselt neid loendeid, mida faili `SegmentationMethod` nõuab; loendit, mida tunnus ei määratle, EI TOHI esitada. |
| [Jaotuse kontroll](#jaotuse-kontroll) | Rakendus PEAB nõutavad loendid ise arvutama ja võrdlema. Kui mõni erineb, EI TOHI rakendus osa tasandile laskuda ja PEAB rakendama terve faili kohta faili enda `Access` väärtust. |
| [Kinnikaetud koopia](#kinnikaetud-koopia-avaliku-versioonina) | Kinnikaetud koopias PEAB piiratud sisu olema failist tegelikult eemaldatud, mitte visuaalselt varjatud, ning koopia PEAB olema puhastatud ka metaandmetest, mis algset sisu kannavad. |
| [Kinnikaetud koopia](#kinnikaetud-koopia-avaliku-versioonina) | Algse faili asendamisel või täiendamisel tuleb kinnikaetud koopia uuesti koostada; vananenud koopiat EI TOHI dokumendis jätta. |
| [Laienduse edasiarendamine](#laienduse-edasiarendamine) | Uus versioon EI TOHI muuta selle laienduse nimeruumi, juurelementi ega olemasolevate elementide tähendust. |
| [Laienduse edasiarendamine](#laienduse-edasiarendamine) | Uue laienduse kasutamisel EI TOHI vanemat `granularAccess` plokki välja jätta. |

## Tagasiside

Laiendus on mustandi staatuses. Ettepanekud ja märkused on oodatud [DHX hoidla](https://github.com/e-gov/DHX) kaudu.
