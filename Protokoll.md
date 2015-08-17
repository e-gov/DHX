###  Dokumendivahetusprotokoll DHX

####  Ülevaade

Käesolev protokoll esitab tehnilise lahenduse, mis võimaldab Eesti avaliku sektori dokumendihaldussüsteemidel (DHS), aga ka avaliku sektoriga suhtlevatel era- ja vabasektori infosüsteemidel vahetada dokumente nn hajus- e detsentraliseeritud põhimõttel.

DHX on X-tee taristut kasutav uus dokumendivahetusprotokoll.

Erinevalt vanemast Dokumendivahetuskeskusest (DVK) ei nõua DHX enam "postkontoris" posti järel käimist, vaid toob dokumendid ukselävele kätte.

DHX on mõeldud avaliku sektori turvalise dokumendivahetuse korraldamiseks.

Protokolli koostamisel on aluseks protokollide spetsifitseerimise parim praktika [RIA-PP].

#### Mõisted ja lühendid

_Asutus_ &nbsp;&nbsp; Riigi ja kohaliku omavalitsuse asutuste riiklikku registrisse (RKOARR) kantud organisatsioon.

_Dokument_ &nbsp;&nbsp; Asutuses töödeldav dokument Eesti avaliku sektori dokumendihalduse tähenduses.

_DHS_ &nbsp;&nbsp; Dokumendihaldussüsteem, asutuse elektroonilise dokumendihalduse, sh dokumendivahetuse teenindamisele spetsialiseerunud infosüsteem.

_DHS-i teenus_ &nbsp;&nbsp; Suhe, kus üks organisatsioon (ettevõte või teine asutus) pakub asutusele DHS-i tehnilist keskkonda. Ühes tehnilises keskkonnas võib olla mitu "virtuaalset" DHS-i. Näiteks Majandus- ja Kommunikatsiooniministeerium pakub DHS-i teenust ministeeriumi haldusala asutustele; Koolide infosüsteem KIS pakub DHS-i teenust reale lasteaedadele.
 
_DVK_ &nbsp;&nbsp; Dokumendivahetuskeskus [DVK].

_Registrikood_ &nbsp;&nbsp; RKOARR-is asutusele antud registrikood. Nt `70002093` `Kadrioru lasteaed`.

_Teenuse identifikaator_ &nbsp;&nbsp; X-tee [X-tee] versiooni 6 nõuete kohane X-tee teenuse identifikaator. Identifitseerib unikaalselt X-tee teenuse nii Eesti X-teel kui ka X-tee implementatsioonide rahvusvahelises võrgus. Koosneb X-tee liikme identifikaatorist, teenuse koodnimetusest ja valikulisest versiooninumbrist. Näiteks: `EE/GOV/70003158/DHS/sendDocument`.

#### Põhijooned

1. DHX võimaldab elektroonilist dokumendivahetust korraldada detsentraliseeritult, ilma keskse postitöötlemissõlmeta.

2. Protokoll ei nõua individuaalseid (bilateraalseid) kokkuleppeid, häälestusi, liideste ehitamist vms dokumente vahetavate asutuste vahel. Protokolli järgiv asutus saab teisele asutusele saata dokumendi ilma mingi varasema kontaktita kahe asutuse vahel.

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

1. Organisatsioonilisel tasandil on osapoolteks:  
1) DHX dokumendivahetuse kasutusele võtnud asutused;  
2) DHX-i kasutusele võtnud DHS-i teenusena pakkujad;  
3) X-teega liitunud muud organisatsioonid (ettevõtted, MTÜ-d), kes soovivad DHX-i kaudu asutustele dokumente saata.

2.	Süsteemide tasandil on osapoolteks:  
1) DHS-d;  
2) muud X-teega liidestatud süsteemid, mis on huvitatud DHX-i kasutamisest dokumentide saatmiseks DHS-sse.

#### Interaktsioon

1. Joonisel 1 on esitatud interaktsiooni põhimõtteline skeem. Katkendjooned esitavad dokumentide liikumist.

```
+-----------+                      +-----------+
|           |<---------------------|           |
| Asutus 1  |                      |  Asutus 2 |
|           |--------------------->|           |
+-----------+                      +-----------+
``` 

```
+-----------+ sendDocument        +-----------+
|           |---O)----------------|           |
|    DHS 1  |                     |    DHS 2  |
|           |----------------(O---|           |
+-----------+        sendDocument +-----------+
``` 


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

   Saatja turvaserveris laeb perioodiliselt X-tee keskserverist alla teavet X-tee konfiguratsiooni kohta [PR-GCONF], sh teavet X-tee liikmete poolt määratletud alamsüsteemide (nt DHS) ja turvaserverite kohta. Saatja turvaserver teeb ülalnimetatud konfiguratsiooniteabe põhjal kindlaks, kas adressaat on määratlenud DHS alamsüsteemi. Kui ei ole, siis DHX võimekus puudub. Kui on, siis teeb pärib saatev süsteem adressaadi X-tee metateenusest `allowedMethods` [PR-META]  adressaadi poolt pakutavate teenuste nimekirja. Kui nimekirjas sisaldub `sendDocument`, siis adressaat on DHX võimeline ja järgneb dokumendi saatmine. Kui nimekirjas teenust ei ole, siis adressaat ei ole DHX võimeline ja dokument saadetakse DVK kaudu.

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

5.	Kui osutub, et adressaat ei ole veel dokumentide vastuvõtmise DHX-teenust loonud (teenus ei ole X-teel leitav), siis tuleb kasutada DVK protokolli (saata dokument DVK kaudu).

6.	Alates esimesest edukast DHX-protokolli kohasest dokumendiedastusest teise asutusse tuleb edaspidi sellesse asutusse saatmiseks kasutada ainult DHX-i (mitte DVK-d).

7.	Asutus, kes on DHX teenuse käivitanud, ei tohi seda enam maha võtta.

8.	Üleminekuperioodil peab asutus dokumente vastu võtma nii DVK kui ka DHX protokolli kaudu.

9.	Asutuse DHS-is tuleb tagada, et sama dokumendi saabumisel nii DVK kui ka DHX protokolli kaudu ei käsitleta dokumenti äriprotsessis kahekordselt. (Idempotentsus s.t sama dokumendi uuestisaatmine ei tohi tekitada ebasoovitavaid kõrvalefekte).

10.	DVK lülitatakse välja siis, kui kõik asutused on DHX protokolli võimekuse tõestatult loonud (asutus on vastu võtnud ja saatnud vähemalt ühe dokumendi). See tehakse kindlaks RIA DHS-st vastavate DHX kontrollpäringute saatmisega.

#### Viited

[AÜK] Vabariigi Valitsuse määrus „Asjaajamiskorra ühtsed alused“, <https://www.riigiteataja.ee/akt/130122011062?leiaKehtiv>.

[DVK] Dokumendivahetuskeskus (DVK). Riigi Infosüsteemi Amet. <https://www.ria.ee/dokumendivahetus>.

[DVK pidamise kord] Dokumendivahetuskeskuse pidamise kord. Riigi Infosüsteemi Amet. <https://www.ria.ee/public/dvk_kord.pdf>.

[DVK spetsifikatsioon] Dokumendivahetuskeskus (DVK). Liideste spetsifikatsioon 1.6.0.  <https://svn.eesti.ee/projektid/dvk/doc/dvk_spetsifikatsioon_1.6.0.odt>.

[DH metaandmed] Dokumendihalduse metaandmed. Loend 3.0. Majandus- ja Kommunikatsiooniministeerium <https://www.mkm.ee/sites/default/files/dokumendihalduse_metaandmed.pdf>.

[EXP] Exponential backoff. <https://en.wikipedia.org/wiki/Exponential_backoff>.

[Kapsel] Elektroonilise andmevahetuse metaandmete loend 2.1. Riigi Infosüsteemi Amet.  <https://riha.eesti.ee/riha/main/xml/elektroonilise_andmevahetuse_metaandmete_loend/1>.

[PR-META] X-Road Service Metadata Protocol.

[RIA-PP] Protokollide spetsifitseerimise parim praktika. Riigi Infosüsteemi Amet. 2015.

[X-tee] Andmevahetuskiht X-tee, <https://www.ria.ee/x-tee/>.
