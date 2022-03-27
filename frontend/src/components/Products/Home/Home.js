import "./Home.scss";
import { CarouselProvider, Slider, Slide, Image, } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import pages from "./homeAssets.js";
import { Link } from "react-router-dom";


export default function Home() {
    return (

        <ul className="home">
            {
                pages.map(page => {
                    return <Link key={page.id} to={"/" + page.name} >
                        <li className="home__product">
                            <CarouselProvider
                                naturalSlideHeight={100}
                                naturalSlideWidth={100}
                                totalSlides={3}
                                isPlaying={true}
                                className={"home__product--img"}
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
                            <div className="home__product--text">
                                <p className="home__product--text-p">{page.name}</p>
                            </div>
                        </li>
                    </Link>
                })
            }
        </ul>
    )
}