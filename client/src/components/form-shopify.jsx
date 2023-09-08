import axios from "axios";
import { useState } from "react";
const Form_shopify = ({product}) => {
    const [products, setProducts] = useState({});
    const sku = product.sku;
    const handleSearch = async(event) => {
        event.preventDefault();
        try {
            const url = 'http://localhost:3000/inventory-shopify';
            const response = await axios.post(url, {
                sku: sku,
            });
            console.log(response);
            const result = response.data.product;
            setProducts(response.data.product);
            // if (result === "No Product Exist") {

            // } else {

            // }
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async(event) => {
        event.preventDefault();
        try {
            const url = 'http://localhost:3000/inventory-quantity';
            const response = await axios.post(url, {
                sku: products.sku,
                inventoryItemId: products.inventory_item_id,
                inventory_quantity: products.inventory_quantity
            });
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <button className="">get data</button>
            </form>
            <form onSubmit={handleUpdate}>
                <button>Update</button>
            </form>
        </div>
    )
} 

export default Form_shopify;