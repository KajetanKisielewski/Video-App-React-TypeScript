import React from "react";
import { Pagination, PaginationItem, PaginationLink, Label, Input, Button } from "reactstrap";

import VideoContext from "../../context/VideoContext";

import "./videoPagination.css";

const VideoPagination = () => {
  const [state, setState] = React.useState<number[]>([]);

  const context = React.useContext(VideoContext);

  if (!context) return null;

  const { currentPage, pageNumbers, setCurrentPage, setVideosQuantityPerPage } = context;

  const firstPage = 1;
  const lastPage = pageNumbers[pageNumbers.length - 1];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const absoluteValue = Math.abs(parseInt(value));
    setState([absoluteValue]);
  };

  const handleItemPerPageChange = (): void => {
    setVideosQuantityPerPage(state[0]);
    setCurrentPage(1);
    setState([]);
  };

  const paginate = (pageNum: number): void => setCurrentPage(pageNum);

  const nextPage = (): number | void => (currentPage === lastPage ? currentPage : setCurrentPage(currentPage + 1));

  const prevPage = (): number | void => (currentPage === firstPage ? currentPage : setCurrentPage(currentPage - 1));

  const renderPagination = (): JSX.Element => (
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
          value={state[0] || ""}
          onChange={handleInputChange}
        />
        <Button className="pagination__toolbox__button" onClick={handleItemPerPageChange}>
          Change
        </Button>
      </div>
      <Pagination aria-label="Page navigation" className="pagination shadow p-3 mb-5 bg-white rounded" size="lg">
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
