import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import data from "../bg-data.json";

const allCards = data.cards;

const CardView = () => {

    const [items, setItems] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();

    const currentIndex = allCards.findIndex(x => x.id === +id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < allCards.length - 1;

    useEffect(() => {
        setItems(allCards.find(x => x.id === +id) || {});
    }, [id])

    const goToPrev = () => {
        if (hasPrev) navigate(`/cardview/${allCards[currentIndex - 1].id}`);
    };

    const goToNext = () => {
        if (hasNext) navigate(`/cardview/${allCards[currentIndex + 1].id}`);
    };

    return (
        <div className="dashboard-wrapper">
            <div className="container-fluid dashboard-content">
                <div className="row">
                    <div className="col-xl-12">

                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="page-header" id="top">
                                    <h2 className="pageheader-title">&nbsp; </h2>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="page-header" id="top">
                                    <h2 className="pageheader-title text-center">{items.name}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"></div>
                            <div className="col-xl-6 col-sm-6 col-lg-6 col-md-6 col-6 text-center">
                                <h3 className="text-center">{items.description}</h3>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"></div>
                        </div>

                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="page-header" id="top">
                                    <h3 className="pageheader-title text-center"><u>Meaning</u></h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"></div>
                            <div className="col-xl-6 col-sm-6 col-lg-6 col-md-6 col-6 text-center">
                                <h3 className="text-center">{items.meaning}</h3>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"></div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"></div>
                            <div className="col-xl-6 col-sm-6 col-lg-6 col-md-6 col-6 text-center">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={goToPrev}
                                    disabled={!hasPrev}
                                >
                                    ← Previous
                                </button>
                                <span className="mx-3 text-muted" style={{ fontSize: 13 }}>
                                    {currentIndex + 1} / {allCards.length}
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={goToNext}
                                    disabled={!hasNext}
                                >
                                    Next →
                                </button>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardView;
