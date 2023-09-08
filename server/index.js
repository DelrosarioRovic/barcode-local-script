import express from "express";
import connectToDatabase from "./connectionDb.js";
import bodyParser from "body-parser";
import cors from "cors";
import Product from "./product.js";
import axios from "axios";

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000

connectToDatabase();

// const newUser = new Product({
//     serialNumber: "123456",
//     umei_1: "123456789012345",
//     umei_2: "987654321012345",
//     sku: "SKU123"
// });

// const newUser2 = new Product({
//   serialNumber: "789012",
//   umei_1: "987654321098765",
//   umei_2: "123456789098765",
//   sku: "SKU456"
// });

// const newUser3 = new Product({
//   serialNumber: "345678",
//   umei_1: "654321098765432",
//   umei_2: "567890123456789",
//   sku: "SKU789"
// });

// const newUser4 = new Product({
//   serialNumber: "123457",
//   umei_1: "12345672139015345",
//   umei_2: "234567890153456",
//   sku: "SKU562"
// });

// newUser.save();
// newUser2.save();
// newUser3.save();
// newUser4.save();

app.post('/product', async(req, res) => {
    const { search_bar } = req.body;

    const prod = await Product.find({ serialNumber: search_bar }) 

    if (prod.length === 0) {
      return res.status(404).json({message: "No product found!"});
    }
    return res.status(200).json({ product: prod});
});



//linear search to get the from shopify
function linearSearch(arr, target) {
  for (const product of arr) {
    for (const variant of product.variants) {
      if (variant.sku === target) {
        return variant;
      }
    }
  }
  return "No Product Exist";
}
// getting data from shopify inventory
app.post("/inventory-shopify", async (req, res) => {
  const accessToken = "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";
  const url =
    "https://mynewstoretest01.myshopify.com/admin/api/2023-07/products.json";
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": accessToken,
  };

  const sku = req.body.sku;

  axios
    .get(url, { headers })
    .then((response) => {
      const search_Result = linearSearch(response.data.products, sku);
      return res.status(200).json({
        product: search_Result,
      });
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
});

//update data from shopify
app.post("/inventory-quantity", (req, res) => {
  const { sku, inventoryItemId, inventory_quantity } = req.body;
  // API credentials
  const shopifyUrl = 'https://store-formyapptest.myshopify.com';
  const apiKey = '768ea65e8e236cc3b90bbb11346e720a';
  const apiPassword = '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';

  // Variant ID and updated quantity
  const inventoryItemIds = inventoryItemId;
  const newQuantity = inventory_quantity - 1;

  // Create a POST request to update inventory levels
  const url = `${shopifyUrl}/admin/api/2023-07/inventory_levels/set.json`;
  const data = {
    location_id: 90570850602, // Replace with your location ID
    inventory_item_id: inventoryItemIds,
    available: newQuantity,
  };

  axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: apiKey,
        password: apiPassword,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('Inventory level updated successfully.');
        res.send('Inventory level updated successfully.');
      } else {
        console.error(`Error: ${response.status}, ${response.statusText}`);
        res.status(response.status).send('Error updating inventory level.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('Internal server error.');
    });
})



app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})