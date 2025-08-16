import { useState, useEffect } from 'react'
import CharacterGrid from "../common/characters/CharacterGrid";
import SelectInput from "../common/SelectInput";
import data from "../bg-data.json";
const HomePage = () => {

    const [items, setItems] = useState([])
    const [fullListItems, setFullListItems] = useState([])
    const [groups, setGroups] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState('')

    useEffect(() => {
        // const fetchItems = async () => {
        {
            setIsLoading(true)

            setItems(data.cards)
            setFullListItems(data.cards)
            setGroups(data.groups)

            setIsLoading(false)
        }


    }, [])

    function handleChange(event) {
        const { name, value } = event.target;
        const g = groups.filter(g => g.id === +value).map(x => x.cards);

        value ?
            setItems(
                fullListItems.filter((x) => g[0].includes(x.id))
            ) : setItems(
                fullListItems
            );


    }

    function handleChange2(event) {
        debugger;
        const { name, value } = event.target;

        value ?
            setItems(
                fullListItems.filter((x) => value)
            ) : setItems(
                fullListItems
            );


    }

    return (
        <div className="dashboard-wrapper">
            <div className="container-fluid dashboard-content">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="page-header" id="top">
                                    <h2 className="pageheader-title">Cards </h2>
                                </div>
                            </div>
                        </div>
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
                                                        value={groups.id || ""}
                                                        options={groups.map(g => ({
                                                            value: g.id,
                                                            text: g.name
                                                        }))}
                                                        onChange={handleChange}
                                                    // error={errors.author}
                                                    />

                                                </div>
                                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                                    <label for="validationCustom02">Search</label>
                                                    {/* <input type="text" className="form-control" id="validationCustom02" placeholder="Search verses | sloka | keyword" /> */}


                                                    <input
                                                        type="text"
                                                        className="form-control "
                                                        placeholder="Search verses | sloka | keyword"
                                                        // onChange={handleChange2}
                                                        onChange={e => setQuery(e.target.value)}
                                                        value={query}
                                                    />


                                                    {/* <div className="valid-feedback">
                                                        Looks good!
                                                    </div> */}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10">
                                <div className="page-header" id="top">
                                    <div className="pills-regular">
                                        <ul className="nav nav-pills mb-1" id="pills-tab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#all" role="tab" aria-controls="all" aria-selected="true">All</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#memorization" role="tab" aria-controls="memorization" aria-selected="false">For memorization <span className="badge badge-primary badge-pill">101</span></a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#favorite" role="tab" aria-controls="favorite" aria-selected="false">My favorite <span className="badge badge-primary badge-pill">0</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <CharacterGrid isLoading={isLoading}
                                items={items
                                    .filter(v => {
                                        if (v.name.toLowerCase().indexOf(query) >= 0
                                            || v.description.toLowerCase().indexOf(query) >= 0
                                            || v.meaning.toLowerCase().indexOf(query) >= 0
                                            || v.code.toLowerCase().indexOf(query) >= 0
                                        ) {
                                            return true;
                                        }
                                        return false;
                                    })
                                    .filter((val, i) => i < 108)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;