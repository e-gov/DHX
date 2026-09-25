# Elektroonilise andmevahetuse metaandmete loend

Metaandmed, mida saadetakse dokumendi edastamisel DHX kaudu, lihtsustamaks elektroonilist suhtlust dokumendihaldussüsteemide ja teiste infosüsteemide vahel.

## Versioon 2.1

Tehniline dokumentatsioon:

* [Kapsel.xsd](v2.1/Kapsel.xsd)
* [Kirjeldus.pdf](v2.1/Kirjeldus.pdf)
* [Naide1.xml](v2.1/Naide1.xml)
* [Naide2.xml](v2.1/Naide2.xml)
* [Naide3.xml](v2.1/Naide3.xml)
* [Vastavustabel.ods](v2.1/Vastavustabel.ods)

### Laiendused

Kapslit saab laiendada elemendi `RecordTypeSpecificMetadata` kaudu, muutmata `Kapsel.xsd` faili. Laiendust mittetundev rakendus töötab sellisel juhul edasi täpselt nagu varem.

* [granularAccess](granularAccess) (MUSTAND) — täpsem juurdepääsutingimuste kirjeldamine kui terve dokumendi tasandil: faili kaupa, konteinerfailis sisalduvate failide kaupa ning faili sees lehekülgede, lõikude ja sõnade kaupa. Valmistab ette avaliku teabe seaduse § 38 lõikes 2 nõutud osalise juurdepääsu andmise: tervikuna piiratud dokumendi avaliku osa saab avaldada ilma dokumenti uuesti läbi töötamata. Lisaks saab edastada dokumendi avalikustatava pealkirja, lühiesituse ja failinimed.
  * [Jaotusalgoritmid ja konteinervormingud](segmentationMethods) (MUSTAND) — laienduse juurde kuuluv register, mis määratleb, kuidas faili osadeks jaotatakse (`SegmentationMethod` tunnused) ja kuidas konteinerfailis sisalduvad failid tuvastatakse (`ContainerFormat` tunnused). Täieneb laiendust muutmata.

## Versioon 1.0

Tehniline dokumentatsioon:

* [dhl-meta-automatic.xsd](v1.0/dhl-meta-automatic.xsd)
* [dhl-meta-manual.xsd](v1.0/dhl-meta-manual.xsd)
* [dhl.xsd](v1.0/dhl.xsd)
