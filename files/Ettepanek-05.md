DHX protokolli täiendamise ettepanek 05

### Teenuse sendDocument spetsifikatsiooni täiendamine mittekohustusliku väljaga recipientSystem

Täiendada teenuse sendDocument spetsifikatsiooni 

//////////////////////////////////////////////////

| nimetus | kirjeldus | väärtuse tüüp | väärtuse näide | kohustuslik |
|---------|-----------|---------------|----------------|-------------|
| __recipientSystem__ | Vahendatava asutuse süsteemi nimi, kuhu vahendaja süsteem peab dokumendi edastama. Mõeldud täiendava adresseerimisvahendina. Väärtuseks võib olla X-tee alamsüsteemi nimi või mõni muu infosüsteemi nimi. | String  | system  | ei |

//////////////////////////////////////////////////

HINNANG

1. __Äriline vajadus__ (kas sellist omadust on vaja?) Vajadus on DVK käitamisel üleminekuperioodil, aga ka teistel vahendajatel, kelle klientide hulgas on selliseid, kes tahavad dokumente DHX-i kaudu saada oma mitmesse infosüsteemi. Selliste juhtude arv eeldatavalt ei ole suur, kuid oluline.
2. __Tasakaalustatus__ On tasakaalus.
3. __Lahenduse tehniline kvaliteet__. Kuna väli on mittekohustuslik ja muudatust on ühes punktis, siis keerukust lisandub minimaalselt.

