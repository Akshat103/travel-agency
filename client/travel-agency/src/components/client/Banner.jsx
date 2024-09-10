import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ title, subtitle, breadcrumbs }) => {
  return (
    <section id="common_banner">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="common_bannner_text">
              <h1>{title}</h1>
              {subtitle && <h3>{subtitle}</h3>}
              {breadcrumbs && (
                <ul>
                  {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index}>
                      {breadcrumb.link ? (
                        <Link to={breadcrumb.link}>{breadcrumb.text}</Link>
                      ) : (
                        <span>
                          {index > 0 && <i className="fas fa-circle"></i>} {breadcrumb.text}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
