###  Dokumendivahetusprotokoll DHX

Riigi Infosüsteemi Amet

v 0.6

#### Sisukord

- [Ülevaade](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#%C3%9Clevaade)
- [Mõisted ja lühendid](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#m%C3%B5isted-ja-l%C3%BChendid)
- [Põhijooned](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#p%C3%B5hijooned)
- [Motivatsioon](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#motivatsioon)
- [Eesmärk ("TO BE" olukord)](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#eesm%C3%A4rk-to-be-olukord)
- [Osapooled](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#osapooled)
- [Interaktsioon](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#interaktsioon)
- [DHX teenus](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#dhx-teenus)
- [Nimereegel](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#nimereegel)
- [Sõnumid](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#s%C3%B5numid)
- [Sõnumivorming](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#s%C3%B5numivorming)
- [Adressaadi DHX võimekuse kindlakstegemine](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#adressaadi-dhx-v%C3%B5imekuse-kindlakstegemine)
- [Töötlusloogika](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#t%C3%B6%C3%B6tlusloogika)
- [Kohustuslikkus](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#kohustuslikkus)
- [Laiendamisvõimalused](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#laiendamisv%C3%B5imalused)
- [Üleminek](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#%C3%9Cleminek)
- [DVK toimimine üleminekuperioodil](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#dvk-toimimine-%C3%BCleminekuperioodil)
- [Viited](https://github.com/e-gov/DHX/blob/gh-pages/Protokoll.md#viited)

####  Ülevaade

Dokumendivahetusprotokoll DHX on standardiseeritud tehniline ja organisatsiooniline lahendus, mis võimaldab asutustel vahetada dokumente hajus- e detsentraliseeritud põhimõttel.

DHX kasutab X-tee taristut. Erinevalt vanemast Dokumendivahetuskeskusest (DVK) ei nõua DHX enam "postkontoris" posti järel käimist, vaid toob dokumendid ukselävele kätte.

DHX on mõeldud eelkõige avaliku sektori dokumendivahetuse turvaliseks ja kuluefektiivseks korraldamiseks, kuid skeem on laiendatav ka era- ja vabasektori organisatsioonidele.

DHX toetab andmeteenuse vahendamist (X-tee mõistes).

Käesolev dokument määratleb nõuded, andmevormingud, töötlus- ja menetlusloogikad kõigile osapooltele - DHX-i rakendavatele asutustele, DHX-i vahendajatele ja X-tee keskusele.

Protokolli koostamisel on aluseks [protokollide spetsifitseerimise parim praktika](https://github.com/e-gov/Open-Workflow/blob/master/ProtokollideParimPraktika.md) [RIA-PP].

Protokolli on välja töötanud Riigi Infosüsteemi Amet. Ettepanekud ja märkused saata priit.parmakson@ria.ee või luua käesolevas varamus `Issue`.

#### Nõuete keel

Normatiivse tähendusega on käesolev tekst. GitHub-i varamu muul sisul on informatiivne tähendus.

Läbiva suurtähega esitatud sõnu tuleb tõlgendada järgmiselt (vrdl [RFC 2119]):
- "PEAB", "TOHIB AINULT" - protokolli implementeerija ei saa deklareerida protokollile vastavust, kui nõue on täitmata.
- "PEAKS" - implementatsiooni saab lugeda protokollile vastavaks ainult siis, kui nõude täitmisest kõrvalekaldumiseks on kaalukas põhjus.
- "VÕIB" - omadust võib implementeerida; mitteimplementeerimist ei pea põhjendama.

#### Mõisted ja lühendid

| | |
|---|---|
| _asutus_ | DHX dokumendivahetuses osalev organisatsioon. Eelkõige Eesti avaliku sektori asutus, aga võib olla ka ettevõte või vabasektori organisatsioon. Asutuselt eeldatakse ametlikku registrisse (riigi ja kohaliku omavalitsuse asutuste riiklik register (RKOARR), äriregister, mittetulundusasutuste register) kantust ja registrikoodi olemasolu. |
| _DHX dokumendivahetus_ | dokumentide vahetus X-teel vastavalt DHX protokollile. |
| _DHX otserakendaja_ | DHX-i otse, st ilma vahendajata rakendav (kasutav) asutus. |
| _DHX otserakendamine_ | DHX-i rakendamine (e kasutamine) ilma vahendajata. |
| _DHX teenus_ | standarditud nimemustriga `EE/GOV/<registrikood>/DHS/sendDocument` X-tee teenus, mille kaudu DHX-i otserakendaja ja või vahendaja võtavad vastu dokumente. |
| _DHX vahendamine_ | X-tee kasutusmuster kus vahendaja rollis tegutsev X-tee liige (DHX vahendaja) võimaldab oma infosüsteemi vahendusel kolmandatele isikutele juurdepääsu DHX dokumendivahetusele. Vt DHX otserakendamine. |
| _DHX vahendaja_, pikemalt _DHX dokumendivahetusteenuse vahendaja_, lühidalt lihtsalt _vahendaja_ | X-tee liige, kes osutab asutusele teenust, vahendades DHX dokumendiedastust. Tüüpiliselt DHS-i pilve- või majutusteenuse osutaja; võib olla nii erasektori teenuseosutaja kui ka avaliku sektori asutus, kes osutab teenust teisele asutusele. |
| _DHX vahendajate grupp_ | tehniline abinõu DHX vahendajate nimekirja pidamiseks. DHX vahendajate grupp on osa X-tee globaalsest konfiguratsioonist. |
| _DHX vahendajate nimekiri_ | X-tee keskuse (RIA) poolt peetav nimekiri DHX dokumendivahetusteenuse vahendajatest. |
| _DHX vahenduskasutus_ | DHX-i kasutamine läbi vahendaja. Vt DHX otsekasutus. |
| _DHX vastuvõtuvõimekus_ | DHS-i võimekus vastu võtta dokumente vastavalt DHX protokollile. |
| _DHX võimekus_ | DHS-i võimekus saata ja vastu võtta dokumente vastavalt DHX protokollile. |
| _DHS-i teenus_ | suhe, kus üks organisatsioon (ettevõte või teine asutus) pakub asutusele DHS-i tehnilist keskkonda. Ühes tehnilises keskkonnas võib olla mitu "virtuaalset" DHS-i. Näiteks Majandus- ja Kommunikatsiooniministeerium pakub DHS-i teenust ministeeriumi haldusala asutustele; Koolide infosüsteem KIS pakub DHS-i teenust reale lasteaedadele. |
| _dokument_ | asutuses töödeldav dokument Eesti avaliku sektori dokumendihalduse tähenduses. |
| _dokumendihaldussüsteem_, _DHS_ | asutuse elektroonilise dokumendihalduse, sh dokumendivahetuse teenindamisele spetsialiseerunud infosüsteem. |
| _globaalne konfiguratsioon_ | X-tee metaandmekogum, nimekiri X-tee liikmetest, alamsüsteemidest ja gruppidest. Vt [PR-GCONF], [PR-META]. |
| _DVK_ | Dokumendivahetuskeskus [DVK]. |
| _RIA_ | Riigi Infosüsteemi Amet. |
| _registrikood_ | asutuse ametlik registrikood. Nt `70002093` `Kadrioru lasteaed`. | 
| _teenuse identifikaator_ | X-tee [X-tee] versiooni 6 nõuete kohane X-tee teenuse identifikaator. Identifitseerib unikaalselt X-tee teenuse nii Eesti X-teel kui ka X-tee implementatsioonide rahvusvahelises võrgus. Koosneb X-tee liikme identifikaatorist, teenuse koodnimetusest ja valikulisest versiooninumbrist. Näiteks: `EE/GOV/70003158/DHS/sendDocument`. |
| _vahendaja_ | vt DHX vahendaja|
| _vahendatav_ | asutus, kes |
| _vahendusnimekiri_ | DHX dokumendivahendusteenuse vahendaja poolt X-teel teenusena pakutav nimekiri asutustest, keda ta vahendab. |
| _X-tee keskus_ | X-tee haldaja. X-tee keskuse rolli täitab RIA. X-tee keskus peab DHX vahendajate nimekirja. |
|---|---|

#### Põhijooned

1. DHX võimaldab elektroonilist dokumendivahetust korraldada detsentraliseeritult, ilma keskse postitöötlemissõlmeta.
2. Protokoll ei nõua individuaalseid (bilateraalseid) kokkuleppeid, häälestusi, liideste ehitamist vms dokumente vahetavate asutuste vahel. Protokolli järgiv asutus saab teisele asutusele saata dokumendi ilma mingi varasema kontaktita kahe asutuse vahel.

#### DHX rakendamine
Asutus rakendab DHX-i kas otse või läbi vahendaja.
 
#### Otserakendamine
Otserakendamisel PEAB asutus välja arendama ja avama teistele avaliku sektori asutustele standarditud nimemustriga `EE/GOV/<registrikood>/DHS/sendDocument` X-tee teenuse (DHX teenuse) ja selle teenuse kaudu vastavalt käesolevale protokollile dokumente vastu võtma.
 
#### Vahendamine
1  Vahendamise korral vahetab asutus dokumente läbi vahendaja. Vahendaja infosüsteem edastab dokumente X-teel. Asutus ise otseselt X-teega ei suhtle.

2  Vahendamise korral arendab DHX teenuse välja ja käitab teenust vahendaja.

3  DHX rakendamisel läbi vahendaja PEAB asutus sõlmima lepingu DHX vahendajaga. Kasutada TOHIB AINULT X-tee keskuse poolt DHX vahendajate nimekirja lisatud vahendajaid.

4  Vahendaja PEAB X-tee teenuse vormis avalikustama vahendusnimekirja - nimekirja asutustest, keda ta esindab.

5  Vahendamisele kehtivad X-tee määrusest tulenevad nõuded: vahendajana end X-teel registreerimise kohustus, andmeteenuse vahendamise korra (poliitika) koostamise ja avalikustamise kohustus jm (vt [X-tee määrus] § 13).

#### Vahendusnimekiri
1  Vahendusnimekiri on vahendaja peetav nimekiri tema vahendatavatest asutustest. Iga vahendaja peab oma vahendusnimekirja.

2  Vahendaja PEAB hoidma vahendusnimekirja ajakohasena. Ajakohasus tähendab seda, et vahendusnimekirjas on need ja ainult need asutused, kellega vahendajal on kehtivad vahenduslepingud.

3  Vahendaja PEAB vahendusnimekirja tegema kättesaadavaks X-tee teenusena.

2  Vahendusnimekirja teenuse nimi on `EE/<liikmeklass>/<registrikood>/DHX/representationList`, kus

- `EE` on X-tee Eesti instantsi nimi
- `<liikmeklass>` on X-tee liikmeklass (vastavalt vahendaja õiguslikule vormile kas `GOV` või `PRI`) 
- `DHX` on teenuse ülesleidmist tagav, käesoleva protokolliga fikseeritud X-tee alamsüsteeminimi ja
- `<registrikood>` on asutuse registrikood.

Näide: `EE/PRI/40001111/DHX/representationList`

3  Vahendatavad asutused esitatakse vahendusnimekirjas registrikoodide abil. Vahendusnimekirja teenus PEAB vastama lisas esitatud täpsemale spetsifikatsioonile.

#### Vahendajate nimekiri
1  Vahendajana tegutseda sooviv asutus või ettevõte PEAB end vahendajana X-teel registreerima.

2  Vahendajate nimekiri on X-tee keskuse (RIA) poolt peetav nimekiri DHX dokumendivahetusteenuse vahendajatest.

3  Tehniliselt teostatakse vahendajate nimekiri DHX vahendajate grupina. DHX vahendajate grupp on osa X-tee globaalsest konfiguratsioonist.

4  X-tee keskus lisab vahendaja DHX vahendajate gruppi. 

####	Motivatsioon

1. DHS-id vahetavad praegu dokumente DVK kaudu, kasutades tingliku nimetusega "DVK protokolli".

2. "DVK protokolli" määravad elektroonilise andmevahetuse metaandmete loend [Kapsel], DVK liideste spetsifikatsioon [DVK spetsifikatsioon] ja [DVK pidamise kord], laiemas plaanis ka "Asjaajamise ühtsed alused" [AÜK].

3. Väiksemal arvul on dokumendivahetusliideseid loodud ka muude dokumente töötlevate infosüsteemide vahele. Need liidesed ei ole standarditud.

4. Laienev dokumendiringlus ja dokumente vahetavate infosüsteemide tihenev võrgustik (dokumendivahetus tänapäeval ei piirdu „puhaste“ DHS-dega – dokumente vahetavad ka infosüsteemid, kus dokumendihaldus klassikalises mõttes on ainult üks andmetöötluse liik) nõuab alternatiivi ühe keskse postkastiserveri kaudu toimuvale dokumendiliiklusele.

#### Eesmärk ("TO BE" olukord)

1. DHS-id vahetavad dokumente, kasutades dokumendivahetusteenuseid, mis järgivad hajusdokumendivahetuse protokolli DHX.

2. Iga DHS pakub ise ja kasutab teiste asutuste samasugust DHX dokumendivahetusteenust.

3. Kõik DHS-id pakuvad ühesugust teenust — süsteem on sümmeetriline.

4. Kogu dokumendivahetus asutuste vahel toimub ülalnimetatud viisil. DVK on käigust kõrvaldatud. Vahelülisid ega kesksõlmi ei kasutata.

####	Osapooled

1. Organisatsioonilisel tasandil on osapoolteks: 1) asutused; 2) vahendajad.
2.	Süsteemide tasandil on osapoolteks DHS-d.  

#### Interaktsioon
1. Joonistel 1-2 on esitatud interaktsiooni põhimõtteskeem. Katkendjooned esitavad dokumentide liikumist.

a) asutuse tasand
```
+-----------+      dokument        +-----------+
|           |<---------------------|           |
| Asutus 1  |       X-tee          |  Asutus 2 |
|           |--------------------->|           |
+-----------+      dokument        +-----------+
``` 
b) süsteemitasand
```
+-----------+ sendDocument        +-----------+
|           |---O)----------------|           |
|    DHS 1  |        X-tee        |    DHS 2  |
|           |----------------(O---|           |
+-----------+        sendDocument +-----------+
```
Joonis 1 Otserakendamisel

a) asutuse tasand
```
+-----------+                      +-----------+    +-----------+
|           |<---------------------|           |<---|           |
| Asutus 1  |       X-tee          | Vahendaja |    |  Asutus 2 |
|           |--------------------->|           |--->|           |
+-----------+                      +-----------+    +-----------+
```

b) süsteemi tasand 
```
+-----------+ sendDocument        +-----------+    +-----------+
|           |---O)----------------|           |<---|           |
|    DHS 1  |       X-tee         | Majutus - |    |   DHS 2   |
|           |----------------(O---| süsteem   |--->|(majutuses)|
+-----------+        sendDocument +-----------+    +-----------+
```
Joonis 2  Vahendamisel


2. Organisatsioonide abstraktsioonitasandil vahetavad asutused dokumente neid vahetult üksteisele saates ja vastu võttes.

3. Süsteemide tasandil teostatakse dokumendivahetus DHS-de omavahelise suhtlusega X-teel.

4. Suuremal asutuse on tavaliselt oma DHS. Kuid paljud asutused, eriti väikesed, kasutavad DHS-i teenusena. Sellisel juhul võib tehniline DHS keskkond "majutada" mitmete asutuste DHS-e. DHX protokoll toimib mõlemal juhul, aga ka  harvaesinevates olukordades, kus asutusel on mitu DHS-i.

#### DHX teenus

1.	Asutus arendab oma DHS-is välja ja avab X-teel kõigile teistele avaliku sektori asutustele X-tee teenuse — DHX teenuse, millega teised asutused saavad asutusele dokumente saata.

Märkus. Kui asutus kasutab DHS-i teenusena, siis arendab teenuse välja DHS teenusepakkuja. 
Asutus volitab teenusepakkujat käitama DHX teenust asutuse nimel. See teostatakse vastavalt X-tee sertifikaatide haldamise korrale.

2.	DHX teenus on asutuse ametlik dokumentide vastuvõtmise kanal X-teel.

3.	Dokumentide saatmiseks teise asutusse kasutab DHS teise asutuse pakutavat DHX teenust.

4.	Teenus peab olema üleval vähemalt 8 h päevas. DHS, mille võimekus on väiksem, peab looma kõrgema käideldavusega puhverkomponendi, selleks sobivad hästi järjekorrahalduri (_Message Queue_) lahendused. Viimaseid on turul mitmeid.

5.	DHX teenusele võivad dokumente saata mitte ainult teised DHS-id, vaid kõik X-teega liitunud organisatsioonid. Põhjendatud juhtudel võib asutus DHX teenusele juurdepääsu piirata X-tee liikmetele, kes ei ole asutused.

6.	DHX on standarditud dokumendivahetusskeem, mis võimaldab lihtsat suhtlust suure osapoolte arvu vahel. Kuid asutused võivad konkreetsetest ärivajadustest lähtudes luua X-teed kasutavaid muid, spetsiaalseid liideseid dokumentide ja muu teabe vahetamiseks nii DHS-de kui ka muude infosüsteemide vahel.

#### Nimereegel

1.	DHX teenuse nimetus peab vastama käesolevas jaotises määratletud kujule. Nimekuju fikseerimisega tagatakse teenuse ülesleitavus ja selle kaudu asutuse adresseeritavus.

2.	DHX teenuse tehniline koodnimetus X-tee mõistes on `sendDocument`.

3.	Teenuse täisnimetus vastavalt X-tee v6 nimereeglitele on kujul
 `EE/GOV/<registrikood>/DHS/sendDocument`
 
   kus `DHS` on teenuse ülesleidmist tagav, käesoleva protokolliga fikseeritud nimi ja `<registrikood>` on asutuse registrikood.

   Märkus. `EE/GOV` on X-tee v6 Eesti avaliku sektori asutuse liiginimetus.

   Teenuse tehnilisele koodnimetusele ei lisata versiooninumbrit.

   Näide: `EE/GOV/70003158/DHS/sendDocument`

#### Sõnumid

1.	Interaktsioonis liiguvad kaht tüüpi sõnumid: teenusele `sendDocument` saadetud X-tee päringusõnum (päring) ja sellele vastu saadetav vastussõnum (vastus).

2.	Dokument edastatakse päringus.

3.	Dokumendi kättesaamise kohta saadetakse X-tee päringu vastuses kinnitus.

#### Sõnumivorming

1.	Dokument edastatakse metaandmeid sisaldavas "kapslis", mis peab vastama ametlikult kinnitatud Elektroonilise andmevahetuse metaandmete loendile [Kapsel].

2.	Dokumendi kapslis edastatakse muuhulgas adressaadiks oleva asutuse registrikood.

3.	Väljasaatev DHS annab dokumendile identifikaatori (numbri), mis on unikaalne vähemalt DHS-i piires.

#### Adressaadi DHX võimekuse kindlakstegemine

1.	Saatev süsteem võib kasutada üht või mitut järgmistest meetoditest.

2. Adressaadi DHX võimekuse kindlakstegemine saatmisüritusega.

    Saatev süsteem üritab dokumenti saata;  
    kui tuleb vastus, et sellist teenust ei ole, siis adressaadil DHX võimekus puudub ja dokument saadetakse DVK kaudu.
   
    Meetod ei nõua olekuteabe hoidmist saatvas süsteemis adressaatide võimekuse kohta.

3.	Adressaadi DHX võimekuse väljaselgitamine enne saatmiskatset.

   Saatja turvaserver laeb perioodiliselt X-tee keskserverist alla teavet X-tee konfiguratsiooni kohta [PR-GCONF], sh teavet X-tee liikmete poolt määratletud alamsüsteemide (nt DHS) ja turvaserverite kohta. Saatja turvaserver teeb ülalnimetatud konfiguratsiooniteabe põhjal kindlaks, kas adressaat on määratlenud DHS alamsüsteemi. Kui ei ole, siis DHX võimekus puudub. Kui on, siis teeb pärib saatev süsteem adressaadi X-tee metateenusest `allowedMethods` [PR-META]  adressaadi poolt pakutavate teenuste nimekirja. Kui nimekirjas sisaldub `sendDocument`, siis adressaat on DHX võimeline ja järgneb dokumendi saatmine. Kui nimekirjas teenust ei ole, siis adressaat ei ole DHX võimeline ja dokument saadetakse DVK kaudu.

4. DHX võimekuse väljaselgitamine enne saatmist koos puhverdamisega.

   Sama, mis eelmine meetod, kuid päringute tulemusi puhverdatakse (ei korrata mingi aja jooksul, vaid tuginetakse esimese päringu tulemusele). Meetod nõuab olekuteabe hoidmist saatvas süsteemis adressaatide võimekuse kohta.

#### Töötlusloogika

1.	Dokument loetakse edastatuks, kui adressaat-DHS või selle ees olev kõrgema käideldavusega puhverkomponent on saatjale saatnud kinnituse ja saatja on selle kätte saanud.

2.	Kui adressaadiga ei saa ühendust või kättesaamise kinnitust ei tule, siis tuleb mõne aja pärast saatmist uuesti üritada (sarnaselt DVK protokollile).
Tühipäringute arvu vähendamiseks on soovitatav kasutada hästituntud eksponentsiaalse taganemise (_Exponential Back-off_) algoritmi [EXP].

3.	Dokumendi vastuvõtmisel peab DHS kontrollima, kas tegu on teist korda saadetud dokumendiga ja vältima ühe ja sama dokumendi äriloogikalist korduvmenetlemist, nt arve kahekordset kandmist raamatupidamissüsteemi. Duplikaatide kindlakstegemist võimaldab dokumendi unikaalne identifikaator.

4.	Mitut asutust teenindav DHS tehniline süsteem peab tagama DHX teenuse kaudu saabunud dokumendi toimetamise õige adressaadi "virtuaalsesse" DHS-i.

5.	Valesti adresseeritud dokumentide kohta saadetakse saatjale kinnituse asemel vastav teade.

#### Kohustuslikkus

1.	Protokollist saadav efekt on suurim, kui kõik asutused võtavad selle kasutusele. Protokolli kujundamisel on eeldatud, et valdav enamus asutusi hakkab DHX-i kasutama.

2.	Samas DHX-i mittekasutavate asutuste olemasolu ei häiri DHX-i kasutamist.

3.	Protokoll ei nõua kõigi asutuste üheaegset lülitumist DHX protokollile (vt jaotis "Üleminek").

4.	Protokolli kasutamise kohustuse kehtestamine ei ole käesoleva protokolli käsitlusalas (skoobis).

#### Laiendamisvõimalused

1.	DHX protokolli olemuslikud elemendid on: 1) teenuste lihtsat ülesleidmist (_Service Discovery_) võimaldav nimereegel; 2) standarditud sõnumivorming (dokumendiga koos edastatavad metaandmed, nn "kapsel" ); 3) kohaletoimetamist (_Quaranteed Delivery_) praktiliselt tagav töötlusloogika; 4) X-tee kasutamine.

2.	DHX protokolli kasutamine Eesti erasektoris kui ka rahvusvahelises dokumendivahetuses on edasise standardimise objekt.

#### Üleminek

1.	Üleminek DHX protokollile toimub etteantud perioodi jooksul. Üleminekuperiood algab kõigile asutustele üheaegselt. Perioodi algusest teavitab RIA.

2.	Üleminekuperioodil arendavad asutused välja oma DHS-des DHX protokolli kohase dokumentide saatmise ja vastuvõtmise võimekuse. Tehniliselt tähendab "DHX-i võimekus" DHX protokolli kohase X-tee teenuse pakkumist ja võimet teiste asutuste samasuguse teenuse poole pöörduda.

3.	DHX protokolli kohane dokumentide saatmise ja vastuvõtmise võimekus arendatakse DHS-is välja ja võetakse kasutusele üheaegselt. Kuid arendused erinevates DHS-des valmivad erinevatel aegadel.

4.	Üleminekuperioodil niipea, kui asutuse DHS-is on tekkinud DHX protokolli võimekus (arendus on lõppenud), kohustatud hakkama dokumendi saatmisel esimese võimalusena kasutama DHX-teenust.

5.	Kui osutub, et adressaat ei ole veel dokumentide vastuvõtmise DHX-teenust loonud (teenus ei ole X-teel leitav), siis saadetakse dokument DVK kaudu, kasutades DVK teenust `sendDocument` ja märkides adressaadi dokumendi metaandmete kapslis.

6.	Alates esimesest edukast DHX-protokolli kohasest dokumendiedastusest teise asutusse tuleb edaspidi sellesse asutusse saatmiseks kasutada ainult DHX-i (mitte DVK-d).

7.	Asutus, kes on DHX teenuse käivitanud, ei tohi seda enam maha võtta.

#### DVK toimimine üleminekuperioodil

1. DVK-d hoitakse töös kogu üleminekuperioodi vältel. DVK-d täiendatakse üleminekuperioodil toimimiseks vajaliku funktsionaalsusega.

2. DVK pakub teenust `sendDocument`, millega DHX-i võimekuse loonud asutus saab edastada dokumendi edasisaatmiseks DHX võimekust veel mitteomavale asutusele. Edasisaatmise teostab DVK.

3. DHX-i võimekuse loonud asutusele adresseeritud dokumendi laekumisel DVK-sse üritab DVK seda kohe edasi saata.

4.	DVK lülitatakse välja siis, kui kõik asutused on DHX protokolli võimekuse tõestatult loonud (asutus on vastu võtnud ja saatnud vähemalt ühe dokumendi). See tehakse kindlaks RIA DHS-st vastavate DHX kontrollpäringute saatmisega.

#### Viited

[AÜK] Vabariigi Valitsuse määrus „Asjaajamiskorra ühtsed alused“, <https://www.riigiteataja.ee/akt/130122011062?leiaKehtiv>.

[DVK] Dokumendivahetuskeskus (DVK). Riigi Infosüsteemi Amet. <https://www.ria.ee/dokumendivahetus>.

[DVK pidamise kord] Dokumendivahetuskeskuse pidamise kord. Riigi Infosüsteemi Amet. <https://www.ria.ee/public/dvk_kord.pdf>.

[DVK spetsifikatsioon] Dokumendivahetuskeskus (DVK). Liideste spetsifikatsioon 1.6.0.  <https://svn.eesti.ee/projektid/dvk/doc/dvk_spetsifikatsioon_1.6.0.odt>.

[DH metaandmed] Dokumendihalduse metaandmed. Loend 3.0. Majandus- ja Kommunikatsiooniministeerium <https://www.mkm.ee/sites/default/files/dokumendihalduse_metaandmed.pdf>.

[EXP] Exponential backoff. <https://en.wikipedia.org/wiki/Exponential_backoff>.

[Kapsel] Elektroonilise andmevahetuse metaandmete loend 2.1. Riigi Infosüsteemi Amet.  <https://riha.eesti.ee/riha/main/xml/elektroonilise_andmevahetuse_metaandmete_loend/1>.

[PR-GCONF] [X-Road Protocol for Downloading Configuration](http://x-road.eu/docs/x-road_protocol_for_downloading_configuration.pdf).

[PR-META] X-Road Service Metadata Protocol(https://www.ria.ee/public/x_tee/pr-meta_x-road_service_metadata_protocol_2.1.3_Y-743-14.pdf).

[RIA-PP] [Protokollide spetsifitseerimise parim praktika](https://github.com/e-gov/Open-Workflow/blob/master/ProtokollideParimPraktika.md). Riigi Infosüsteemi Amet. 2015.

[RFC 2119] [Key words for use in RFCs to Indicate Requirement Levels](https://www.ietf.org/rfc/rfc2119.txt).

[UG-SIGDOC] [X-Road: Signed Document Download and Verification Manual](http://x-road.eu/docs/x-road_signed_document_download_and_verification_manual.pdf). 

[X-tee] Andmevahetuskiht X-tee, <https://www.ria.ee/x-tee/>.

[X-tee määrus] Vabariigi Valitsuse määrus "Infosüsteemide andmevahetuskiht" (eelnõu 09.03.2016). 
