### Dokumendivahetusprotokoll DHX

### Lisa 1. sendDocument teenuse spetsifikatsioon

Päring võimaldab saata dokumente kasutades DHX protokolli.

Päringu parameeter `documentAttachment` viitab SOAP swaRef manusele, milles on edastatava dokumendi kapsel XML kujul (vt [PR-MESS]). Päring aktsepteerib manusena DHX protokollis spetsifitseeritud Kapsli versiooni. 

Päringu vastuses tagastatakse dokumendi vastuvõtmisel genereeritud unikaalne id. 

Päringu X-tee versioon 6 täisnimi on formaadis:

`<xRoadInstance>/<memberClass>/<memberCode>/DHX/sendDocument`

Näiteks `EE/GOV/<registrikood>/DHX/sendDocument` või `EE/COM/<registrikood>/DHX/sendDocument`

#### Päringu sisend

Päringu sisendi parameetrid `Body/sendDocument` XML elemendi sees:

| nimetus | kirjeldus | väärtuse tüüp | väärtuse näide | kohustuslik |
|---------|-----------|---------------|----------------|-------------|
| __recipient__ | Vahendatava asutuse registrikood. PEAB olema täidetud juhul kui dokument edastatakse vahendatavale asutusele. Kui toimub DHX otsevõimekusega asutusele saatmine, siis parameeter PEAB olema tühi. | String  | 10560025  | ei |
| __documentAttachment__ | Edastatava Kapsli XML dokument swaRef manuse viitena. Manuse `Content-Transfer-Encoding` PEAB olema `base64`. Manuse `Content-Type` PEAB olema: `text/xml; charset=UTF-8`. | ref:swaRef | cid:kapsel.xml | jah |
| __consignmentId__ | Saadetise id. PEAKS olema unikaalne ühe saatja saadetiste piires. Juhul kui saatmise ebaõnnestumisel edastatakse dokument korduvalt, siis consignmentId PEAB jääma samaks. Vastuvõttev süsteem PEAKS kontrollima, kas sellise saadetise id-ga dokument on talle juba saabunud -- unikaalne on X-tee päringus saabunud parameetrite kombinatsioon: `Header/client: EE/MEMBERCLASS/ MEMBER1/SUBSYSTEM1` + `Body/sendDocument/consignmentId: <consignmentId>`. Kui sama saadetis on juba saabunud ja vastu võetud, siis vastuvõttev süsteem PEAB väljastama vea koodiga `DHX.Duplicate` (vaata allpool "Veakoodid"). Siin "PEAKS" tähendab unikaalsuse kontrollimist mõistliku ajaraami piires (1 nädal või 1 kuu). Vanemate saadetiste korral VÕIB vastuvõtja süsteem talle saabunud saadetiste ID-de logi kustutada või arhiveerida. | String | 97522b98-cf27-452e-... | jah |

#### Päringu väljund

Kui vastuvõtja DHX süsteemis ilmnes ootamatu tehniline viga, siis PEAB tagastama `SOAP Fault` vea või madalama taseme protokoli veana (näiteks HTTP `response code`).

Kui vastuvõtja süsteem suutis SOAP paringu sisu avada, aga hilisemal DHX protokolli reeglite järgi valideerimisel tekkis viga, siis PEAB tagastama `sendDocument` päringu vastusena `Body/sendDocumentResponse/fault` XML elemendi sees (Vaata allpool "Veakoodid").

Väljundparameetrid `Body/sendDocumentResponse` XML elemendi sees:

| nimetus | kirjeldus | väärtuse tüüp | väärtuse näide | kohustuslik |
|---------|-----------|---------------|----------------|-------------|
| __receiptId__ | Vastuvõtva süsteemi poolt genereeritud unikaalne vastuse id või number. Kui vastuvõttev süsteem võttis saadetise vastu, siis `receiptId` PEAB olema täidetud ja `fault` element peab olema puudu või tühi. Kui ilmnes äriloogikaline viga või vastuvõtja lükkas dokumendi tagasi ja viga tagastatakse `fault` elemendis, siis `receiptId` PEAB olema tühi. `receiptId` ei pea olema dokumendi id ega number, sest vastuvõtja võib saadetisest dokumendi genereerida hiljem asünkroonselt. Saatja süsteem VÕIB vastuses saabunud `receiptId` salvestada või logida, selleks et hiljem oleks võimalik probleemide analüüs. | String | f5f28c9a-35d5-44bd-a012-... | ei |
| __fault__ | Vea konteiner. Olemas, kui tekkis viga dokumendi vastuvõtmisel. Mõeldud näiteks valideerimise vigade jaoks. Ootamatu tehnilise vea korral PEAB tagastama `SOAP:Fault`. |  |  | ei |
| __faultcode__ | Vea kood. Kui ilmnes äriloogikaline viga või vastuvõtja lükkas dokumendi tagasi, siis viga PEAB olema tagastatud `fault` elemendis ning `faultcode` PEAB olema väärtustatud. | String | Client.Validation | jah |
| __faultstring__ | Vea kirjeldus. PEAKS sisaldama `faultcode` väärtusele täiendavat infot, näiteks mis XML element või adressaat ei valideerunud vms. | String | Container is invalid | jah |

#### Veakoodid

Vastuvõtja süsteem PEAB äriloogikalise või DHX protokolli reeglite vastu valideerimisel tekkinud vea tagastama `sendDocuments` vastuses, `Body/sendDocumentResponse/fault` XML elemendi sees, kasutades ühte järgmistest veakoodidest:

| faultcode | kirjeldus | faultstring väärtuse näide |
|---------|-----------|---------------|
| __DHX.Duplicate__ | Samalt saatjalt saabus sama saadetise id väärtusega päring. Päringu parameetrite kombinatsioon `Header/client: EE/MEMBERCLASS/ MEMBER1/SUBSYSTEM1` + `Body/sendDocument/consignmentId: <consignmentId>` ei ole unikaalne. | Client sended duplicate document. Document with same consignmentId: 97522b98-cf27-452e-8... from EE/GOV/ MEMBER1/SUBSYSTEM1 is already received. Ignoring duplicate. |
| __DHX.Validation__ | Kui DHX `sendDocuments` päringus saabunud Kapsli valideerimine vastu XML Schemat ebaõnnestub või SOAP päringu enda parameetrite sisu valideerimine ebaõnnestub, siis vastuvõttev süsteem PEAB väljastama vea `DHX.Validation`. | Container in documentAttachment is invalid. Required XML element "DecContainer/Transport" is missing.  Container must validate against 2.1 schema. |
| __DHX.InvalidAddressee__ | Kui vastuvõtva süsteemi enda registrikoodi või tema poolt vahendatava asutuse registrikoodi ei ole päringus saabunud Kapsli XML `DecContainer/Transport/DecRecipient/OrganisationCode` elementide väärtuste hulgas, siis vastuvõttev süsteem PEAB tagastama vea `DHX.InvalidAddressee`. | The container has unknown addressee 7000001. |
| __DHX.SizeLimitExceeded__ | Kui vastuvõttev süsteem soovib seada limiidi enda poolt vastuvõetava dokumendi suurusele, siis suuremate dokumendi saabumisel VÕIB vastuvõttev süsteem tagastada vea `DHX.SizeLimitExceeded`. Selle vea tagastamine SOAP päringu vastusena ei tihtipeale tehniliselt võimalik, sest rakendusserverites on HTTP request liimit enamasti määratud globaalsel süsteemsel tasemel. Sel juhul enamasti rakendusserver vastab HTTP staatuskoodiga, näiteks `404.13` `content length too large`. | The server was not able to store the container because its bigger than server size limit (100Mb) |

#### Näide

 Päringu näide:
 
 ```
 <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
  <SOAP-ENV:Header>
    <ns4:protocolVersion xmlns:ns2="http://dhx.x-road.eu/producer"
      xmlns:ns3="http://x-road.eu/xsd/identifiers" xmlns:ns4="http://x-road.eu/xsd/xroad.xsd"
      xmlns:ns5="http://www.riik.ee/schemas/deccontainer/vers_2_1/">4.0</ns4:protocolVersion>
    <ns4:id xmlns:ns2="http://dhx.x-road.eu/producer" xmlns:ns3="http://x-road.eu/xsd/identifiers"
      xmlns:ns4="http://x-road.eu/xsd/xroad.xsd" xmlns:ns5="http://www.riik.ee/schemas/deccontainer/vers_2_1/">64a3ddbd-1620-42c4-b2fe-60b854c2f32f
    </ns4:id>
    <ns4:client xmlns:ns2="http://dhx.x-road.eu/producer"
      xmlns:ns3="http://x-road.eu/xsd/identifiers" xmlns:ns4="http://x-road.eu/xsd/xroad.xsd"
      xmlns:ns5="http://www.riik.ee/schemas/deccontainer/vers_2_1/">
      <ns3:xRoadInstance>ee-dev</ns3:xRoadInstance>
      <ns3:memberClass>GOV</ns3:memberClass>
      <ns3:memberCode>40000001</ns3:memberCode>
      <ns3:subsystemCode>DHX</ns3:subsystemCode>
    </ns4:client>
    <ns4:service xmlns:ns2="http://dhx.x-road.eu/producer"
      xmlns:ns3="http://x-road.eu/xsd/identifiers" xmlns:ns4="http://x-road.eu/xsd/xroad.xsd"
      xmlns:ns5="http://www.riik.ee/schemas/deccontainer/vers_2_1/"
      ns3:objectType="SERVICE">
      <ns3:xRoadInstance>ee-dev</ns3:xRoadInstance>
      <ns3:memberClass>COM</ns3:memberClass>
      <ns3:memberCode>30000001</ns3:memberCode>
      <ns3:subsystemCode>DHX</ns3:subsystemCode>
      <ns3:serviceCode>sendDocument</ns3:serviceCode>
      <ns3:serviceVersion>v1</ns3:serviceVersion>
    </ns4:service>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns3:sendDocument xmlns:ns2="http://www.riik.ee/schemas/deccontainer/vers_2_1/"
      xmlns:ns3="http://dhx.x-road.eu/producer" xmlns:ns4="http://x-road.eu/xsd/identifiers"
      xmlns:ns5="http://x-road.eu/xsd/xroad.xsd">
      <ns3:consignmentId>fae1278b-9318-4b1c-9bea-49ccc6879055
      </ns3:consignmentId>
      <ns3:documentAttachment>c48e2f41-3f53-4dc6-ae69-1d16a87682e2@
      </ns3:documentAttachment>
    </ns3:sendDocument>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

Manus:
```
------=_Part_12_1312957482.1467986355580
Content-Type: text/xml; charset=UTF-8
Content-ID: c48e2f41-3f53-4dc6-ae69-1d16a87682e2@
Content-Transfer-Encoding: base64

PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/Pjxu
...
------=_Part_12_1312957482.1467986355580--]
```

 Vastuse näide:
```
<?xml version="1.0" encoding="utf-8" ?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
  <SOAP-ENV:Header>
    <ns4:protocolVersion xmlns:ns2="http://dhx.x-road.eu/producer"
      xmlns:ns3="http://x-road.eu/xsd/identifiers" xmlns:ns4="http://x-road.eu/xsd/xroad.xsd"
      xmlns:ns5="http://www.riik.ee/schemas/deccontainer/vers_2_1/">4.0</ns4:protocolVersion>
    <ns4:id xmlns:ns2="http://dhx.x-road.eu/producer" xmlns:ns3="http://x-road.eu/xsd/identifiers"
      xmlns:ns4="http://x-road.eu/xsd/xroad.xsd" xmlns:ns5="http://www.riik.ee/schemas/deccontainer/vers_2_1/">64a3ddbd-1620-42c4-b2fe-60b854c2f32f
    </ns4:id>
    <ns4:client xmlns:ns2="http://dhx.x-road.eu/producer"
      xmlns:ns3="http://x-road.eu/xsd/identifiers" xmlns:ns4="http://x-road.eu/xsd/xroad.xsd"
      xmlns:ns5="http://www.riik.ee/schemas/deccontainer/vers_2_1/">
      <ns3:xRoadInstance>ee-dev</ns3:xRoadInstance>
      <ns3:memberClass>GOV</ns3:memberClass>
      <ns3:memberCode>40000001</ns3:memberCode>
      <ns3:subsystemCode>DHX</ns3:subsystemCode>
    </ns4:client>
    <ns4:service xmlns:ns2="http://dhx.x-road.eu/producer"
      xmlns:ns3="http://x-road.eu/xsd/identifiers" xmlns:ns4="http://x-road.eu/xsd/xroad.xsd"
      xmlns:ns5="http://www.riik.ee/schemas/deccontainer/vers_2_1/"
      ns3:objectType="SERVICE">
      <ns3:xRoadInstance>ee-dev</ns3:xRoadInstance>
      <ns3:memberClass>COM</ns3:memberClass>
      <ns3:memberCode>30000001</ns3:memberCode>
      <ns3:subsystemCode>DHX</ns3:subsystemCode>
      <ns3:serviceCode>sendDocument</ns3:serviceCode>
      <ns3:serviceVersion>v1</ns3:serviceVersion>
    </ns4:service>
    <ns2:requestHash xmlns:ns2="http://x-road.eu/xsd/xroad.xsd"
      algorithmId="http://www.w3.org/2001/04/xmlenc#sha512">jHfl2GQ7wKXnroduhvIbf2AEoqN4wC0rrOtt8ECslDENjfz3NBSj4EIMYWs+B4bxoitwbVzjeiwByQPGZVtubQ==
    </ns2:requestHash>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
    <ns3:sendDocumentResponse
      xmlns:ns2="http://www.riik.ee/schemas/deccontainer/vers_2_1/"
      xmlns:ns3="http://dhx.x-road.eu/producer" xmlns:ns4="http://x-road.eu/xsd/identifiers"
      xmlns:ns5="http://x-road.eu/xsd/xroad.xsd">
      <ns3:receiptId>89cf990b-0270-4592-bcb0-8f0c689de674</ns3:receiptId>
    </ns3:sendDocumentResponse>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

Äriloogilise vea näide:
```
<?xml version="1.0" encoding="utf-8" ?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
	<SOAP-ENV:Header>
		<ns5:protocolVersion xmlns:ns2="http://dhx.x-road.eu/producer"
			xmlns:ns3="http://x-road.eu/xsd/identifiers" xmlns:ns4="http://www.riik.ee/schemas/deccontainer/vers_2_1/"
			xmlns:ns5="http://x-road.eu/xsd/xroad.xsd">4.0</ns5:protocolVersion>
		<ns5:id xmlns:ns2="http://dhx.x-road.eu/producer" xmlns:ns3="http://x-road.eu/xsd/identifiers"
			xmlns:ns4="http://www.riik.ee/schemas/deccontainer/vers_2_1/"
			xmlns:ns5="http://x-road.eu/xsd/xroad.xsd">d8be2b7d-25fc-4cce-88b9-09c7dfc78282</ns5:id>
		<ns5:client xmlns:ns2="http://dhx.x-road.eu/producer"
			xmlns:ns3="http://x-road.eu/xsd/identifiers" xmlns:ns4="http://www.riik.ee/schemas/deccontainer/vers_2_1/"
			xmlns:ns5="http://x-road.eu/xsd/xroad.xsd">
			<ns3:xRoadInstance>ee-dev</ns3:xRoadInstance>
			<ns3:memberClass>GOV</ns3:memberClass>
			<ns3:memberCode>40000001</ns3:memberCode>
			<ns3:subsystemCode>DHX</ns3:subsystemCode>
		</ns5:client>
		<ns5:service xmlns:ns2="http://dhx.x-road.eu/producer"
			xmlns:ns3="http://x-road.eu/xsd/identifiers" xmlns:ns4="http://www.riik.ee/schemas/deccontainer/vers_2_1/"
			xmlns:ns5="http://x-road.eu/xsd/xroad.xsd" ns3:objectType="SERVICE">
			<ns3:xRoadInstance>ee-dev</ns3:xRoadInstance>
			<ns3:memberClass>GOV</ns3:memberClass>
			<ns3:memberCode>40000001</ns3:memberCode>
			<ns3:subsystemCode>DHX</ns3:subsystemCode>
			<ns3:serviceCode>sendDocument</ns3:serviceCode>
			<ns3:serviceVersion>v1</ns3:serviceVersion>
		</ns5:service>
		<ns2:requestHash xmlns:ns2="http://x-road.eu/xsd/xroad.xsd"
			algorithmId="http://www.w3.org/2001/04/xmlenc#sha512">zyZ4mOoJae9miQoWjVpp70TDjsfBJBWOoBoY08tTTpnA7MhYRrs7IPieqlaifWGTe+J4X7TWTS1VJvRw+e+B0A==</ns2:requestHash>
	</SOAP-ENV:Header>
	<SOAP-ENV:Body>
		<ns3:sendDocumentResponse
			xmlns:ns2="http://www.riik.ee/schemas/deccontainer/vers_2_1/"
			xmlns:ns3="http://dhx.x-road.eu/producer" xmlns:ns4="http://x-road.eu/xsd/identifiers"
			xmlns:ns5="http://x-road.eu/xsd/xroad.xsd">
			<ns3:fault>
				<ns3:faultCode>DHX.InvalidAddressee</ns3:faultCode>
				<ns3:faultString>DHXException code: DHX.InvalidAddressee Recipient
					not found in capsule recipient list. recipient:40000001</ns3:faultString>
			</ns3:fault>
		</ns3:sendDocumentResponse>
	</SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```
Tehnilise vea näide: 
```
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
	<SOAP-ENV:Body>
		<SOAP-ENV:Fault>
			<faultcode>Server.TechnicalError</faultcode>
			<faultstring>Technical error occured while processing request. </faultstring>
			<faultactor />
			<detail>
				<faultDetail>More detail aboout error.</faultDetail>
			</detail>
		</SOAP-ENV:Fault>
	</SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```
 
 
