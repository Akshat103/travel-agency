import React from "react";
import news1 from "../../../assets/img/news/small1.png";
import news2 from "../../../assets/img/news/small2.png";
import news3 from "../../../assets/img/news/small3.png";
import news4 from "../../../assets/img/news/small4.png";
import newsbig from "../../../assets/img/news/new-big.png";

const News = () =>{
    return (
        <section id="home_news" class="section_padding_top">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="section_heading_center">
                        <h2>Latest travel news</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="home_news_left_wrapper">
                        <div class="home_news_item">
                            <div class="home_news_img">
                                <a href="news-details.html"><img src={news1} alt="img"/></a>
                            </div>
                            <div class="home_news_content">
                                <h3><a href="news-details.html">Revolutionising the travel industry,
                                        one partnership at a time</a></h3>
                                <p><a href="news.html">26 Oct 2021</a> <span> <i class="fas fa-circle"></i>5min
                                        read</span> </p>
                            </div>
                        </div>
                        <div class="home_news_item">
                            <div class="home_news_img">
                                <a href="news-details.html"><img src={news2} alt="img"/></a>
                            </div>
                            <div class="home_news_content">
                                <h3><a href="news-details.html">t is a long established fact that a reader will be
                                        distracted.</a></h3>
                                <p><a href="news.html">26 Oct 2021</a> <span> <i class="fas fa-circle"></i>5min
                                        read</span> </p>
                            </div>
                        </div>
                        <div class="home_news_item">
                            <div class="home_news_img">
                                <a href="news-details.html"><img src={news3} alt="img"/></a>
                            </div>
                            <div class="home_news_content">
                                <h3><a href="#!">There are many variations of passages of sum available</a></h3>
                                <p><a href="news.html">26 Oct 2021</a> <span> <i class="fas fa-circle"></i>5min
                                        read</span> </p>
                            </div>
                        </div>
                        <div class="home_news_item">
                            <div class="home_news_img">
                                <a href="news-details.html"><img src={news4} alt="img"/></a>
                            </div>
                            <div class="home_news_content">
                                <h3><a href="news-details.html">Contrary to popular belief, Lorem Ipsum is not
                                        simply.</a></h3>
                                <p><a href="news.html">26 Oct 2021</a> <span> <i class="fas fa-circle"></i>5min
                                        read</span> </p>
                            </div>
                        </div>
                        <div class="home_news_item">
                            <div class="seeall_link">
                                <a href="news.html">See all article <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="home_news_big">
                        <div class="news_home_bigest img_hover">
                            <a href="news-details.html"><img src={newsbig} alt="img"/></a>
                        </div>
                        <h3><a href="news-details.html">There are many variations of passages available but</a> </h3>
                        <p>It is a long established fact that a reader will be distracted by the readable content of. The point of using Lorem Ipsum is that it has a more</p>
                        <p>It is a long established fact that a reader will be distracted by the readable long established fact that a reader will be distracted content of a page when looking at its layout.</p>
                        <a href="news-details.html">Read full article <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default News;