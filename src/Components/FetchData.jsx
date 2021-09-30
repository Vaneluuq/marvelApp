import React from 'react';
import { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import stylesCarrusel from '../CSS/carrusel.module.css'



function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
      fetch("https://gateway.marvel.com:443/v1/public/characters?apikey=5fdbc59ad02bd26db7d992c57180aeb7&hash=6E61141C3ACAABF91EBCE5843F4B3974")
        .then(res => res.json())
        .then((result) => {
          setIsLoaded(true);
          setItems(result.data.results);
           },
          (error) => {
            console.log(error)
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])

  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className= {stylesCarrusel.main}>
          <div className= {stylesCarrusel.title}>
            <h1>Marvelike</h1>
          </div>
          <div className= {stylesCarrusel.images}>
            <div className= {stylesCarrusel.buttonLogin}>
              <p>Quiero Loguearme</p>
              <button>Ingresar</button>
            </div>
            <Carousel
            infiniteLoop
            autoPlay
            showThumbs={false} 
            showIndicators = {false}
            // centerMode
            > 
            {items.map(item => (
              <div key={item.id}>
                <img src={(item.thumbnail.path)+"."+(item.thumbnail.extension)} alt={item.name}/>
              </div>
            ))}
            </Carousel> 
          </div>
          <div className= {stylesCarrusel.footer}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam eos veniam autem, doloribus illum itaque ipsa nobis a iusto. Temporibus sequi obcaecati quibusdam cupiditate. Commodi ipsam corrupti officia perferendis eum!</p>
            </div>
        </div>
      );
    }
 }

  export default MyComponent