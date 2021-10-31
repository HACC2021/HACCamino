import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'semantic-ui-react';

const CustomPagination = ({ arrayObjects, maxRows, parentCallback }) => {
  const [page, setPage] = useState(1);
  const numArray = arrayObjects.length;
  const maxPages = Math.ceil(numArray / maxRows);

  const handleRows = (array) => {
    const start = (page * maxRows) - maxRows;
    const end = (page === maxPages) ? array.length : (page * maxRows);
    return array.slice(start, end);
  };

  const handlePaginationChange = (e, { activePage }) => setPage(activePage);

  useEffect(() => {
    parentCallback(handleRows(arrayObjects));
  }, [page]);

  return (
    <Pagination
      activePage={page}
      onPageChange={handlePaginationChange}
      totalPages={maxPages}
    />);
};

CustomPagination.propTypes = {
  arrayObjects: PropTypes.array.isRequired,
  maxRows: PropTypes.number.isRequired,
  parentCallback: PropTypes.func.isRequired,
};

export default CustomPagination;
