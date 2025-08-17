import { useState, useEffect, useMemo } from "react";
import CharacterGrid from "../common/characters/CharacterGrid";
import SelectInput from "../common/SelectInput";
import data from "../bg-data.json";
import ChatBot from "../chatbot/ChatBot";

const HomePage = () => {
    const [solutionId, setSolutionId] = useState("");
    const [items, setItems] = useState([]);
    const [fullListItems, setFullListItems] = useState([]);
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [selectedGroupId, setSelectedGroupId] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        setIsLoading(true);
        setItems(data.cards || []);
        setFullListItems(data.cards || []);
        setGroups(data.groups || []);
        setIsLoading(false);
    }, []);

    function handleChange(event) {
        const { value } = event.target;

        const groupFilter = groups.find(g => g.id === parseInt(value));
        if (groupFilter) {
            setItems(fullListItems.filter((x) => groupFilter.cards.includes(x.id)));
        }

        if (value === "") {

            setItems(fullListItems);
        }

    }

    function handleTabChange(tab) {
        setActiveTab(tab);

        if (tab === "memorization") {
            // clear dropdown
            setSelectedGroupId("");

            // bind to group 21
            const group21 = groups.find(g => g.id === 21);
            if (group21) {
                setItems(fullListItems.filter((x) => group21.cards.includes(x.id)));
            }
        } else if (tab === "all") {
            setItems(fullListItems); // reset
        } else if (tab === "favorite") {
            setItems(fullListItems.filter(c => c.isFavorite));
        }
    }


    const selectedGroupCardIds = useMemo(() => {
        const idNum = Number(selectedGroupId);
        const grp = groups.find(g => g.id === idNum);
        return grp?.cards ?? null;
    }, [groups, selectedGroupId]);

    // build the list to show
    const displayedItems = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = items;

        if (q) {
            list = list.filter(v => {
                return (
                    (v.name || "").toLowerCase().includes(q) ||
                    (v.description || "").toLowerCase().includes(q) ||
                    (v.meaning || "").toLowerCase().includes(q) ||
                    (v.code || "").toLowerCase().includes(q)
                );
            });
        }

        return list.slice(0, 140);
    }, [items, query]);


    return (
        <div className="dashboard-wrapper">
            <div className="container-fluid dashboard-content">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="page-header" id="top">
                                    <h2 className="pageheader-title">Cards</h2>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form className="needs-validation" noValidate>
                                            <div className="row">
                                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">

                                                    <SelectInput
                                                        name="solutionId"
                                                        label="Solution"
                                                        defaultOption="Choose solution to your problem"
                                                        value={selectedGroupId}
                                                        options={groups
                                                            .filter(g => g.id !== 21)
                                                            .map(g => ({
                                                                value: g.id,
                                                                text: g.name
                                                            }))
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                                    <label htmlFor="searchBox">Search</label>
                                                    <input
                                                        id="searchBox"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search verses | sloka | keyword"
                                                        onChange={e => setQuery(e.target.value)}
                                                        value={query}
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs (pure React, no Bootstrap JS needed) */}
                        <div className="row">
                            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10">
                                <div className="page-header" id="top">
                                    <div className="pills-regular">
                                        <ul className="nav nav-pills mb-1" id="pills-tab" role="tablist">
                                            <li className="nav-item">
                                                <button
                                                    type="button"
                                                    className={`nav-link ${activeTab === "all" ? "active" : ""}`}
                                                    onClick={() => handleTabChange("all")}
                                                >
                                                    All
                                                </button>
                                            </li>
                                            <li className="nav-item">
                                                <button
                                                    type="button"
                                                    className={`nav-link ${activeTab === "memorization" ? "active" : ""}`}
                                                    onClick={() => handleTabChange("memorization")}
                                                // onClick={() => handleMemorizationClick()}
                                                >
                                                    For memorization <span className="badge badge-primary badge-pill">101</span>
                                                </button>
                                            </li>
                                            <li className="nav-item">
                                                <button
                                                    type="button"
                                                    className={`nav-link ${activeTab === "favorite" ? "active" : ""}`}
                                                    onClick={() => handleTabChange("favorite")}
                                                >
                                                    My favorite <span className="badge badge-primary badge-pill">0</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="row">
                            <CharacterGrid isLoading={isLoading} items={displayedItems} />
                        </div>

                    </div>
                </div>
            </div>
            <ChatBot />
        </div>
    );
};

export default HomePage;
