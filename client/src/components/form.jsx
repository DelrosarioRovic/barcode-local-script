import React, {useState, useEffect} from "react";
import axios from "axios";
import Result from "./result";

const Form = () => {
    const [search_bar, setSearch_bar] = useState("");
    const [existProduct, setExistProduct] = useState(false);
    const [product, setProduct] = useState({});
    const [noProduct, setNoProduct] = useState("");
    const [loading, setLoading] = useState(false);

    const sendDataToAPi = async () => {
        try {
            const response = await axios.post("http://localhost:3000/product", {
                search_bar:search_bar
            })
            setProduct(response.data.product[0]);
            setExistProduct(true)
        } catch (error) {
            setExistProduct(false);
            setNoProduct(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
    if (search_bar.trim() !== '') {
        setLoading(true)
        sendDataToAPi()
    }
  }, [search_bar]);

    return (
        <div className="flex justify-center items-center h-[70vh] text-center w-1/2 ">
            <div className="bg-blue-400 w-1/2">
                <h3>{loading && "Loading..."} </h3>
                <form className="flex flex-col gap-5  p-5 rounded-lg">
                    <label htmlFor="input_barcode" >Barcode:</label>
                    <input
                        className="text-center" 
                        type="text" 
                        id="input_barcode"
                        value={search_bar}    
                        onChange={(e)=> setSearch_bar(e.target.value)}
                    />
                </form>
                <Result 
                    existProduct={existProduct}
                    product={product}
                    noProduct={noProduct}
                />
            </div>
            
        </div>
    )

}

export default Form;