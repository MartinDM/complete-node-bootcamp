# MVC
- Back-end architecture
- Separates application logic vs Business logic
- Sometimes Business and Application logic overlap

## Business logic (Model Layer)
- Business logic in the Models
- Code solves the business requirements
- Creating new tours, checking user details, validating users

## Application logic (Controller Layer)
- Keep Application logic in the Controllers
- Only concerned with implementation - makes the app *work*
- Managing requests and responses
- Serving Views
- *Not mixing Business Logic with Presentation*
- 'Thin' controllers means they are only concerned with one, specific thing

