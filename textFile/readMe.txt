Scenario: 1 let users = [{firstname: XYZ, lastname:ABC},{firstname: ABC, lastname:xyz}] 
Scenario: 2 let users = {firstname: ABC, lastname:xyz} 

if (!Array.isArray(users)) {
    users = [users];
}

<---Scenario: 1-->
1. Check Array.isArray(users) →
    users is [ {...}, {...} ] → an array
    Array.isArray(users) → true
2. Apply !Array.isArray(users) → 
    !true → false
3. If condition: if(false) → does not execute


<---Scenario: 2-->
1. Check Array.isArray(users) →
    users is {...} → not an array
    Array.isArray(users) → false
2. Apply !Array.isArray(users) → 
    !false → true
3. If condition: if(true) → executes
    users = [users] → wraps the object in an array

