const SEOWrapper = ({ title, description, children }) => (
    <>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={`https://yaraholidays.com${window.location.pathname}`} />
            <meta name="robots" content="index, follow" />
        </Helmet>
        {children}
    </>
);

