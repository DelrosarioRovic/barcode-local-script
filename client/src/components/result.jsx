

const Result = ({existProduct, product, noProduct}) => {

    return (
        <div>
            <h1>Result</h1>
            {existProduct ? 
                (
                    <ul className="text-left flex flex-col gap-5">
                        <li>Serial Number: <span>{product.serialNumber}</span></li>
                        <li>Sku: <span>{product.sku}</span></li>
                        <li>Umei1: <span>{product.umei_1}</span></li>
                        <li>Umei2: <span>{product.umei_2}</span></li>
                    </ul>
                )
            : (
                <h3>
                    {noProduct}
                </h3>
            )}
        </div>
    )
}

export default Result;