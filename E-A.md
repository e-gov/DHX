# E-arvete ringlusvõrk
(kontseptsioon)

### 1 Nõuded ringlusvõrgule

E-arvete efektiivse ringluse saavutamiseks on vaja:

1. e-arvet peab olema võimalik saata ilma eelnevate läbirääkimisteta ja punktist-punkti liidese ehitamiseta tehingu osapoolte vahel;
2. e-arve saatmine peab olema turvaline; sh nii saatja aga ka saaja autentsus peab olema tagatud (peab olema kindlus, et arve tuli õigelt isikult; peab olema kindlus, et arve läheb õigele isikule);
3. e-arve adressaat peab olema ülesleitav ja e-arve peab olema kohaletoimetatav;
4. vastava tehnoloogilise kompetentsi ja soovi korral peab tehingupartneritel olema võimalik e-arveid vahetada otse, ilma vahendajateta (operaatorfirmadeta).

### 2 Võtmeelemendid

Võtmeelementideks neile nõuetele vastava ringlusvõrgu loomisel on:

1. piisavat turvalisust tagav, kõigi võimalike tehingupoolte jaoks ühtne e-identimissüsteem;
2. e-arvete elektrooniliste vastuvõtupunktide ühtne adresseerimislahendus;
3. üldlevinud internetiprotokollide kasutamine. E-arve efekt avaneb täiel määral vaid edastamisel masinalt masinale, formaadis ja andmeedastusviisil, mis teevad automatiseeritud töötluse võimalikult hõlpsaks. See tähendab e-arve saatmist mitte e-postiga, vaid interneti andmeedastusprotokolli abil. Tänapäeval tähendab see eelkõige HTTP protokolli kasutamist. HTTP pealiskihtidena võib  kasutada SOAP jm protokolle - nii toimib X-tee.

### 3 Kontseptsioon

Esitame järgnevalt lalnimetatud nõuetele vastava e-arvete ringlusvõrgu kontseptsiooni (joonis 1).

![](https://cdn.rawgit.com/e-gov/DHX/gh-pages/img//E-arved.svg)

Joonis 1.

### 4 Osapooled
1. **E-arve saatja (S)ender**, ettevõtte, kes e-arve saadab.
Märkus. Kontseptsioon on laiendatav avaliku sektori asutustele ja MTÜdele.
2. **E-arve saaja (R)eceiver**, ettevõte, kellele e-arve saadetakse.
3. **RIK**, Äriregistri ja Masinliideste registri operaator.
4. **Sertifitseerimisteenuse osutaja (CA - Certification Authority)**, ettevõtetele privaatvõtmeid ja sertifikaate väljastav organisatsioon. CA rolli võiks täita näiteks AS Sertifitseerimiskeskus, vastava lepingu sõlmimisel, põhimõtteliselt ka RIK ise.

### 5 Süsteemid
1. **majandustarkvara**, arveid väljasaatev või vastuvõttev tarkvara.
2. **Äriregister (ÄR)**, ettevõtete identiteete ja esindusõigusi haldav register.
3. **Masinliideste register (ML)**, e-arvete elektrooniliste vastuvõtupunktide aadresside (veebiaadresside e URLde) register. Masinliideste register kuulub loogiliselt Äriregistri juurde.
4. **Sertifitseerimisteenuse osutaja infosüsteem**.

### 6 Toimingud

**1. Masinliidese veebiaadressi registreerimine**. Ettevõte, kes on loonud e-arvete masinliidese kaudu vastuvõtmise võimekuse (käesoleva kontseptsiooni skoobis ei ole analüüsida, kas ja millistel tingimustel sellise võimekuse loomine võiks olla kohustuslik), teatab oma majandustarkvara masinliidese veebiaadressi Masinliideste registrile.
- 1. Ettevõtte juht logib Masinliideste registri kasutajaliidesesse ID-kaardiga sisse ja teatab ettevõtte masinliidese veebiadressi (URL). Masinliidese register kontrollib päringuga Äriregistrisse ettevõtte juhi esindusõigust.

**2. Privaatvõtme ja sertifikaadi taotlemine ja paigaldamine**
- 2a. Ettevõtte juht logib ID-kaardiga sisse Sertifitseerimisteenuse osutaja infosüsteemi ja taotleb ettevõttele privaatvõtit ning sertifikaati.
- 2b. Sertifitseerimisteenuse osutaja infosüsteem genereerib privaatvõtme ja moodustab sertifikaadi.
- 2c. Ettevõtte administraator paigaldab privaatvõtme ja sertifikaadi majandustarkvarasse.

**3. E-arve saatmine**
- 3a. Majandustarkvara allkirjastab e-arve privaatvõtmega ja lisab sertifikaadi.
- 3b. Majandustarkvara pärib Masinliideste registrilt E-arve adressaadi masinliidese aadressi. Päringus saadetakse adressaadi registrikood.
- 3c. Masinliideste register saadab masinliidese aadressi (või teatab, et adressaadil puudub e-arvete vastuvõtmise võimekus).
- 3b. Majandustarkvara saadab arve välja, pöördumisega HTTP protokolli abil.

**4. E-arve vastuvõtmine**
- 4a. Adressaadi majandustarkvara võtab e-arve vastu ja kontrollib allkirja kehtivust.
- 4b. Vajadusel teeb majandustarkvara E-arve saatja sertifikaadi kehtivuskontrolli päringu Sertifitseerimisteenuse osutaja infosüsteemi. (See sõltub riskianalüüsist).

### 7 E-arvete vahendamine teenusena

Ettevõte võib e-arvete masinvastuvõtu delegeerida teenusepakkujale (operaatorile). Sellisel juhul teatab ettevõtte juht Masinliideste registrisse operaatori süsteemi veebiaadressi (URLi).

Ettevõte võib e-arvete masinväljastuse delegeerida teenusepakkujale (operaatorile). Sellisel juhul edastab ettevõtte juht Sertifitseerimisteenuse osutajalt saadud privaatvõtme ja sertifikaadi operaatorile. Operaatori administraator paigaldab privaatvõtme ja sertifikaadi oma arveid väljasaatvasse süsteemi.

### 8 Laiendamine

Skeem on kasutatav ka teiste masinloetavate äridokumentide ringluse korraldamiseks.
