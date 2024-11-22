Retail management system 

Objective:
 - Create a comprehensive retail management system using JavaScript that incorporates more complex relationships between data entities.

Data Structures:
 - Use arrays and objects to store product, customer, and order information.

Classes:
 - Product Class: Enhanced with properties like stock, isOnSale, and methods for applying promotions.
 - Customer Class: Includes properties for preferences and methods for managing preferences.
 - Order Class: Links customers to products with properties for status, order date, and total amount.
 - Promotion Class: Manages promotions with properties for productId, discountPercentage, startDate, and endDate.

Relationships:
 - A Customer can have multiple Orders.
 - An Order can contain multiple Products.
 - A Product can have multiple Promotions.

Functions:
 - Implement CRUD operations for products, customers, orders, and promotions.
 - Add functions to track inventory levels and check stock.
 - Implement reporting functions to analyze sales data.

More specific features:
 - Inventory Notifications: Notify when stock is below a threshold.
 - Promotion Validation: Check if promotions are valid based on date.
 - Enhanced UI: Build a simple front-end using HTML/CSS and JavaScript with forms to interact with the system, displaying relationships (e.g., customer orders, product promotions).
 - There are existing products and customers in the system.
 - Customer orders are created, updated, or deleted as necessary.
 - Inventory is updated based on the orders placed.
 - User can see details like product name, price, and stock level.

 - User can selects one or more products to add to the order.
 - The system calculates the total amount based on selected products and any active promotions.
 - If needed, the user can delete an order. The system prompts for confirmation before deletion. If confirmed, the order is removed from the system.


 

