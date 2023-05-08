### Dokumendivahetusprotokoll DHX

### Lisa 2 representationList spetsifikatsioon

X-tee teenus `representationList` tagastab vahendajana tegutseva X-tee liiklme poolt vahendatavate asutuste nimekirja (vahendusnimekirja).

Asutused esitatakse vahendusnimekirjas registrikoodidega. Nimekirjas antakse iga vahendatava kohta ka vahendamise algus- ja lõppkuupäev. 

Päringu Xtee v6 täisnimetus: `EE/GOV/<registrikood>/DHS/representationList`.

#### Päringu WSDL kirjeldus
Päringu WSDL kirjeldus asub [siin](dhx.wsdl).

#### Sisendparameetrid

Puuduvad.

#### Väljundparameetrid

| nimetus | kirjeldus | väärtuse tüüp | väärtuse näide | kohustuslik |
|---------|-----------|---------------|----------------|-------------|
| members | Vahendatavate konteiner |  |  | ei |
| member | Vahendatava konteiner |  |  | ei |
| memberCode | Vahendatava asutuse registrikood | String | 10560025 | jah |
| representeeName | Vahendatava asutuse nimetus | String | Vallavalitsus A | jah |
| representeeSystem | Vahendatava asutuse süsteem | String | raamtupidamine | jah |
| startDate | Vahendamise alguskuupäev | dateTime | 2016-06-30T19:30:03.916+03:00 | jah |
| endDate | Vahendamise lõppkuupäev. Tühi kui vahendamine ilma tähtajata. | dateTime | 2016-06-30T19:30:03.916+03:00 | ei |

#### Näited

Päringu näide:
```XML
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
   xmlns:xro="http://x-road.eu/xsd/xroad.xsd"
   xmlns:iden="http://x-road.eu/xsd/identifiers"
   xmlns:prod="http://dhx.x-road.eu/producer">
   <soapenv:Header>
      <xro:protocolVersion>4.0</xro:protocolVersion>
      <xro:id>335b46fb-1c7f-4149-9d53-b2f476ea45bc
      </xro:id>
      <xro:client iden:objectType="SUBSYSTEM">
            <iden:xRoadInstance>ee-dev</iden:xRoadInstance>
            <iden:memberClass>GOV</iden:memberClass>
            <iden:memberCode>40000001</iden:memberCode>
            <iden:subsystemCode>DHX</iden:subsystemCode>
        </xro:client>
        <xro:service iden:objectType="SERVICE">
            <iden:xRoadInstance>ee-dev</iden:xRoadInstance>
            <iden:memberClass>COM</iden:memberClass>
            <iden:memberCode>30000001</iden:memberCode>
            <iden:subsystemCode>DHX</iden:subsystemCode>
            <iden:serviceCode>representationList</iden:serviceCode>
            <iden:serviceVersion>v1</iden:serviceVersion>
        </xro:service>
   </soapenv:Header>
   <soapenv:Body>
      <prod:representationList/>
   </soapenv:Body>
</soapenv:Envelope>
```

Vastuse näide:
```XML
<?xml version="1.0" encoding="utf-8" ?>
<SOAP-ENV:Envelope
 xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" 
 xmlns:ns3="http://dhx.x-road.eu/producer"  
 xmlns:iden="http://x-road.eu/xsd/identifiers" 
 xmlns:xro="http://x-road.eu/xsd/xroad.xsd">
   <SOAP-ENV:Header>
      <xro:protocolVersion>4.0</xro:protocolVersion>
      <xro:id>335b46fb-1c7f-4149-9d53-b2f476ea45bc</xro:id>
      <xro:client iden:objectType="SUBSYSTEM">
         <iden:xRoadInstance>ee-dev</iden:xRoadInstance>
         <iden:memberClass>GOV</iden:memberClass>
         <iden:memberCode>40000001</iden:memberCode>
         <iden:subsystemCode>DHX</iden:subsystemCode>
      </xro:client>
      <xro:service iden:objectType="SERVICE">
         <iden:xRoadInstance>ee-dev</iden:xRoadInstance>
         <iden:memberClass>COM</iden:memberClass>
         <iden:memberCode>30000001</iden:memberCode>
         <iden:subsystemCode>DHX</iden:subsystemCode>
         <iden:serviceCode>representationList</iden:serviceCode>
         <iden:serviceVersion>v1</iden:serviceVersion>
      </xro:service>
   </SOAP-ENV:Header>
   <SOAP-ENV:Body>
      <ns3:representationListResponse>
         <ns3:representees>
            <ns3:representee>
               <ns3:memberCode>112221</ns3:memberCode>
               <ns3:representeeName>Vallavalitsus A</ns3:representeeName>
               <ns3:startDate>2017-02-08T11:50:55.432+02:00</ns3:startDate>
            </ns3:representee>
            <ns3:representee>
               <ns3:memberCode>2434</ns3:memberCode>
               <ns3:representeeName>Muuseum B</ns3:representeeName>
               <ns3:startDate>2017-02-08T11:50:55.432+02:00</ns3:startDate>
            </ns3:representee>
            <ns3:representee>
               <ns3:memberCode>2343223</ns3:memberCode>
               <ns3:representeeName>Põhikool C</ns3:representeeName>
               <ns3:startDate>2017-02-08T11:50:55.432+02:00</ns3:startDate>
            </ns3:representee>
         </ns3:representees>
      </ns3:representationListResponse>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```
