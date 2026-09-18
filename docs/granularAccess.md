# Kapsli laiendus granularAccess

**Staatus: MUSTAND (versioon 0.1-draft).** Spetsifikatsioon ei ole veel lõplik ja on avaldatud tagasiside kogumiseks. Struktuuri üksikasjad võivad muutuda.

Tehniline dokumentatsioon:

* [granularAccess.xsd](v2.1/granularAccess.xsd)
* [GranularAccessExample1.xml](v2.1/GranularAccessExample1.xml)

## Milleks laiendus on

Kapslis [Kapsel](Kapsel) kirjeldab juurdepääsutingimust üksainus element `DecContainer/Access`, mis kehtib terve dokumendi ja kõigi selle failide kohta. Kui dokumendis on kasvõi üks piiranguga fail, tuleb kogu dokument tunnistada asutusesiseseks (AK) — ka siis, kui suurem osa sellest on tegelikult avalik.

Avaliku teabe seaduse § 38 lõige 2 näeb ette teistsuguse tulemuse:

> Kui teabele juurdepääsu võimaldamine võib põhjustada juurdepääsupiiranguga teabe avalikuks tulemise, siis tagatakse juurdepääs üksnes sellele osale teabest või dokumendist, mille kohta juurdepääsupiirangud ei kehti.

Laiendus `granularAccess` võimaldab kirjeldada, millised tervikuna piiratud dokumendi **failid** on tegelikult avalikud, ja vajaduse korral ka millised faili **osad** (leheküljed, lõigud, sõnad) on avalikud. Nii saab vastuvõttev süsteem hiljem teabenõudele vastates avaldada just selle osa, mille kohta piirang ei kehti.

Laienduse praktiline põhieesmärk on eristada avalikke faile piiratutest. Osa tasandi kirjeldus on ette nähtud peamiselt tulevikuks — see on olemas siis, kui dokumendihaldussüsteemid suudavad seda luua ja töödelda.

## Ühilduvus

Laiendus **ei muuda** `Kapsel.xsd` faili. Ta paigutatakse elementi `RecordTypeSpecificMetadata`, mis on kapslis ainus laiendamiseks mõeldud koht (`xs:any processContents="skip"`). Seetõttu:

* Laiendust mittetundev rakendus töötab täpselt nagu varem, kasutades ainult `DecContainer/Access` väärtust. Ta ei pea kapsli töötlemist muutma ega laiendust valideerima.
* Laiendust tundev rakendus saab lisaks avada faile või failiosi.

Ühilduvuse tagab üks reegel.

> **Ühilduvusreegel.** Iga tasand peab olema vähemalt niivõrd piirav kui kõik sellesse kuuluvad tasandid.
>
> `DecContainer/Access` ⊇ `File/Access` ⊇ `AccessGroup/Access`

Juurdepääs muutub dokumenti süvenedes seega ainult **leebemaks**, mitte kunagi rangemaks. Rakendus, mis peatub mis tahes tasandil, ei anna kunagi juurdepääsu millelegi, mida võimekam rakendus peaks piirama — halvimal juhul on tulemus vajalikust konservatiivsem.

Sellest järeldub kaks asja, mida on lihtne valesti teha:

* Kui failis on kasvõi üks piiratud osa, PEAB `File/Access` olema `AK`. Faili ei tohi märkida `Avalik`, lootes et piiratud osad tulevad allpool olevatest `AccessGroup` elementidest — faili tasandil peatuv rakendus avaldaks siis terve faili.
* Kui `DecContainer/Access` on `Avalik`, on kogu dokument juba avalik ja laiendusel ei ole midagi avada. Sellisel dokumendil ei tohiks laiendust üldse olla.

## Töötlusjärjekord

Laiendust tundev rakendus liigub tasandite kaupa ja peatub esimesel tasandil, mida ta ei suuda töödelda.

1. **Dokument.** Kui `DecContainer/Access/AccessConditionsCode` on `Avalik`, on kogu dokument koos failidega avalik. `RecordTypeSpecificMetadata` elementi ei ole vaja uurida.
2. **Fail.** Kui dokumendi kood on `AK`, otsib rakendus iga `DecContainer/File` jaoks üles `granularAccess/File` kirje, mille `FileGuid` ühtib. Fail, millel kirje puudub või millel puudub oma `Access`, jääb piiratuks nagu ütleb `DecContainer/Access`.
3. **Avalik fail.** Kui kirje `Access/AccessConditionsCode` on `Avalik`, on terve fail avalik. Rakendus peatub siin — selle faili `AccessGroup` elemente ei ole vaja uurida ja neid ei tohi ka olla.
4. **Jaotusalgoritm.** Kui kood on `AK`, on fail tervikuna piiratud, kuid selle osad võivad olla avalikud. Rakendus võib osa tasandile laskuda **ainult siis**, kui ta tunneb faili `SegmentationMethod` väärtust ja suudab jaotuse täpselt taastada. Kui element puudub või väärtus on tundmatu, PEAB rakendus peatuma ja rakendama terve faili kohta faili enda `Access` väärtust.
5. **Osad.** Algoritmi tundes loeb rakendus `DefaultPartAccessConditionsCode` välja ja rakendab seejärel iga `AccessGroup` väärtust selles loetletud vahemike kohta.

## Struktuur

```text
granularAccess
└── File                              (1..n)
    ├── FileGuid                              viide DecContainer/File failile
    ├── Access                        (0..1)  terve faili juurdepääsutingimus
    ├── SegmentationMethod            (0..1)  jaotusalgoritmi tunnus
    ├── DefaultPartAccessConditionsCode (0..1) katmata osade tingimus
    └── AccessGroup                   (0..n)
        ├── Access                            rühma juurdepääsutingimus
        ├── PageRange                 (0..n)  StartPage, EndPage
        ├── ParagraphRange            (0..n)  StartParagraph, EndParagraph
        └── WordRange                 (0..n)  StartWord, EndWord
```

`Access` on nii `File` kui `AccessGroup` tasandil struktuurilt samasugune kui kapsli `DecContainer/Access`: `AccessConditionsCode` (`Avalik` või `AK`) ja korduv `AccessRestriction`.

### File

| element | kohustuslik | kirjeldus |
| ------- | ----------- | --------- |
| `FileGuid` | jah | Vastava `DecContainer/File` elemendi `FileGuid`. Nii seotakse juurdepääsukirjeldus failiga. |
| `Access` | ei | Terve faili juurdepääsutingimus. Puudumisel kehtib `DecContainer/Access`. |
| `SegmentationMethod` | ei | Faili osadeks jaotamise algoritmi tunnus. Kohustuslik, kui kasutatakse `AccessGroup` vahemikke. |
| `DefaultPartAccessConditionsCode` | ei | Nende osade tingimus, mida ükski `AccessGroup` ei kata. Puudumisel eeldatakse `AK`. |
| `AccessGroup` | ei | Vahemike rühmad. Omavad tähendust ainult siis, kui faili `Access` on `AK`. |

Kõiki kapsli faile ei pea loetlema. Loetlemata fail jääb piiratuks koos ülejäänud dokumendiga.

### DefaultPartAccessConditionsCode

See väli otsustab, kumba poolt on vaja loetleda — nii ei pea kunagi kirjeldama kõiki faili osi.

* `Avalik` — katmata osad on avalikud, seega loetletakse `AccessGroup` elementides ainult **piiratud** osad. Sobib valdavalt avalikule failile, kus on üksikud piiratud kohad.
* `AK` — katmata osad pärivad faili piirangu, seega loetletakse ainult **avatavad** osad. Sobib valdavalt piiratud failile, millest avaldatakse üksikud osad.

Puudumisel eeldatakse `AK`, mis on turvaline lugemisviis.

### Vahemikud

Kõik vahemikud on **kaasavad** (`End...` kuulub vahemikku) ja loendus algab **1-st**. Üht osa katva vahemiku puhul on algus ja lõpp võrdsed.

Kolme liiki vahemikke loendatakse **üksteisest sõltumatult** ja neid võib ühes rühmas segamini kasutada. Sõnavahemikku ei ole seega vaja siduda seda sisaldava lõigu ega leheküljega — sõnad on nummerdatud üle terve faili, mitte lõigu kaupa uuesti alustades.

| vahemik | väljad | märkused |
| ------- | ------ | -------- |
| `PageRange` | `StartPage`, `EndPage` | Lehekülje **asukoht failis**, mitte leheküljele trükitud number (need võivad erineda, nt tiitellehe või rooma numbritega eesosa tõttu). |
| `ParagraphRange` | `StartParagraph`, `EndParagraph` | Lõikude tähendus sõltub algoritmist — nt tabelarvutusfailis võib lõik olla üks rida. |
| `WordRange` | `StartWord`, `EndWord` | Nummerdatud üle terve faili. |

Sama faili erinevate `AccessGroup` elementide vahemikud ei tohi kattuda. Kattumise korral kehtib kattuva osa kohta **rangem** rühm.

### SegmentationMethod

Faili osadeks jaotamise viisi ei saa eeldada: erinevaid failitüüpe jaotatakse erinevalt ning ka ühe tüübi sees on valikukohti (kas leheküljenumbrid, päised ja jalused loetakse kaasa; mis on „sõna“). Seepärast annab `SegmentationMethod` algoritmi tunnuse, mille alusel vahemikke tõlgendatakse.

Laiendus **teadlikult ei fikseeri kinnist algoritmide loetelu**, et uusi algoritme saaks kokkuleppel kasutusele võtta ilma skeemi muutmata. Soovituslik on, et väärtus näitaks nii meetodit kui selle versiooni, näiteks `whitespace-split-v1`, `docx-paragraphs-v1` või `pdf-pages-v1`.

Algoritm määrab ka selle, **millised vahemikuliigid on antud faili puhul üldse tähenduslikud**, ja võib mõne kasutamise keelata. Näiteks skaneeritud PDF-i saab kirjeldada lehekülgede kaupa, kuid mitte lõikude ega sõnade kaupa, sest masinloetavat teksti ei ole. Tabelarvutusfaili saab kirjeldada nii, et iga rida loetakse lõiguks — eraldi lahtri tasandi konstruktsiooni ei ole selleks vaja.

`SegmentationMethod` toimib ühtlasi **väravana** osa tasandi töötlusele: tundmatu või puuduva väärtuse korral peatub rakendus faili tasandil (vt töötlusjärjekorra samm 4). See on turvaline, sest faili `Access` ei ole kunagi leebem kui ükski selle osa. Seepärast on soovitatav algoritmide tunnused ja nende täpne kirjeldus kokku leppida ja avaldada keskselt, mitte üksnes kahepoolselt — nii saavad rohkemad süsteemid osa tasandit tegelikult kasutada.

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

Fail ise on `AK` (ühilduvusreegel), kuid `DefaultPartAccessConditionsCode` avab kõik osad, mida allpool ei loetleta. Loetleda tuleb ainult piiratud kohad.

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
  <SegmentationMethod>whitespace-split-v1</SegmentationMethod>
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

### Skaneeritud PDF

Skaneeritud lehekülgedel ei ole masinloetavat teksti, seega kirjeldab algoritm `pdf-pages-v1` ainult lehekülgi ja keelab lõigu- ning sõnavahemikud. Leheküljetäpsus on piisav, et jätta avaldamata kaks piiratud sisuga lehekülge.

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

## Piirid

Laiendus on teadlikult piiratud ulatusega. Praeguses versioonis **ei** saa kirjeldada:

* **Kapsli metaandmete väljade juurdepääsu** — näiteks kui `RecordTitle` ise sisaldab isikuandmeid. Dokumendihaldussüsteemides kasutatakse selleks tavaliselt eraldi avalikku pealkirja; see kuulub muude protokolli muudatuste või laienduste valdkonda.
* **Asukohta pildis** — näiteks isikukoodi ümbritsevat ristkülikut skaneeritud lehel. Koordinaatide töötlemine oleks praegustele dokumendihaldussüsteemidele liiga keeruline; skaneeritud failide puhul on lahenduseks leheküljetäpsus.
* **AK-märke tegemist dokumendile endale.** AvTS § 41 lõige 2 nõuab märke tegemist dokumendile, kui teabekandja seda võimaldab. Laiendus kirjeldab juurdepääsu kapslis ja seda kohustust ei asenda.

## Tagasiside

Laiendus on mustandi staatuses. Ettepanekud ja märkused on oodatud [DHX hoidla](https://github.com/e-gov/DHX) kaudu.
