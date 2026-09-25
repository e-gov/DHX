# Kapsli laiendus granularAccess

**Staatus: MUSTAND (versioon 0.1-draft).** Spetsifikatsioon ei ole veel lõplik ja on avaldatud tagasiside kogumiseks. Struktuuri üksikasjad võivad muutuda.

Läbiva suurtähega esitatud sõnu PEAB, PEAKS, VÕIB ja EI TOHI tuleb tõlgendada nii, nagu need on määratletud [DHX protokolli](index) jaotises 2 „Nõuete keel“ (vrdl RFC 2119). Nõuete koond on jaotises [Nõuete loend](#n%C3%B5uete-loend).

Tehniline dokumentatsioon:

* [granularAccess.xsd](v2.1/granularAccess.xsd)
* [GranularAccessExample1.xml](v2.1/GranularAccessExample1.xml) — näidiskapsel faili ja osa tasandiga
* [GranularAccessExample2.xml](v2.1/GranularAccessExample2.xml) — näidiskapsel pesastatud konteinerfailidega ja sisalduva faili osa tasandiga
* [Jaotusalgoritmid ja konteinervormingud](segmentationMethods) — avaldatud `SegmentationMethod` ja `ContainerFormat` tunnuste register

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
  * [SubFile](#subfile)
  * [Konteinervorming](#konteinervorming)
  * [Pesastuse sügavus](#pesastuse-s%C3%BCgavus)
* [Näited](#n%C3%A4ited)
  * [Avalik fail piiratud dokumendis](#avalik-fail-piiratud-dokumendis)
  * [Valdavalt avalik fail üksikute piiratud kohtadega](#valdavalt-avalik-fail-%C3%BCksikute-piiratud-kohtadega)
  * [Skaneeritud PDF](#skaneeritud-pdf)
  * [Asice-konteiner avaliku ja piiratud failiga](#asice-konteiner-avaliku-ja-piiratud-failiga)
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

Laiendus `granularAccess` võimaldab kirjeldada, millised tervikuna piiratud dokumendi **failid** on tegelikult avalikud, millised **konteinerfailis sisalduvad failid** on avalikud, ja vajaduse korral ka millised faili **osad** (leheküljed, lõigud, sõnad) on avalikud. Nii saab vastuvõttev süsteem hiljem teabenõudele vastates avaldada just selle osa, mille kohta piirang ei kehti. Lisaks saab laiendusega edastada dokumendi **avalikustatava pealkirja, lühiesituse ja failinimed**, sest ka pealkiri, lühiesitus või failinimi võib ise piiratud teavet avaldada.

Laienduse praktiline põhieesmärk on eristada avalikke faile piiratutest. Kuna valdav osa dokumente liigub praegu allkirjastatud konteinerfailidena (asice), kus kapsli tasandil on üksainus fail, kuulub siia juurde ka konteineris sisalduvate failide eristamine (vt [SubFile](#subfile)). Osa tasandi kirjeldus on ette nähtud peamiselt tulevikuks — see on olemas siis, kui dokumendihaldussüsteemid suudavad seda luua ja töödelda.

## Ühilduvus

Laiendus **ei muuda** `Kapsel.xsd` faili. Ta paigutatakse elementi `RecordTypeSpecificMetadata`, mis on kapslis ainus laiendamiseks mõeldud koht (`xs:any processContents="skip"`). Seetõttu:

* Laiendust mittetundev rakendus töötab täpselt nagu varem, kasutades ainult `DecContainer/Access` väärtust. Ta ei pea kapsli töötlemist muutma ega laiendust valideerima.
* Laiendust tundev rakendus saab lisaks avada faile või failiosi.

Ühilduvuse tagab üks reegel.

> **Ühilduvusreegel.** Iga tasand PEAB olema vähemalt niivõrd piirav kui kõik sellesse kuuluvad tasandid.
>
> `DecContainer/Access` ⊇ `File/Access` ⊇ `SubFile/Access` ⊇ … ⊇ `AccessGroup/Access`

Juurdepääs muutub dokumenti süvenedes seega ainult **leebemaks**, mitte kunagi rangemaks. Rakendus, mis peatub mis tahes tasandil, ei anna kunagi juurdepääsu millelegi, mida võimekam rakendus peaks piirama — halvimal juhul on tulemus vajalikust konservatiivsem.

Reegel kehtib suvalise sügavuseni: konteinerfaili sisalduvad failid võivad ise olla konteinerid (vt [SubFile](#subfile)), ja iga uus tasand lisandub samasse ahelasse. Kontrollimiseks piisab siiski sellest, et iga tasandit võrreldakse **oma vahetu ülemaga** — kui ükski kõrvutine paar reeglit ei riku, ei riku seda ka ükski kaugem paar.

Sellest järeldub kolm asja, mida on lihtne valesti teha:

* Kui failis on kasvõi üks piiratud osa, PEAB `File/Access` olema `AK`. Faili EI TOHI märkida `Avalik`, lootes et piiratud osad tulevad allpool olevatest `AccessGroup` elementidest — faili tasandil peatuv rakendus avaldaks siis terve faili.
* Kui konteineris on kasvõi üks piiratud sisalduv fail — ükskõik kui sügaval —, PEAB konteineri `Access` olema `AK`. Konteinerit EI TOHI märkida `Avalik`, lootes et piiratud failid tulevad allpool olevatest `SubFile` elementidest. Konteineri tasandil peatuv rakendus avaldaks konteineri ühe tervikuna ja koos sellega iga piiratud faili selle sees. Piirang ei jääks siis lihtsalt märkamata, vaid ei saakski mõjuda.
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
| Iga `EntryName` esineb oma konteineri sees kuni üks kord (täpsel võrdlusel) | skeem |
| `EntryName` ei sisalda teeeraldajat ega ole tühi | skeem |
| Iga `AccessGroup` sisaldab vähemalt üht vahemikku | skeem |
| `SegmentationCheck` sisaldab vähemalt üht loendit | skeem |
| `SegmentationCheck` sisaldab täpselt neid loendeid, mida jaotusalgoritm nõuab | **rakendus** |
| `SegmentationMethod`, `SegmentationCheck`, `DefaultPartAccessConditionsCode` ja `AccessGroup` esinevad kas koos või üldse mitte | skeem |
| `ContainerFormat` ja `SubFile` esinevad kas koos või üldse mitte | skeem |
| Fail on jaotatud kas osadeks või sisalduvateks failideks, mitte mõlemaks | skeem |
| Elemendi `SegmentationCheck` loendid ühtivad rakenduse enda jaotuse tulemusega | **rakendus** |
| Iga `EntryName` vastab tõepoolest ühele konteineri kirjele | **rakendus** |
| Fail, mille `Access` on `Avalik`, ei sisalda ühtki `AccessGroup` elementi | **rakendus** |
| Konteiner, mille `Access` on `Avalik`, ei sisalda ühtki piiratud `SubFile` elementi | **rakendus** |
| Ükski tasand ei ole rangem kui teda ümbritsev (ühilduvusreegel) | **rakendus** |
| Vahemiku lõppväärtus ei ole väiksem kui algusväärtus | **rakendus** |
| Sama faili erinevate `AccessGroup` elementide vahemikud ei kattu | **rakendus** |
| `Avalik` koodiga `Access` ei kanna `AccessRestriction` elementi | **rakendus** |

## Töötlusjärjekord

Laiendust tundev rakendus PEAB ploki esmalt valideerima ja kontrollima skeemiväliseid reegleid (vt [Valideerimine](#valideerimine)). Vigase ploki korral PEAB kogu laienduse eirama. Seejärel liigub ta tasandite kaupa ja peatub esimesel tasandil, mida ta ei suuda töödelda.

1. **Dokument.** Kui `DecContainer/Access/AccessConditionsCode` on `Avalik`, on kogu dokument koos failidega avalik. `RecordTypeSpecificMetadata` elementi ei ole vaja uurida.
2. **Fail.** Kui dokumendi kood on `AK`, otsib rakendus iga `DecContainer/File` jaoks üles `granularAccess/File` kirje, mille `FileGuid` ühtib. Fail, millel kirje puudub või millel puudub oma `Access`, jääb piiratuks nagu ütleb `DecContainer/Access`. Edaspidi tähendab **kirje** just seda parajasti töödeldavat laienduse elementi — kuni sammuni 5 `File` elementi, pärast sinna naasmist ka `SubFile` elementi. Konteineris sisalduvale failile viidatakse alati sõnadega *konteineri kirje*.
3. **Avalik fail.** Kui kirje `Access/AccessConditionsCode` on `Avalik`, on terve fail avalik. Rakendus peatub siin — selle faili `AccessGroup` ega `SubFile` elemente ei ole vaja uurida ja piiratud sisu neis EI TOHI ka olla.
4. **Jaotusviis.** Kui kood on `AK`, on fail tervikuna piiratud, kuid selle osad või sisalduvad failid võivad olla avalikud. Sama kirje näitab, kummal viisil fail on jaotatud: `SegmentationMethod` osadeks või `ContainerFormat` sisalduvateks failideks. Kui kumbagi ei ole, jääb fail tervikuna piiratuks.
5. **Sisalduvad failid.** Kui kirjes on `ContainerFormat`, VÕIB rakendus sisalduvate failide tasandile laskuda **ainult siis**, kui ta tunneb vormingu tunnust ja suudab konteineri lahti pakkida. Kui tunnus on tundmatu, lahtipakkimine ei õnnestu või rakendus on jõudnud oma [sügavuse piirini](#pesastuse-s%C3%BCgavus), PEAB rakendus peatuma ja rakendama terve konteineri kohta konteineri enda `Access` väärtust. Õnnestumisel töötleb ta iga `SubFile` kirjet — alustades selle sammu juures uuesti punktist 3, kus kirje tähendab nüüd seda `SubFile` elementi, sest sisalduv fail võib ise olla kas avalik, osadeks jaotatud või omakorda konteiner. Sisalduv fail, mida ükski `SubFile` ei kirjelda, jääb konteineri enda `Access` väärtuse alla; selliseid faile ei ole vaja loetleda.
6. **Jaotusalgoritm.** Kui kirjes on `SegmentationMethod`, VÕIB rakendus osa tasandile laskuda **ainult siis**, kui ta tunneb selle väärtust ja suudab jaotuse täpselt taastada. Tundmatu väärtuse korral PEAB rakendus peatuma ja rakendama terve faili kohta faili enda `Access` väärtust.
7. **Jaotuse kontroll.** Jaotusalgoritmi tundes jaotab rakendus faili ise ja võrdleb oma ühikute koguarve elemendiga `SegmentationCheck`. Kui mõni tunnuse poolt nõutav loend erineb, PEAB rakendus peatuma ja rakendama terve faili kohta faili enda `Access` väärtust — täpselt nagu tundmatu tunnuse korral (vt [Jaotuse kontroll](#jaotuse-kontroll)).
8. **Osad.** Loendite ühtimisel loeb rakendus `DefaultPartAccessConditionsCode` välja ja rakendab seejärel iga `AccessGroup` väärtust selles loetletud vahemike kohta. See element on osa tasandil kirjeldatud faili puhul alati olemas, sest skeem nõuab seda koos `SegmentationMethod`, `SegmentationCheck` ja `AccessGroup` elementidega.

## Struktuur

```text
granularAccess
├── PublicRecordTitle                 (0..1)  avalikustatav dokumendi pealkiri
├── PublicRecordAbstract              (0..1)  avalikustatav sisu lühiesitus
└── File                              (0..n)  FileGuid on unikaalne
    ├── FileGuid                              viide DecContainer/File failile
    ├── PublicFileName                (0..1)  avalikustatav failinimi
    ├── Access                        (0..1)  terve faili juurdepääsutingimus
    └── ─── valik: kas osa tasand, sisalduvad failid või kumbagi ─── (0..1)
        │
        ├── ─── A: osa tasand: kas kõik või mitte ühtki ───
        │   ├── SegmentationMethod            jaotusalgoritmi tunnus
        │   ├── SegmentationCheck             jaotuse ühikute koguarvud
        │   │   ├── PageCount            (0..1)  kui algoritm nõuab
        │   │   ├── ParagraphCount       (0..1)  kui algoritm nõuab
        │   │   └── WordCount            (0..1)  kui algoritm nõuab
        │   ├── DefaultPartAccessConditionsCode   katmata osade tingimus
        │   └── AccessGroup            (1..n)
        │       ├── Access                    rühma juurdepääsutingimus
        │       └── vähemalt üks vahemik (1..n) suvalises järjekorras:
        │           ├── PageRange             StartPage, EndPage
        │           ├── ParagraphRange        StartParagraph, EndParagraph
        │           └── WordRange             StartWord, EndWord
        │
        └── ─── B: sisalduvad failid: kas kõik või mitte ühtki ───
            ├── ContainerFormat               konteinervormingu tunnus
            └── SubFile                  (1..n)  EntryName on konteineris unikaalne
                ├── EntryName                 sisalduva faili tee konteineri sees
                ├── PublicFileName       (0..1)  avalikustatav failinimi
                ├── Access               (0..1)  terve sisalduva faili tingimus
                └── ─── valik: A või B, täpselt nagu File tasandil ─── (0..1)
                    └── (B haru kordub: SubFile võib sisaldada SubFile'e)
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

Laiendus **teadlikult ei fikseeri kinnist algoritmide loetelu**, et uusi algoritme saaks kasutusele võtta ilma skeemi muutmata. Tunnused avaldatakse eraldi registris: **[Jaotusalgoritmid ja konteinervormingud](segmentationMethods)**, mille täienemine ei nõua laienduse uut versiooni. Soovituslik on, et väärtus näitaks nii meetodit kui selle versiooni (nt `pdf-pages-v1`).

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
4. **Avaldamine.** RIA avaldab tunnuse kirjelduse või selle lingi registris [Jaotusalgoritmid ja konteinervormingud](segmentationMethods), et kõik osapooled saaksid algoritmile toe realiseerida.

Avaldatud jaotusalgoritmi tunnus on **jäädav**: selle tähendust ei muudeta hiljem (vt eelmist märkust). Muudatus tähendab alati uut tunnust, mis läbib sama protsessi.

**Sama protsess kehtib `ContainerFormat` tunnuse kohta.** Vahemikuliikide asemel tuleb sammus 1 määratleda, millised konteineri kirjed on sisalduvad failid ja millised jäetakse välja, ning kuidas `EntryName` väärtust kirje nimega võrreldakse (vt [Konteinervorming](#konteinervorming)). Ka konteinervormingu tunnus on avaldamise järel jäädav.

### Avaldamata tunnus

Avaldamata jaotusalgoritmi tunnuse kasutamine **ei ole keelatud**. Seda võib kasutada nii avaldamise ajal kui ka siis, kui avaldamist ei ole taotletudki — näiteks kahe osapoole vahel, kes on jaotusviisi omavahel kokku leppinud. Ohtu see ei loo: tunnust mittetundev vastuvõtja jääb faili tasandile ja rakendab terve faili kohta faili enda `Access` väärtust, mis ei ole kunagi leebem kui ükski faili osa.

Kasutaja PEAB siiski arvestama, et **avaldamata tunnuse tundmisele ei saa tugineda**:

* algoritmi tunnevad ainult need osapooled, kellega see on kokku lepitud — kõigi teiste jaoks jääb fail tervikuna `AK`-ks, ja osa tasandi kirjeldus jääb neile kasutamata;
* dokument liigub edasi ja seda loevad hiljem süsteemid, kellega kokkulepet ei ole, sealhulgas need, kes vastavad teabenõudele piirangu tähtaja möödudes;
* tunnuse tähenduse muutumatus kehtib ka avaldamata algoritmi kohta (vt [SegmentationMethod](#segmentationmethod)). Kui tunnus hiljem avaldatakse, PEAB avaldatav määratlus kirjeldama sama jaotust, mida juba vahetatud dokumentides kasutati — vastasel juhul tõlgendab hiljem avaldatud määratluse järgi toimiv rakendus vanu vahemikke valesti. Muudetud tähendus nõuab uut tunnust.

Seepärast on avaldamine soovituslik alati, kui kirjeldus võib olla laiemalt kasulik: avaldatud tunnus töötab kõigi osapooltega, avaldamata tunnus ainult kokkuleppe osaliste vahel.

Sama kehtib avaldamata `ContainerFormat` tunnuse kohta: seda mittetundev vastuvõtja jääb konteineri tasandile ja rakendab terve konteineri kohta konteineri enda `Access` väärtust.

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

### SubFile

Kapsli fail on sageli **konteiner**: praegu liigub valdav osa dokumente asice-vormingus, kus allkirjastatud ümbriku sees on tegelikud failid. Ainult faili tasandil kirjeldades saaks sellisele dokumendile anda üheainsa juurdepääsutingimuse, kuigi ümbriku sees võib olla nii avalikke kui piiratud faile. `SubFile` kirjeldab konteineris **sisalduvat** faili eraldi.

| element | kohustuslik | kirjeldus |
| ------- | ----------- | --------- |
| `EntryName` | jah | Sisalduva faili tee konteineri sees, kaustad eraldatud kaldkriipsuga. **Ühes konteineris unikaalne** — skeem jõustab seda. |
| `PublicFileName` | ei | Avalikustatav failinimi. Puudumisel kasutatakse `EntryName` väärtust — mis kaustas oleva faili puhul on tee, mitte kuvatav nimi. |
| `Access` | ei | Terve sisalduva faili juurdepääsutingimus. Puudumisel kehtib seda sisaldava `File` või `SubFile` elemendi enda `Access`. |
| osa tasand või sisalduvad failid | ei | Täpselt samad kaks haru nagu `File` tasandil — kas `SegmentationMethod` ja kaaslased, või `ContainerFormat` koos `SubFile` elementidega, või kumbagi. |

`SubFile` on struktuurilt sama nagu `File`, ainult et faili identifitseerib `FileGuid` asemel `EntryName`. Kõik, mis kehtib `File` kohta — `Access` vabatahtlikkus, osa tasandi jagamatus, `DefaultPartAccessConditionsCode` kohustuslikkus osa tasandil, `AccessGroup` reeglid — kehtib `SubFile` kohta samamoodi.

**`EntryName` on tee konteineri sees.** Konteineri sisu võib olla kaustapuus ja kaustad eraldatakse kaldkriipsuga: kirjele `Manused/Kiri.pdf` viidatakse täpselt selle väärtusega. Tee on alati konteineri **juure suhtes**.

Skeem jõustab, et teel on **üksainus kirjapilt**: eraldajat ei tohi olla tee alguses ega lõpus, tühje segmente ei tohi olla, kurakaldkriips `\` on keelatud ning keelatud on ka segmendid `.` ja `..`. Nii ei teki küsimust, kas `./fail.pdf`, `/fail.pdf` ja `fail.pdf` on sama fail — kehtib ainult viimane —, ja ükski väärtus ei saa osutada konteinerist välja. Kuidas teed konteineri kirjetega kokku viiakse, ütleb vormingu kirje [konteinervormingute registris](segmentationMethods#konteinervormingud); ZIP-põhistel vormingutel on kirjenimi niigi tee, mistõttu võrdlus käib otse.

**Kaust ei ole konteiner ega sisalduv fail.** `SubFile` pesastatakse ainult siis, kui sisalduv fail on ise konteiner ja saab seetõttu oma `ContainerFormat` tunnuse. Kaustale `ContainerFormat` tunnust anda ei saa — teda ei pakita lahti ja ükski vorming teda ei kirjelda —, mistõttu kaustas olevat faili kirjeldab **üksainus** `SubFile` element, mille `EntryName` on tervikuna tee. Terve kausta avaldamiseks loetletakse selles olevad failid.

**Tee tagab üheselt määratuse.** Kuna `EntryName` sisaldab kogu teed, ei saa kaks eri sisalduvat faili anda sama väärtust ja skeemi unikaalsuskitsendus töötab kogu tee kohta. Sama nimega faile eri kaustades — `A/aruanne.pdf` ja `B/aruanne.pdf` — saab seetõttu kirjeldada kõrvuti.

**Teed ei ole harilikult mõtet failinimena kuvada.** Kui `EntryName` on tee, tasub anda ka `PublicFileName`: `Manused/Kiri.pdf` asemel kuvatakse siis `Kiri.pdf`. Muidu avaldab kuvatav nimi ühtlasi konteineri sisemise ülesehituse.

**Nime normaliseerimine sõltub vormingust.** Kuidas `EntryName` väärtust konteineri sisuga võrrelda — tõstutundlikult või mitte, millise kodeeringu ja Unicode'i normaalkujuga — on iga konteinervormingu enda küsimus ja seda kirjeldab vormingu kirje [konteinervormingute registris](segmentationMethods#konteinervormingud). Rakendus PEAB võrdlema nii, nagu seal kirjas.

**Kõiki sisalduvaid faile ei pea loetlema, ja loetlemata fail jääb alati piiratuks.** Loetlemata sisalduv fail jääb konteineri enda `Access` väärtuse alla, seega piiratud konteineri puhul piiratuks. Kui konteineris on üksainus avaldatav fail, piisab ühestainsast `SubFile` kirjest.

Osa tasandil otsustab katmata osade tingimuse `DefaultPartAccessConditionsCode`, sisalduvate failide tasandil samasugust valikut ei ole. Vahe on tahtlik ja tuleb sellest, et pooled seisavad erinevalt: faili osi võib olla sadu ja neid kõiki loetleda ei saa, mistõttu on vaja võimalust loetleda see pool, mida on vähem. Konteineri koosseis on aga lõplik ja saatjale teada — tema selle koostas —, nii et avaldatavate failide loetlemine ei ole koormav. Vastutasuks kaob ära terve klass vigu: ükskõik kuidas vastuvõtja konteineri sisu loeb, saab avaldada ainult seda, mida saatja on nimeliselt kirjeldanud. Kirje, mida vastuvõtja näeb, aga saatja ei näinud, jääb igal juhul avaldamata.

**Konteineri allkiri ei kandu sisalduva failiga kaasa.** Kui asice-konteinerist avaldatakse üksik fail, jääb see konteineri allkirjast välja ja avaldatud fail ei ole enam allkirjastatud. Laiendus seda ei lahenda; asutus otsustab oma reeglite järgi, kas avaldada sisalduv fail eraldi, avaldada terve konteiner või jätta avaldamata.

### Konteinervorming

Sisalduvate failide tasand on **jagamatu** nagu osa tasandki: `ContainerFormat` ja `SubFile` esinevad kas mõlemad või kumbki mitte. Ilma vormingu tunnuseta ei ole teada, mille külge `EntryName` kinnitub; ilma ühegi `SubFile` elemendita ei kirjeldaks vormingu tunnus midagi.

| element | kirjeldus |
| ------- | --------- |
| `ContainerFormat` | Konteinervormingu tunnus, nt `asice-v1`. Lubatud väärtused on [konteinervormingute registris](segmentationMethods#konteinervormingud). Tundmatu tunnuse korral PEAB rakendus peatuma. |

`ContainerFormat` ütleb, **kuidas `EntryName` tee konteineri vastu lahendatakse**: millised konteineri kirjed on üldse sisalduvad failid, kuidas nimi kodeeringust loetakse ning kas võrdlus on tõstutundlik ja millise Unicode'i normaalkujuga. Ilma selle kokkuleppeta ei leiaks rakendus nime `Otsus_Õ.pdf` üles seal, kus täpitäht on salvestatud teisel kujul.

**Miks siin kontrollarve ei ole.** Osa tasandil on `SegmentationCheck` möödapääsmatu, sest vahemik `3–4` on **positsiooniline**: kui vastuvõtja jaotus on ühe võrra nihkes, viitab vahemik ikkagi millelegi — lihtsalt valele lõigule. Viga ei anna märku ja avaldatud saab sisu, mida pidi kaitsma; koguarvud on ainus viis seda tabada. `EntryName` niimoodi eksida ei saa: nimi kas vastab konteineri kirjele või ei vasta. Vastuolu ilmneb kohapeal ja üksiku kirje kohta, mitte vaikselt ja nihkena.

Sellest järeldub, et konteineri koosseisu koguarvu ei ole vaja. Reegel, et **loetlemata sisalduv fail jääb alati piiratuks**, teeb sama töö otsesemalt: avaldada saab ainult nimeliselt kirjeldatud faile, seega ei saa vastuvõtja teistsugune lugem kunagi midagi juurde avaldada. Kirje, mida saatja ei näinud, jääb kirjeldamata ja seega piiratuks; kirje, mida vastuvõtja ei näe, jääb lihtsalt leidmata (vt allpool). Kontrollarv annaks siin ainult ühe uue koha, kus pooled võivad tähenduseta erinevuse tõttu lahku minna — nt kas asice-konteineri `mimetype` ja `META-INF/` kirjed loendusse kuuluvad — ja see erinevus lülitaks kogu kirjelduse välja seal, kus sisu on tegelikult sama.

**Nimi, mis ei vasta ühelegi kirjele, peatab konteineri töötluse.** Kui rakendus konteineri lahti pakib ja mõnda `EntryName` väärtust seal ei leia, on kirjeldus ja konteiner omavahel vastuolus — kumb neist on vale, ei ole teada: konteiner võib olla vahetatud, aga rakendus võib ka lugeda kirjenimesid saatjast erinevalt. Kumbki põhjus ei luba ülejäänud nimesid usaldada, mistõttu PEAB rakendus peatuma ja rakendama terve konteineri kohta konteineri enda `Access` väärtust — mitte avaldama neid faile, mille nimed juhtumisi leiti. See puudutab ainult seda konteinerit: teiste kapsli failide kirjeldused jäävad kehtima.

**Peatumine ei ole viga.** Tundmatu konteinervorming ja ebaõnnestunud lahtipakkimine annavad mõlemad sama tulemuse: konteineri sisu jääb avaldamata ja terve konteiner käsitletakse konteineri enda tingimuse järgi. See on ohutu pool — avaldamata jääb see, mille kohta oleks võinud avaldada rohkem, ja mitte kunagi vastupidi. Vt ka [Avaldamata tunnus](#avaldamata-tunnus).

### Pesastuse sügavus

Konteiner võib sisaldada konteinerit: asice-ümbrikus võib olla zip, selle sees veel asice ja nii edasi. Seetõttu `SubFile` võib sisaldada `SubFile` elemente **ilma skeemis seatud piirita**.

Tasand tekib **ainult konteinerist konteineri sees**, mitte kaustapuust: kaustas paiknev fail on sama tasandi sisalduv fail, ainult pikema `EntryName` väärtusega (vt [SubFile](#subfile)). Kaustapuuga konteineri kirjeldamine ei nõua seetõttu vastuvõtjalt ühtki lisatasandit.

**Iga süsteem VÕIB seada oma sügavuse piiri.** Ühtset kõvakodeeritud piiri ei ole, sest süsteemide võimalused erinevad: mõni suudab ainult ühe tasandi lahti pakkida, mõni tunneb sügavat pesastust. Piiri seab vastuvõtja oma võimaluste järgi ja piirini jõudmine annab sama tulemuse nagu tundmatu vorming — rakendus peatub ja rakendab selle tasandi kirje enda `Access` väärtust kogu allesoleva sisu kohta.

See on ohutu just seepärast, et **juurdepääs muutub laskumisel ainult leebemaks, mitte kunagi rangemaks** (vt [Ühilduvus](#%C3%BChilduvus)). Piirini jõudnud rakenduse avaldatav sisu on seetõttu alati sügavamale laskuva rakenduse avaldatava sisu **alamhulk**: mida varem peatuda, seda vähem avaldada. Ilma selle reeglita ei saaks sügavuse piire üldse lubada — piirini jõudmine võiks siis avaldada midagi, mis sügavamal on piiratud.

* **Soovituslik miinimum on üks tasand** (`File` sees `SubFile`). See katab praeguse peamise juhu: asice-konteiner, mille sees on failid.
* **Piirini jõudmine ei ole viga** ega vigane plokk. Rakendus ei pea seda saatjale teatama; ta lihtsalt ei laskunud sügavamale.
* **Saatja ei tohiks sügavust asjata kasvatada.** Mida sügavam kirjeldus, seda väiksem osa vastuvõtjatest seda kasutada suudab. Kirjeldust tasub anda nii sügavale, kui on tegelikult vaja — mitte igaks juhuks sügavamale.
* **Ressursipiirangud jäävad kehtima.** Lahtipakkimisel PEAB rakendus arvestama ka sisalduvate failide mahu ja arvuga, mitte ainult sügavusega. Pahatahtlikult koostatud konteiner võib olla väike, kuid lahtipakituna hiiglaslik.

Pesastatud kirjelduse ja selle astmelise töötlemise näide on [GranularAccessExample2.xml](v2.1/GranularAccessExample2.xml): seal näitab iga peatumiskoht — laiendust mittetundev rakendus, üht tasandit toetav rakendus, kaht tasandit toetav rakendus ja jaotusalgoritmi tundev rakendus — järjest suuremat avaldatavat hulka.

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

### Asice-konteiner avaliku ja piiratud failiga

Kapsli fail on allkirjastatud asice-konteiner, mille sees on kolm faili: leping, selle lisa ja üks piiratud sisuga manus. Konteiner ise on `AK`, sest ta sisaldab piiratud faili (ühilduvusreegel). Loetleda tuleb ainult need kaks faili, millega midagi avatakse — kolmas jääb loetlemata ja seetõttu piiratuks.

```xml
<File>
  <FileGuid>25892e17-80f6-415f-9c65-7395632f0007</FileGuid>
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
  <ContainerFormat>asice-v1</ContainerFormat>
  <SubFile>
    <EntryName>Leping.pdf</EntryName>
    <Access>
      <AccessConditionsCode>Avalik</AccessConditionsCode>
    </Access>
  </SubFile>
  <SubFile>
    <EntryName>Lisa_1.pdf</EntryName>
    <PublicFileName>Lepingu lisa 1.pdf</PublicFileName>
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
      <PageCount>4</PageCount>
    </SegmentationCheck>
    <DefaultPartAccessConditionsCode>AK</DefaultPartAccessConditionsCode>
    <AccessGroup>
      <Access>
        <AccessConditionsCode>Avalik</AccessConditionsCode>
      </Access>
      <PageRange>
        <StartPage>1</StartPage>
        <EndPage>2</EndPage>
      </PageRange>
    </AccessGroup>
  </SubFile>
</File>
```

Siin kirjeldab esimene `SubFile` tervikuna avaldatava lepingu. Teine näitab, et **sisalduva faili sees saab kasutada osa tasandit täpselt samamoodi** nagu kapsli faili sees: lisa ise on `AK`, kuid selle kaks esimest lehekülge avaldatakse.

Kolmandat sisalduvat faili ei ole loetletud. See ei ole viga: loetlemata sisalduv fail jääb piiratuks, nii et piiratud manust ei ole vaja kuidagi märkida. Konteineri koosseisu ei loetleta kuskil tervikuna — kirjelduses on ainult need failid, mille kohta saatjal on midagi öelda.

Rakendus, kes asice-vormingut lahti pakkida ei suuda, jätab `SubFile` kirjed lihtsalt tähelepanuta ja käsitleb terve konteineri `AK`-na. Rakendus, kes suudab, avaldab `Leping.pdf` faili ja — kui ta tunneb ka tunnust `pdf-pages-v1` — lisa kaks esimest lehekülge.

Täielik näidiskapsel, mis läheb sellest sammu võrra kaugemale: seal on konteiner konteineri sees, nii et kirjeldus ulatub kolme tasandini — `File` → `SubFile` (pesastatud asice) → `SubFile` (osa tasandil kirjeldatud PDF). Vt [GranularAccessExample2.xml](v2.1/GranularAccessExample2.xml).

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
* **Allkirja säilimist konteinerist avaldatud faili juures.** `SubFile` võimaldab avaldada üksiku faili allkirjastatud konteinerist, kuid avaldatud fail ei kanna konteineri allkirja kaasa (vt [SubFile](#subfile)). Laiendus ei kirjelda, kuidas allkirjastatud kujul osalist avaldamist teha; see on konteinervormingute enda küsimus.

## Nõuete loend

Käesoleva laienduse nõuded koondatult, [DHX protokolli](index) nõuete loendi eeskujul. Veerg „jaotis“ viitab kohale, kus nõuet selgitatakse.

| jaotis | nõue |
| ------ | ---- |
| [Ühilduvus](#%C3%BChilduvus) | Iga tasand PEAB olema vähemalt niivõrd piirav kui kõik sellesse kuuluvad tasandid: `DecContainer/Access` ⊇ `File/Access` ⊇ `SubFile/Access` ⊇ … ⊇ `AccessGroup/Access`. Reegel kehtib suvalise pesastussügavuseni. |
| [Ühilduvus](#%C3%BChilduvus) | Kui failis on kasvõi üks piiratud osa, PEAB `File/Access` olema `AK`. Faili EI TOHI märkida `Avalik`, lootes et piiratud osad tulevad `AccessGroup` elementidest. |
| [Ühilduvus](#%C3%BChilduvus) | Kui konteineris on kasvõi üks piiratud sisalduv fail — ükskõik kui sügaval —, PEAB konteineri `Access` olema `AK`. Konteinerit EI TOHI märkida `Avalik`, lootes et piiratud failid tulevad `SubFile` elementidest. |
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
| [SegmentationMethod](#segmentationmethod) | Kasutada PEAKS registris [Jaotusalgoritmid ja konteinervormingud](segmentationMethods) avaldatud tunnuseid. Avaldamata tunnust VÕIB kasutada, kuid selle tundmisele ei saa tugineda. |
| [SegmentationMethod](#segmentationmethod) | Tunnusega lubatud vahemikuliike EI TOHI ületada: iga tunnuse määratlus ütleb, milliseid kolmest liigist tohib kasutada. |
| [SegmentationMethod](#segmentationmethod) | Kasutusel oleva `SegmentationMethod` väärtuse tähendus EI TOHI kunagi muutuda; muudatus nõuab uut tunnust. |
| [Jaotuse kontroll](#jaotuse-kontroll) | Osa tasandil kirjeldatud faili puhul PEAB `SegmentationCheck` sisaldama täpselt neid loendeid, mida faili `SegmentationMethod` nõuab; loendit, mida tunnus ei määratle, EI TOHI esitada. |
| [Jaotuse kontroll](#jaotuse-kontroll) | Rakendus PEAB nõutavad loendid ise arvutama ja võrdlema. Kui mõni erineb, EI TOHI rakendus osa tasandile laskuda ja PEAB rakendama terve faili kohta faili enda `Access` väärtust. |
| [SubFile](#subfile) | Iga `EntryName` TOHIB ühe konteineri sees esineda kuni üks kord. Väärtus on tee konteineri juure suhtes; eraldaja tee alguses või lõpus, tühjad segmendid, kurakaldkriips ning segmendid `.` ja `..` on keelatud. |
| [SubFile](#subfile) | Rakendus PEAB `EntryName` väärtusi konteineri kirjetega võrdlema täpselt nii, nagu vastava `ContainerFormat` kirje seda ette näeb. |
| [SubFile](#subfile) | Sisalduv fail, mida ükski `SubFile` element ei kirjelda, jääb konteineri enda `Access` väärtuse alla. Rakendus EI TOHI sellist faili avaldada. |
| [Konteinervorming](#konteinervorming) | Rakendus VÕIB sisalduvate failide tasandile laskuda ainult siis, kui ta tunneb `ContainerFormat` väärtust ja suudab konteineri lahti pakkida. Tundmatu tunnuse korral PEAB rakendus peatuma ja rakendama terve konteineri kohta konteineri enda `Access` väärtust. |
| [Konteinervorming](#konteinervorming) | Kui mõni `EntryName` ei vasta ühelegi konteineri kirjele, PEAB rakendus selle konteineri töötluse peatama ja rakendama terve konteineri kohta konteineri enda `Access` väärtust. |
| [Pesastuse sügavus](#pesastuse-s%C3%BCgavus) | Rakendus VÕIB seada oma pesastussügavuse piiri. Piirini jõudmisel PEAB ta peatuma ja rakendama selle tasandi kirje enda `Access` väärtust kogu allesoleva sisu kohta; see ei ole viga. Toetada PEAKS vähemalt üht tasandit. |
| [Pesastuse sügavus](#pesastuse-s%C3%BCgavus) | Rakendus PEAB lahtipakkimisel arvestama sisalduvate failide mahu ja arvu piiranguid, mitte ainult sügavust. |
| [Kinnikaetud koopia](#kinnikaetud-koopia-avaliku-versioonina) | Kinnikaetud koopias PEAB piiratud sisu olema failist tegelikult eemaldatud, mitte visuaalselt varjatud, ning koopia PEAB olema puhastatud ka metaandmetest, mis algset sisu kannavad. |
| [Kinnikaetud koopia](#kinnikaetud-koopia-avaliku-versioonina) | Algse faili asendamisel või täiendamisel tuleb kinnikaetud koopia uuesti koostada; vananenud koopiat EI TOHI dokumendis jätta. |
| [Laienduse edasiarendamine](#laienduse-edasiarendamine) | Uus versioon EI TOHI muuta selle laienduse nimeruumi, juurelementi ega olemasolevate elementide tähendust. |
| [Laienduse edasiarendamine](#laienduse-edasiarendamine) | Uue laienduse kasutamisel EI TOHI vanemat `granularAccess` plokki välja jätta. |

## Tagasiside

Laiendus on mustandi staatuses. Ettepanekud ja märkused on oodatud [DHX hoidla](https://github.com/e-gov/DHX) kaudu.
