### Dokumendivahetusprotokoll DHX

### Lisa 2 representationList spetsifikatsioon

X-tee teenus `representationList` tagastab vahendajana tegutseva X-tee liiklme poolt vahendatavate asutuste nimekirja (vahendusnimekirja).

Asutused esitatakse vahendusnimekirjas registrikoodidega. Nimekirjas antakse iga vahendatava kohta ka vahendamise algus- ja lõppkuupäev. 

Päringu Xtee v6 täisnimetus: `EE/GOV/<registrikood>/DHS/representationList`.

#### Sisendparameetrid

Puuduvad.

#### Väljundparameetrid

| nimetus | kirjeldus | väärtuse tüüp | väärtuse näide | kohustuslik |
|---------|-----------|---------------|----------------|-------------|
| members | Vahendatavate konteiner |  |  | ei |
| member | Vahendatava konteiner |  |  | ei |
| memberCode | Vahendatava asutuse registrikood | String | 10560025 | jah |
| startDate | Vahendamise alguskuupäev | dateTime | 2016-06-30T19:30:03.916+03:00 | jah |
| endDate | Vahendamise lõppkuupäev. Tühi kui vahendamine ilma tähtajata. | dateTime | 2016-06-30T19:30:03.916+03:00 | ei |

#### Näited

Päringu näide:
```
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
    <SOAP-ENV:Header>
        <ns4:protocolVersion xmlns:ns2="http://dhx.x-road.eu/producer"
            xmlns:ns3="http://x-road.eu/xsd/identifiers" xmlns:ns4="http://x-road.eu/xsd/xroad.xsd"
            xmlns:ns5="http://www.riik.ee/schemas/deccontainer/vers_2_1/">4.0</ns4:protocolVersion>
        <ns4:id xmlns:ns2="http://dhx.x-road.eu/producer" xmlns:ns3="http://x-road.eu/xsd/identifiers"
            xmlns:ns4="http://x-road.eu/xsd/xroad.xsd" xmlns:ns5="http://www.riik.ee/schemas/deccontainer/vers_2_1/">335b46fb-1c7f-4149-9d53-b2f476ea45bc
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
            <ns3:serviceCode>representationList</ns3:serviceCode>
            <ns3:serviceVersion>v1</ns3:serviceVersion>
        </ns4:service>
    </SOAP-ENV:Header>
    <SOAP-ENV:Body>
        <ns3:representationList
            xmlns:ns2="http://www.riik.ee/schemas/deccontainer/vers_2_1/"
            xmlns:ns3="http://dhx.x-road.eu/producer" xmlns:ns4="http://x-road.eu/xsd/identifiers"
            xmlns:ns5="http://x-road.eu/xsd/xroad.xsd" />
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
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
            xmlns:ns4="http://x-road.eu/xsd/xroad.xsd" xmlns:ns5="http://www.riik.ee/schemas/deccontainer/vers_2_1/">335b46fb-1c7f-4149-9d53-b2f476ea45bc
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
            <ns3:serviceCode>representationList</ns3:serviceCode>
            <ns3:serviceVersion>v1</ns3:serviceVersion>
        </ns4:service>
        <ns2:requestHash xmlns:ns2="http://x-road.eu/xsd/xroad.xsd"
            algorithmId="http://www.w3.org/2001/04/xmlenc#sha512">x1NoyTT3a4GfNBsndnOBPnlQ0eIajtt6jfxtUe/5HHc7cLE41HEKo62oXXcNXyJI1eOKnaf4jRQ6C8UaiXpBeQ==</ns2:requestHash>
    </SOAP-ENV:Header>
    <SOAP-ENV:Body>
        <ns3:representationListResponse
            xmlns:ns2="http://www.riik.ee/schemas/deccontainer/vers_2_1/"
            xmlns:ns3="http://dhx.x-road.eu/producer" xmlns:ns4="http://x-road.eu/xsd/identifiers"
            xmlns:ns5="http://x-road.eu/xsd/xroad.xsd">
            <ns3:members>
                <ns3:member>
                    <ns3:memberCode>70000001</ns3:memberCode>
                    <ns3:startDate>2016-06-30T19:30:03.916+03:00</ns3:startDate>
                </ns3:member>
                <ns3:member>
                    <ns3:memberCode>70000002</ns3:memberCode>
                    <ns3:startDate>2016-06-30T19:30:03.916+03:00</ns3:startDate>
                </ns3:member>
                <ns3:member>
                    <ns3:memberCode>70000003</ns3:memberCode>
                    <ns3:startDate>2016-06-30T19:30:03.916+03:00</ns3:startDate>
                </ns3:member>
            </ns3:members>
        </ns3:representationListResponse>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```
