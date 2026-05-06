import React from 'react';

const features = [
    {
        icon: 'fa fa-book',
        title: 'Browse Verses',
        desc: 'Explore all 700 verses of the Bhagavad Gita organized as cards with descriptions and meanings.',
    },
    {
        icon: 'fa fa-search',
        title: 'Smart Search',
        desc: 'Instantly search by verse name, keyword, sloka code, or meaning across the entire text.',
    },
    {
        icon: 'fa fa-th-large',
        title: 'Topic Groups',
        desc: 'Filter verses by life topics — find guidance for specific challenges and situations.',
    },
    {
        icon: 'fa fa-volume-up',
        title: 'Text to Speech',
        desc: 'Listen to the meaning of any verse read aloud with a single click.',
    },
    {
        icon: 'fa fa-comments',
        title: 'AI Chatbot',
        desc: 'Ask questions and get answers grounded in the teachings of the Gita.',
    },
    {
        icon: 'fa fa-star',
        title: 'Favorites',
        desc: 'Mark and revisit the verses that resonate most with you.',
    },
];

const stats = [
    { value: '700', label: 'Verses' },
    { value: '18', label: 'Chapters' },
    { value: '5000+', label: 'Years of Wisdom' },
];

const AboutPage = () => {
    return (
        <div className="dashboard-wrapper">
            <div className="container-fluid dashboard-content" style={{ paddingTop: 0 }}>

                {/* ── Hero ── */}
                <div className="about-hero">
                    <div className="about-hero-bg" />
                    <div className="about-om">ॐ</div>
                    <h1 className="about-hero-title">Shrimad Bhagavad Gita</h1>
                    <p className="about-hero-sub">Ancient wisdom made accessible for modern seekers</p>

                    <div className="about-stats">
                        {stats.map(s => (
                            <div key={s.label} className="about-stat">
                                <span className="about-stat-value">{s.value}</span>
                                <span className="about-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── About ── */}
                <div className="row justify-content-center mt-4">
                    <div className="col-xl-8 col-lg-10 col-md-12">
                        <div className="card">
                            <div className="card-body text-center" style={{ padding: '32px 40px' }}>
                                <h4 style={{ fontWeight: 700, color: '#3d405c', marginBottom: 14 }}>
                                    About this Project
                                </h4>
                                <p style={{ fontSize: 15, color: '#71748d', lineHeight: 1.8, margin: 0 }}>
                                    This is an open-source digital companion for studying the Bhagavad Gita —
                                    the 5,000-year-old dialogue between Arjuna and Lord Krishna on the battlefield
                                    of Kurukshetra. The goal is to make these timeless teachings easy to explore,
                                    search, and reflect on in everyday life.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Features ── */}
                <div className="row mt-2">
                    <div className="col-xl-12">
                        <h4 className="about-section-title">Features</h4>
                    </div>
                    {features.map(f => (
                        <div key={f.title} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4">
                            <div className="about-feature-card">
                                <div className="about-feature-icon">
                                    <i className={f.icon} />
                                </div>
                                <div className="about-feature-content">
                                    <h6 className="about-feature-title">{f.title}</h6>
                                    <p className="about-feature-desc">{f.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Contact ── */}
                <div className="row justify-content-center mt-2 mb-4">
                    <div className="col-xl-6 col-lg-8 col-md-12">
                        <div className="about-contact-card">
                            <div className="about-contact-icon">
                                <i className="fa fa-envelope" />
                            </div>
                            <h5 className="about-contact-title">Have a suggestion?</h5>
                            <p className="about-contact-sub">
                                Feedback, bug reports, and ideas are always welcome.
                            </p>
                            <a
                                href="mailto:amit.naik8103@gmail.com"
                                className="about-contact-btn"
                            >
                                amit.naik8103@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;
