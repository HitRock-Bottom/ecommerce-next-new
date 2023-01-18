import React from 'react';
import {client, urlFor} from '../../lib/client';

const ProductDetails = ({product, products}) => {
    const { image, name, details, price } = product;
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[0])} />
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticProps = async ({params : {slug}}) =>{         //notice the function used, it is used when data to be fetched is already available
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;  //query the specific clicked product
    const productsQuery = `*[_type == "product"]`;
    const product = await client.fetch(query);
  
    const products = await client.fetch(productsQuery);     //query similar products
  
    return { props : { product, products } }
}
export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default ProductDetails;