# Dokumentation AirBeans API

## Logga in
### Beskrivning 
Detta anropet används för att logga in en registerad användare. Anropet skickas som en POST-förfrågan med JSON-data som innehåller användarens autentiseringsuppgifter. Om anropet lyckas returneras en success boolian, status-kod samt ett meddelande. 
### URL 
```
    POST http://localhost:1337/auth/login
```
### Body 
```
    {
        "username" : "admin", 
        "password" : "admin", 
    }
```

## Logga ut 
### Beskrivning 
Detta anropet används för att logga ut den befintliga användaren. Anropet skickas som en POST-förfrågan och behöver inte ha någon JSON-data. Om anropet lyckas returneras en success boolian, status-kod samt ett meddelande.
### URL 
```
    POST http://localhost:1337/auth/logout
```

## Registera ny användare
### Beskrivning 
Detta anropet används för att registrera en ny användare i systemet. Anropet skickas som en POST-förfrågan med JSON-data som innehåller användarens autentiseringsuppgifter. Om anropet lyckas returneras en success boolian, status-kod samt ett meddelande.
### URL 
```
    POST http://localhost:1337/auth/register
```
### Body 
Krav på JSON-data i body.
- username : Ska vara en sträng med mellan 3 och 15 tecken. Får enbart innehålla bokstäver och siffror. 
- password: Ska vara en sträng  mellan 5 och 15 tecken. Måste innehålla minst en siffra och en stor bokstav
- email : Ska vara en sträng med en email-adress
```
    {
	    "username": "Användarnamn",
	    "password" : "Lösenord",
	    "email" : "Email-address"
    }
```

## Hämta meny   
### Beskrivning 
Detta anropet används för att hämta hela menyn. Anropet skickas som en GET-förfrågan. Om anropet lyckas returneras en success boolian, status-kod samt data med en array av alla produkter i databasen.
### URL 
```
    GET http://localhost:1337/menu/
```

## Lägg till produkt i meny
### Beskrivning 
Detta anropet används av ADMINS för att lägga till en ny produkt i menyn. Anropet skickas som en Post-förfrågan. Om anropet lyckas returneras en success boolian, status-kod, ett meddelande samt data med den nya produkten.
### URL 
```
    POST http://localhost:1337/menu/add
```
### Body 
Krav på JSON-data i body.
- title : Ska vara en sträng mellan 3 och 25 tecken. Får enbart innehålla bokstäver och siffror. 
- desc : Ska vara en sträng mellan 10 och 100 tecken.  
- price : Ska vara ett nummer som inte får vara mindre än 0. 
```
    {
	    "title" : "Namn på drycken",
	    "desc" : "Beskrivning av drycken", 
	    "price" : 0
    } 
```

## Ändra en produkt i menyn
### Beskrivning 
Detta anropet används av ADMINS för att ändra en produkts information i menyn. Anropet skickas som en Post-förfrågan. Om anropet lyckas returneras en success boolian, status-kod, ett meddelande samt data med den updaterade produkten. 
### URL 
```
    POST http://localhost:1337/menu/change/:id
```
### Body 
Krav på JSON-data i body.
- title : Ska vara en sträng mellan 3 och 25 tecken. Får enbart innehålla bokstäver och siffror. 
- desc : Ska vara en sträng mellan 10 och 100 tecken.  
- price : Ska vara ett nummer som inte får vara mindre än 0. 
```
    {
	    "title" : "Nya namnet på drycken",
	    "desc" : "Beskrivning av drycken",
	    "price" : 0
    }
```
### Params 
- ID : ID för den produkt som ska ändras i menyn 

## Ta bort en prodikt i menyn
### Beskrivning 
Detta anropet används av ADMINS för att ta bort en produkt i menyn. Anropet skickas som en Delete-förfrågan. Om anropet lyckas returneras en success boolian, status-kod, ett meddelande samt data med den bortagna produkten.
### URL 
```
    DELETE http://localhost:1337/menu/delete/:id
```
### Params 
- ID : ID för den produkt som ska tas bort från menyn 

## Hämta varukorg
### Beskrivning 
Detta anropet används för att hämta information om befintlig varukorg. Anropet skickas som en Get-förfrågan. Om anropet lyckas returneras en success boolian, status-kod samt data som innehåller varukorgen, fraktkostnad, tillämpad rabatt och totalkostnad.  
### URL 
```
    GET http://localhost:1337/cart/
```

## Lägg til produkt i varukorg
### Beskrivning 
Detta anropet används för att lägga till en produkt i varukorgen. Anropet skickas som en Post-förfrågan. Om anropet lyckas returneras en success boolian, status-kod, ett meddelande samt data med den uppdaterade varukorgen. 
### URL 
```
    POST http://localhost:1337/cart/:id
```
### Params 
- ID : ID för den produkt som ska läggas i varukorg

## Ta bort en produkt i varukorg
### Beskrivning 
Detta anropet används för att ta bort en produkt i varukorgen. Anropet skickas som en Delete-förfrågan. Om anropet lyckas returneras en success boolian, status-kod, ett meddelande samt data med den uppdaterade varukorgen.
### URL 
```
    DELETE http://localhost:1337/cart/:id
```
### Params 
- ID : ID för den produkt som ska tas bort i varukorg

## Hämta about information
### Beskrivning 
Detta anropet används för att få ut information om Airbeans. Anropet skickas som en Get-förfrågan. Om anropet lyckas returneras ett objekt med text-information. 
### URL 
```
    GET http://localhost:1337/about/
```

## Lägg till nytt erbjudande
### Beskrivning 
Detta anropet används av ADMINS för att lägga till ett nytt erbjudande mellan två drycker i menyn. Anropet skickas som en Post-förfrågan med JSON-data som innehåller en array med två titlar på drycker i menyn och erbjudande priset. Om anropet lyckas returneras en success boolian, status-kod, ett meddelande samt data med det skapade erbjudandet.
### URL 
```
    POST http://localhost:1337/promotions/add
```
### Body 
Krav på JSON-data i body.
- products  : Ska vara en array som innehållerr två titlar på drycker i menyn.  
- price : Ska vara ett nummer som inte får vara mindre än 0. 
```
    "products" : [ "Kaffe title" , "Kaffe title" ], 
    "price" : 0 
```

## Visa alla erbjudande
### Beskrivning 
Detta anropet används för att visa alla erbjudande som ligger i databasen. Anropet skickas som en Get-förfrågan. Om anropet lyckas returneras en success boolian, status-kod samt data med alla erbjudanden i databasen.
### URL 
```
    GET http://localhost:1337/promotions/
```

## Visa användarens senaste skapade order
### Beskrivning 
Detta anropet används för att visa information om den inloggade användarens senast skapade ordern. Anropet skickas som en Get-förfrågan. Om anropet lyckas returneras en succuss boolian, status-kod, ett meddelande som berättar om order är på väg eller levererad samt order som innehåller information om ordern. 
### URL 
```
    GET http://localhost:1337/orders/status
```

## Visa användarens skapade ordrar
### Beskrivning 
Detta anropet används för att visa information om den inloggade användarens alla skapade ordrar. Anropet skickas som en Post-förfrågan. Om anropet lyckas returneras en success boolian, status-kod, totalpris för alla ordrar samt order som innehåller alla användarens skapade ordrar. 
### URL 
```
    POST http://localhost:1337/orders/user
```

## Skapa en ny order
### Beskrivning 
Detta anropet används för att skapa en order av varukorgen. Anropet skickas som en Post-förfrågan. Om anropet lyckas returneras en success boolian, status-kod, ett meddelande samt data med information om den skapade ordern. 
### URL 
```
    POST http://localhost:1337/orders/
```