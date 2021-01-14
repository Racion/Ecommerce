import React from 'react'
import { Pagination } from 'react-bootstrap'

const Pages = ({ postPerPage, totalPosts, currentPage,page}) => {

    const numPage= [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        numPage.push(
          <Pagination.Item key={i} active={i === currentPage} onClick={() => page(i)}>
            {i}
          </Pagination.Item>,
        );
      }

    return (
        <div style={{  display: "flex", justifyContent: "center", alignItems: "center", marginTop:"2rem"}}>
            <Pagination>{numPage}</Pagination>
        </div>
    )
}

export default Pages