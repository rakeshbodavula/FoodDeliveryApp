import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ItemDetails = () => {
  // Retrieves the 'category' parameter from the URL using the useParams hook
  const { category } = useParams()

  // Declare state variables for the item details, current page, and total pages
  const [details, setDetails] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // Make an HTTP GET request to the item details API endpoint using the axios library
  useEffect(() => {
    axios.get(`http://localhost:5000/api/itemdetails/${category}?page=${currentPage}`)
      .then(res => res.data)
      .then(items => {
        // Update the state variables for the item details and total pages
        setDetails(items.items)
        setTotalPages(items.totalPages)
      })
      .catch(err => console.log(err))
  }, [currentPage])

  // Event handler for the previous page button
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Event handler for the next page button
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Return the JSX to render the item details and pagination buttons
  return (
    <Wrapper>
      {/* Conditional rendering for when the item details are loading */}
      {details === null && <h1>Loading....</h1>}
      {/* Conditional rendering for when the item details are loaded */}
      {details &&
        <div className="itemdetails_main_div">
          {/* Map over the item details and render each item */}
          {details.map(item => (
            <div key={Math.random()} className="item">
              <div className="card">
                <div className="card-content">
                  <div className="image">
                    <img src={item.strMealThumb} alt="" />
                  </div>

                  <div className="name-profession">
                    <span className="name">{item.strMeal}</span>
                  </div>

                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>

                  <div className="button">
                    <button className="aboutMe">Order</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
      {/* Render the pagination buttons */}
      <button className="pagination_btn prev" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous Page</button>
      <button className="pagination_btn next" onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
    </Wrapper>
  );
}
const Wrapper = styled.div`

& .pagination_btn{
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
  opacity: 0.5;
  pointer-events: none;
}

    .itemdetails_main_div{
        padding: 15px;
        display : grid;
        grid-template-columns: auto auto auto;
    }

    .item{
        padding : 5px;
        // border : 1px solid grey;
        border-radius : 5px;
        transform : scale(0.9);
        display : flex;
        justify-content: space-evenly;
        align-items : center;
        flex-direction : column;
        
    }
    
    .item h2{
        text-align : center;
    }

    .item img{
        border-radius : 10px;
        margin : auto;
        width : 50%;
        heigth : 50%;
    }


    .card{
        position: relative;
        background: #fff;
        border-radius: 20px;
        margin: 20px 0;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        transition : 0.5s;
        width: 23vw;
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
        background: coral;
        border-radius: 20px 20px 0 0;
      }
       
      .card .card-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
        position: relative;
        z-index: 100;
      }
       
      .card .image{
        height: 140px;
        width: 140px;
        border-radius: 50%;
        // padding: 3px;
        background: #7d2ae8;
        background: coral;
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
        color: ;
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
        background: coral;
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

export default ItemDetails;