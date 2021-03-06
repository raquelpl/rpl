import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from 'prop-types';
import translate from "../i18n/translate";

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageSize: 20
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentDidMount() {
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var { items, pageSize } = this.props;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        pager = this.getPager(items.length, page, pageSize);

        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        this.setState({ pager: pager });

        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;

        pageSize = pageSize || 20;

        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 20) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            return null;
        }

        return (
            <Router>
                {pager.pages && pager.pages.length &&
                    <ul className="pagination">
                        <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                            <button onClick={() => this.setPage(1)} className="page-link"> 
                                {translate('buttonFirst')} </button>
                        </li>
                        <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                            <button onClick={() => this.setPage(pager.currentPage - 1)} className="page-link">
                                {translate('buttonPrevious')} </button>
                        </li>
                        {pager.pages.map(page =>
                            <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                <button onClick={() => this.setPage(page)} className="page-link">{page}</button>
                            </li>
                        )}
                        <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                            <button onClick={() => this.setPage(pager.currentPage + 1)} className="page-link">
                                {translate('buttonNext')} </button>
                        </li>
                        <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                            <button onClick={() => this.setPage(pager.totalPages)} className="page-link">
                                {translate('buttonLast') }</button>
                        </li>
                    </ul>
                }                    
            </Router>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;