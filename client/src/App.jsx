import { useState } from 'react'
import Form_local from './components/form-local'
import Form_shopify from './components/form-shopify'
function App() {
  const [product, setProduct] = useState({});
  return (
    <div className='flex flex-col justify-center items-center'>
      <Form_local 
        product={product}
        setProduct={setProduct}
      />
      <Form_shopify 
        product={product}
      />
    </div>
  )
}

export default App
