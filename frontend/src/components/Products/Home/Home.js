import "./Home.scss";
import { CarouselProvider, Slider, Slide, Image, } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import choco1 from "../../../assets/slide1.jpg";

// const pages = [
//     {
//         id: 1,
//         name: "chocolate",
//         image1: choco1,
//         image2: choco2,
//         image3: choco3
//     },
//     {
//         id: 2,
//         name: "helados",
//         image1: helado1,
//         image2: helado2,
//         image3: helado3,
//     },
//     {
//         id: 3,
//         name: "bebida",
//         image1: bebida1,
//         image2: bebida1,
//         image3: bebida1,
//     },
//     {
//         id: 4,
//         name: "despensa",
//         image1: "../../../assets/carritotick.png",
//         image2: "../../../assets/carritotick.png",
//         image3: "../../../assets/carritotick.png",
//     },
//     {
//         id: 5,
//         name: "snacks",
//         image1: "../../../assets/carritotick.png",
//         image2: "../../../assets/carritotick.png",
//         image3: "../../../assets/carritotick.png",
//     },
//     {
//         id: 6,
//         name: "higiene",
//         image1: "../../../assets/carritotick.png",
//         image2: "../../../assets/carritotick.png",
//         image3: "../../../assets/carritotick.png",
//     }
// ];

export default function Home() {
    return (
        <ul className="home">
            {/* {
                pages.map(page => {
                    return <li key={page.id} >
                        <p>{page.name}</p>
                        <CarouselProvider
                            naturalSlideWidth={60}
                            naturalSlideHeight={200}
                            totalSlides={3}
                            isPlaying={true}
                        >
                            <Slider>
                                <Slide index={0}>
                                    <Image src={page.image1} />
                                </Slide>
                                <Slide index={1}>
                                    <Image src={page.image2} />
                                </Slide>
                                <Slide index={2}>
                                    <Image src={page.image3} />
                                </Slide>
                            </Slider>
                        </CarouselProvider>
                    </li>
                })
            } */}
        </ul>
    )
}