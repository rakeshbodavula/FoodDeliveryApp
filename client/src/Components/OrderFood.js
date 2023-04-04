import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderFood = () => {

  // Declare states for holding the data, current page number and total number of pages
  const [data, setData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // Fetch data from the API when the current page state changes
  useEffect(() => {

    axios.get(`http://localhost:5000/api/categories?page=${currentPage}`)
      .then(res => res.data)
      .then(x => {
        setData(x.items)
        setTotalPages(x.totalPages)
      })
      .catch(err => console.log(err))

  }, [currentPage])

  // Function to handle previous page button click event
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Function to handle next page button click event
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <OrderWrapper>
      {/* // Display loading message until the data is loaded */}
      {data === null && <h1>Loading....</h1>}
      {/* // If data is loaded, display the category items and pagination buttons */}
      {data &&
        <>
          <h1>Select a Category</h1>

          <div className="OrderFood_Main_div">
            {/* // Map through the category items and display them */}
            {data.map(item => (
              <div className="item" key={Math.random()}>
                <Link to={"/itemdetails/" + item.strCategory} className="link">
                  <div className="card">
                    <div className="card-content">
                      <div className="image">
                        <img src={item.strCategoryThumb} alt="" />
                      </div>

                      <div className="name-profession">
                        <span className="name">{item.strCategory}</span>
                      </div>

                      <div className="rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>

                      <div className="button">
                        <button className="aboutMe">Explore!</button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* // Display the previous page and next page buttons */}
          <div className="pagination_btn">
            <button className="prev" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous Page</button>
            <button className="next" onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
          </div>
        </>
      }
    </OrderWrapper>
  );
}


const OrderWrapper = styled.div`
& .pagination_btn button{
  position:relative;
  left:35vw;
  padding:10px;
  margin:40px;
  transform:scale(1.2);
  cursor:pointer;
  color:#fff;
  border:none;
}

& .prev{
  background:#5cb85c;
}

& .next{
  background:#0275d8;
}

button:disabled {
  opacity: 0.3;
  pointer-events: none;
}


    .link{
        text-decoration : none;
        color: #000;
    }

.OrderFood_Main_div{
    padding: 15px;
    padding-top:0px;
    display : grid;
        grid-template-columns: auto auto auto;
    }

    .item{
        padding : 5px;
        // border : 2px solid black;
        border-radius : 5px;
        display : inline-block;
        transform : scale(0.9);
    }
    
    .item h1{
        text-align : center;
    }

    .card{
        position: relative;
        background: #fff;
        border-radius: 20px;
        margin: 20px 0;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        transition : 0.5s;
      }
      .card:hover{
        transform :scale(1.1);
        transition : 0.5s;
      }
       
      .card::before{
        content: "";
        position: absolute;
        height: 40%;
        width: 100%;
        background: #7d2ae8;
        background: #9444fe;
        border-radius: 20px 20px 0 0;
      }
       
      .card .card-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 50px;
        position: relative;
        z-index: 100;
      }
       
      .card .image{
        height: 160px;
        width: 160px;
        border-radius: 50%;
        // padding: 3px;
        background: #7d2ae8;
      }
       
      .card .image img{
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 3px solid #fff;
      } 
       
      .card .name-profession{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
      } 
       
      .name-profession .name{
        font-size: 24px;
        font-weight: 600;
      }
       
      .name-profession .profession{
        font-size:15px;
        font-weight: 500;
      }
       
      .card .rating{
        display: flex;
        align-items: center;
        margin-top: 18px;
      }
       
      .card .rating i{
        font-size: 18px;
        margin: 0 2px;
        color: #7d2ae8;
      }
       
      .card .button{
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
      }
       
      .card .button button{
        background: #7d2ae8;
        outline: none;
        border: none;
        color: #fff;
        padding: 8px 22px;
        border-radius: 20px;
        font-size: 16px;
        transition: all 0.3s ease;
        cursor: pointer;
      }
       
      .button button:hover{
        background: #6616d0;
      }
    
    `;

export default OrderFood;