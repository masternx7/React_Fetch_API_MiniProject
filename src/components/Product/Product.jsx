import React, { useEffect, useState } from 'react';
import './Product.css'

const Product = () => {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(req => req.json())
            .then(data => setProducts(data.products))
            .catch(error => console.log(error));
    }, [])

    const handleCardClick = (productId) => {
        fetch(`https://dummyjson.com/products/${productId}`)
            .then(req => req.json())
            .then(data => setSelectedProduct(data))
            .catch(error => console.log(error));
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };


    return (
        <>
            <div className='product-container'>
                <div className="product-list">
                    {products.map(product => (
                        <div className="card" key={product.id} onClick={() => handleCardClick(product.id)}>
                            <div className='img-container'>
                                <img src={product.thumbnail} alt={product.title} />
                            </div>
                            <div className='product-info-container'>
                                <div className='product-info'>
                                    <h3>{product.title}</h3>
                                    <p>{product.description}</p>
                                    <p>$ {product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProduct && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{selectedProduct.title}</h2>
                        <img src={selectedProduct.thumbnail} alt={selectedProduct.title} />
                        <p>{selectedProduct.description}</p>
                        <p>Price: $ {selectedProduct.price}</p>
                        <p>Brand: {selectedProduct.brand}</p>
                        <p>Category: {selectedProduct.category}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Product