import React from 'react';
import { Pagination, PaginationItem, PaginationLink, Label, Input, Button } from 'reactstrap';

import VideoContext from '../../context/VideoContext';
import { clearInputValue } from '../../helpers/auxiliaryFunctions';

import './videoPagination.css';

const VideoPagination = () => {
    const [state, setState] = React.useState([]);

    const { currentPage, pageNumbers, setCurrentPage, setVideosQuantityPerPage } =
        React.useContext(VideoContext);

    const firstPage = 1;
    const lastPage = pageNumbers[pageNumbers.length - 1];

    const handleInputChange = (e) => {
        const { value } = e.target;
        const absoluteValue = Math.abs(value);
        setState(absoluteValue);
    };

    const handleButtonClick = () => {
        setVideosQuantityPerPage(state);
        setCurrentPage(1);
        clearInputValue('.pagination__toolbox__input');
    };

    const paginate = (pageNum) => setCurrentPage(pageNum);

    const nextPage = () =>
        currentPage === lastPage ? currentPage : setCurrentPage(currentPage + 1);

    const prevPage = () =>
        currentPage === firstPage ? currentPage : setCurrentPage(currentPage - 1);

    const renderPagination = () => (
        <>
            <div className="pagination__toolbox shadow p-3 mb-5 bg-white rounded">
                <Label for="quantity" className="pagination__toolbox__label">
                    Items Per Page:
                </Label>
                <Input
                    id="quantity"
                    name="quantity"
                    className="pagination__toolbox__input"
                    type="number"
                    value={state.value}
                    onChange={handleInputChange}
                />
                <Button className="pagination__toolbox__button" onClick={handleButtonClick}>
                    Change
                </Button>
            </div>
            <Pagination
                aria-label="Page navigation"
                className="pagination shadow p-3 mb-5 bg-white rounded"
                size="lg"
            >
                <PaginationItem>
                    <PaginationLink href="#" previous onClick={() => prevPage()} />
                </PaginationItem>
                {pageNumbers.map((num) => (
                    <PaginationItem key={num}>
                        <PaginationLink href="#" onClick={() => paginate(num)}>
                            {num}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationLink href="#" next onClick={() => nextPage()} />
                </PaginationItem>
            </Pagination>
        </>
    );

    return pageNumbers?.length ? renderPagination() : null;
};

export default VideoPagination;
